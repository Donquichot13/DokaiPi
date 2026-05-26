'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/lib/db'

const createClientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  source: z.string().optional(),
})

export async function createClientAction(
  rawData: unknown
): Promise<{ success: boolean; error?: string; id?: string }> {
  const parsed = createClientSchema.safeParse(rawData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? 'Données invalides.' }
  }

  try {
    const existing = await db.client.findUnique({ where: { email: parsed.data.email } })
    if (existing) {
      return { success: false, error: 'Un client avec cet email existe déjà.' }
    }

    const client = await db.client.create({
      data: {
        ...parsed.data,
        website: parsed.data.website || null,
      },
    })
    revalidatePath('/admin/clients')
    return { success: true, id: client.id }
  } catch (err) {
    console.error('[createClient]', err)
    return { success: false, error: 'Erreur lors de la création du client.' }
  }
}

export async function softDeleteClientAction(clientId: string): Promise<{ success: boolean }> {
  try {
    await db.client.update({
      where: { id: clientId },
      data: { deletedAt: new Date() },
    })
    revalidatePath('/admin/clients')
    return { success: true }
  } catch (err) {
    console.error('[softDeleteClient]', err)
    return { success: false }
  }
}
