/**
 * /admin — Dashboard placeholder.
 * Full implementation with KPI cards, charts, and activity feed in Phase 7.
 */

import { FileText, Users, TrendingUp, Clock } from 'lucide-react'
import { GlassCard } from '@/components/admin/GlassCard'
import { GradientIcon } from '@/components/admin/GradientIcon'
import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/admin/EmptyState'

const KPI_PLACEHOLDER = [
  { label: 'Devis reçus', value: '—', icon: FileText, variant: 'primary' as const },
  { label: 'Clients actifs', value: '—', icon: Users, variant: 'success' as const },
  { label: 'En attente', value: '—', icon: Clock, variant: 'warning' as const },
  { label: 'CA estimé', value: '—', icon: TrendingUp, variant: 'info' as const },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Vue d'ensemble de votre activité." />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {KPI_PLACEHOLDER.map(({ label, value, icon, variant }) => (
          <GlassCard key={label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#718096]">{label}</p>
                <p className="mt-2 font-mono text-2xl font-bold text-white">{value}</p>
              </div>
              <GradientIcon icon={icon} variant={variant} size="sm" />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Activity placeholder */}
      <div className="mt-8">
        <GlassCard>
          <EmptyState
            icon={FileText}
            iconVariant="primary"
            title="Dashboard complet en Phase 7"
            description="Les graphiques, tableaux et l'activité récente seront disponibles après l'implémentation du CRM complet."
          />
        </GlassCard>
      </div>
    </div>
  )
}
