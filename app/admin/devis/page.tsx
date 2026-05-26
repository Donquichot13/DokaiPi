import { Inbox } from 'lucide-react'
import { db } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/admin/EmptyState'
import { GlassCard } from '@/components/admin/GlassCard'
import { QuotesTable, extractTotalHT, type QuoteRow } from '@/features/admin/devis/QuotesTable'

export const metadata = { title: 'Devis — DokaiPi Admin' }

export default async function AdminDevisPage() {
  let quotes: QuoteRow[] = []

  try {
    const raw = await db.quote.findMany({ orderBy: { createdAt: 'desc' } })
    quotes = raw.map((q) => ({
      id: q.id,
      quoteNumber: q.quoteNumber,
      name: q.name,
      email: q.email,
      company: q.company,
      projectType: q.projectType,
      totalHT: extractTotalHT(q.priceBreakdown),
      status: q.status,
      createdAt: q.createdAt,
      adminNote: q.adminNote,
    }))
  } catch {
    /* DB unavailable — show empty state gracefully */
  }

  return (
    <div>
      <PageHeader
        title="Devis"
        description={`${quotes.length} demande${quotes.length !== 1 ? 's' : ''} reçue${quotes.length !== 1 ? 's' : ''}`}
      />

      {quotes.length === 0 ? (
        <GlassCard>
          <EmptyState
            icon={Inbox}
            iconVariant="primary"
            title="Aucun devis pour l'instant"
            description="Les nouvelles demandes apparaîtront ici dès qu'un visiteur soumettra le configurateur."
          />
        </GlassCard>
      ) : (
        <QuotesTable data={quotes} />
      )}
    </div>
  )
}
