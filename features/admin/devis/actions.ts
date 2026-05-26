'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import type { QuoteStatus } from '@prisma/client'

export async function updateQuoteStatusAction(
  quoteId: string,
  status: QuoteStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    await db.quote.update({
      where: { id: quoteId },
      data: { status },
    })
    revalidatePath('/admin/devis')
    revalidatePath('/admin')
    return { success: true }
  } catch (err) {
    console.error('[updateQuoteStatus]', err)
    return { success: false, error: 'Impossible de mettre à jour le statut.' }
  }
}

export async function updateQuoteAdminNoteAction(
  quoteId: string,
  adminNote: string
): Promise<{ success: boolean }> {
  try {
    await db.quote.update({
      where: { id: quoteId },
      data: { adminNote },
    })
    revalidatePath('/admin/devis')
    return { success: true }
  } catch (err) {
    console.error('[updateQuoteAdminNote]', err)
    return { success: false }
  }
}
