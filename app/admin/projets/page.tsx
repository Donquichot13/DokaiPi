import { db } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { KanbanBoard, type ProjectCard } from '@/features/admin/projets/KanbanBoard'

export const metadata = { title: 'Projets — DokaiPi Admin' }

export default async function AdminProjetsPage() {
  let cards: ProjectCard[] = []

  try {
    const raw = await db.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: { name: true, company: true } },
      },
    })

    cards = raw.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      status: p.status,
      budget: p.budget,
      progress: p.progress,
      dueDate: p.dueDate,
      clientName: p.client.company ?? p.client.name,
    }))
  } catch {
    /* DB unavailable — show empty board gracefully */
  }

  const activeCount = cards.filter(
    (c) => c.status !== 'DELIVERED' && c.status !== 'CANCELLED'
  ).length

  return (
    <div>
      <PageHeader
        title="Projets"
        description={`${activeCount} projet${activeCount !== 1 ? 's' : ''} actif${activeCount !== 1 ? 's' : ''} · ${cards.length} au total`}
      />
      <KanbanBoard initialCards={cards} />
    </div>
  )
}
