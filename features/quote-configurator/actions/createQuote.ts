'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { quoteFormSchema } from '../lib/schema'
import { calculatePrice, FeatureId, ModifierId } from '../lib/pricing'
import { db } from '@/lib/db'
import { AdminNewQuoteEmail } from '@/emails/AdminNewQuote'
import { ClientQuoteConfirmationEmail } from '@/emails/ClientQuoteConfirmation'

// ─── In-memory rate limiter (resets on cold start; fine for MVP) ──────────────

const rlMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rlMap.get(ip)

  if (!entry || entry.resetAt <= now) {
    rlMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) return false

  rlMap.set(ip, { count: entry.count + 1, resetAt: entry.resetAt })
  return true
}

// ─── Action ───────────────────────────────────────────────────────────────────

export type CreateQuoteResult =
  | { success: true; quoteNumber: string }
  | { success: false; error: string }

export async function createQuote(rawData: unknown): Promise<CreateQuoteResult> {
  // 1. Rate limit
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'unknown'

  if (!checkRateLimit(ip)) {
    return { success: false, error: 'Trop de soumissions. Réessayez dans une heure.' }
  }

  // 2. Validate
  const parsed = quoteFormSchema.safeParse(rawData)
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? 'Données invalides.'
    return { success: false, error: firstError }
  }
  const data = parsed.data

  // 3. Recalculate price server-side (never trust client-sent price)
  const breakdown = calculatePrice(
    data.projectType,
    data.features as FeatureId[],
    data.modifiers as ModifierId[]
  )

  // 4. Generate quote number
  const year = new Date().getFullYear()
  let quoteNumber: string
  try {
    const yearStart = new Date(`${year}-01-01T00:00:00.000Z`)
    const count = await db.quote.count({ where: { createdAt: { gte: yearStart } } })
    quoteNumber = `Q-${year}-${String(count + 1).padStart(4, '0')}`
  } catch {
    // Fallback if DB is not available (e.g. no DATABASE_URL in dev)
    quoteNumber = `Q-${year}-${String(Date.now()).slice(-4)}`
  }

  // 5. Save to DB (non-blocking failure: email still sends)
  try {
    await db.quote.create({
      data: {
        quoteNumber,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        website: data.website || null,
        message: data.message ?? null,
        howDidYouHear: data.howDidYouHear,
        projectType: data.projectType,
        features: data.features,
        modifiers: data.modifiers,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        priceBreakdown: breakdown as any,
      },
    })
  } catch (err) {
    console.error('[createQuote] DB write failed:', err)
    // Continue — email is more important than DB in MVP
  }

  // 6. Send emails
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const resend = new Resend(resendKey)
      const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@dokaipi.com'

      await Promise.allSettled([
        resend.emails.send({
          from: 'DokaiPi <devis@dokaipi.com>',
          to: adminEmail,
          subject: `[Nouveau devis] ${quoteNumber} — ${data.name}`,
          react: AdminNewQuoteEmail({ data, breakdown, quoteNumber }),
        }),
        resend.emails.send({
          from: 'DokaiPi <devis@dokaipi.com>',
          to: data.email,
          subject: `Votre demande de devis ${quoteNumber} reçue — DokaiPi`,
          react: ClientQuoteConfirmationEmail({ data, breakdown, quoteNumber }),
        }),
      ])
    } catch (err) {
      console.error('[createQuote] Email send failed:', err)
      // Non-blocking: quote is saved, just email didn't go out
    }
  } else {
    console.warn('[createQuote] RESEND_API_KEY not set — skipping emails')
  }

  return { success: true, quoteNumber }
}
