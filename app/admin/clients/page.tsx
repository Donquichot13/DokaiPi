import { db } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { ClientsList, type ClientRow } from '@/features/admin/clients/ClientsList'

export const metadata = { title: 'Clients — DokaiPi Admin' }

export default async function AdminClientsPage() {
  let clients: ClientRow[] = []

  try {
    const raw = await db.client.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { quotes: true, projects: true } },
      },
    })
    clients = raw.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      company: c.company,
      website: c.website,
      source: c.source,
      createdAt: c.createdAt,
      _count: c._count,
    }))
  } catch {
    /* DB unavailable — show empty list gracefully */
  }

  return (
    <div>
      <PageHeader
        title="Clients"
        description={`${clients.length} client${clients.length !== 1 ? 's' : ''} actif${clients.length !== 1 ? 's' : ''}`}
      />
      <ClientsList initialData={clients} />
    </div>
  )
}
