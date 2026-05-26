'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/lib/db'
import type { ProjectStatus } from '@prisma/client'

export async function updateProjectStatusAction(
  projectId: string,
  status: ProjectStatus
): Promise<{ success: boolean }> {
  try {
    await db.project.update({
      where: { id: projectId },
      data: { status },
    })
    revalidatePath('/admin/projets')
    revalidatePath('/admin')
    return { success: true }
  } catch (err) {
    console.error('[updateProjectStatus]', err)
    return { success: false }
  }
}

const createProjectSchema = z.object({
  name: z.string().min(2),
  clientId: z.string().min(1),
  description: z.string().optional(),
  budget: z.number().positive().optional(),
  dueDate: z.string().optional(), // ISO date string
  quoteId: z.string().optional(),
})

export async function createProjectAction(
  rawData: unknown
): Promise<{ success: boolean; error?: string; id?: string }> {
  const parsed = createProjectSchema.safeParse(rawData)
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? 'Données invalides.' }
  }

  try {
    const project = await db.project.create({
      data: {
        name: parsed.data.name,
        clientId: parsed.data.clientId,
        description: parsed.data.description,
        budget: parsed.data.budget,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
        quoteId: parsed.data.quoteId || undefined,
      },
    })
    revalidatePath('/admin/projets')
    revalidatePath('/admin')
    return { success: true, id: project.id }
  } catch (err) {
    console.error('[createProject]', err)
    return { success: false, error: 'Erreur lors de la création du projet.' }
  }
}

export async function updateProjectProgressAction(
  projectId: string,
  progress: number
): Promise<{ success: boolean }> {
  const clamped = Math.max(0, Math.min(100, progress))
  try {
    await db.project.update({
      where: { id: projectId },
      data: { progress: clamped },
    })
    revalidatePath('/admin/projets')
    return { success: true }
  } catch (err) {
    console.error('[updateProjectProgress]', err)
    return { success: false }
  }
}
