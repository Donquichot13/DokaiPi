import { FileText, Users, TrendingUp, Clock, ArrowRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/db'
import { GlassCard } from '@/components/admin/GlassCard'
import { GradientIcon } from '@/components/admin/GradientIcon'
import {
  StatusBadge,
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_VARIANT,
} from '@/components/admin/StatusBadge'
import { PageHeader } from '@/components/admin/PageHeader'
import { formatDate, formatCurrency } from '@/lib/utils'
import { extractTotalHT } from '@/features/admin/devis/QuotesTable'

export const metadata = { title: 'Dashboard — DokaiPi Admin' }

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiProps {
  label: string
  value: string
  sub?: string
  icon: LucideIcon
  variant: 'primary' | 'success' | 'warning' | 'info'
}

function KpiCard({ label, value, sub, icon, variant }: KpiProps) {
  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs text-[#718096]">{label}</p>
          <p className="mt-2 font-mono text-2xl font-bold text-white">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-[#718096]">{sub}</p>}
        </div>
        <GradientIcon icon={icon} variant={variant} size="sm" />
      </div>
    </GlassCard>
  )
}

// ─── Dashboard data ───────────────────────────────────────────────────────────

async function getDashboardData() {
  try {
    const [totalQuotes, pendingQuotes, activeClients, activeProjects, recentQuotes] =
      await Promise.all([
        db.quote.count(),
        db.quote.count({ where: { status: 'PENDING' } }),
        db.client.count({ where: { deletedAt: null } }),
        db.project.count({
          where: {
            deletedAt: null,
            status: { notIn: ['DELIVERED', 'CANCELLED'] },
          },
        }),
        db.quote.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            quoteNumber: true,
            name: true,
            company: true,
            projectType: true,
            priceBreakdown: true,
            status: true,
            createdAt: true,
          },
        }),
      ])

    const acceptedQuotes = await db.quote.findMany({
      where: { status: 'ACCEPTED' },
      select: { priceBreakdown: true },
    })

    const estimatedRevenue = acceptedQuotes.reduce(
      (sum, q) => sum + extractTotalHT(q.priceBreakdown),
      0
    )

    return {
      totalQuotes,
      pendingQuotes,
      activeClients,
      activeProjects,
      recentQuotes,
      estimatedRevenue,
    }
  } catch {
    return {
      totalQuotes: 0,
      pendingQuotes: 0,
      activeClients: 0,
      activeProjects: 0,
      recentQuotes: [],
      estimatedRevenue: 0,
    }
  }
}

const PROJECT_LABELS: Record<string, string> = {
  'site-vitrine': 'Site vitrine',
  'site-ecom': 'E-commerce',
  webapp: 'Web / SaaS',
  mobile: 'Mobile',
  logiciel: 'Logiciel',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminDashboardPage() {
  const {
    totalQuotes,
    pendingQuotes,
    activeClients,
    activeProjects,
    recentQuotes,
    estimatedRevenue,
  } = await getDashboardData()

  const kpis: KpiProps[] = [
    {
      label: 'Devis reçus',
      value: String(totalQuotes),
      sub: `${pendingQuotes} en attente`,
      icon: FileText,
      variant: 'primary',
    },
    {
      label: 'Clients actifs',
      value: String(activeClients),
      icon: Users,
      variant: 'success',
    },
    {
      label: 'Projets actifs',
      value: String(activeProjects),
      icon: Clock,
      variant: 'warning',
    },
    {
      label: 'CA estimé (acceptés)',
      value: estimatedRevenue > 0 ? formatCurrency(estimatedRevenue) : '—',
      sub: 'Hors taxes',
      icon: TrendingUp,
      variant: 'info',
    },
  ]

  return (
    <div>
      <PageHeader title="Dashboard" description="Vue d'ensemble de votre activité." />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Recent quotes */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Derniers devis</h2>
          <Link
            href="/admin/devis"
            className="flex items-center gap-1 text-xs text-[#0075FF] transition-colors hover:text-[#2CD9FF]"
          >
            Voir tout <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <GlassCard noPadding>
          {recentQuotes.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[#718096]">
              Aucun devis reçu pour l&apos;instant.
            </p>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Référence', 'Client', 'Type', 'Montant', 'Statut', 'Reçu le'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#718096]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((q) => {
                  const ht = extractTotalHT(q.priceBreakdown)
                  return (
                    <tr
                      key={q.id}
                      className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-medium text-white">
                        {q.quoteNumber}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-white">{q.name}</p>
                        {q.company && <p className="text-xs text-[#718096]">{q.company}</p>}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#A0AEC0]">
                        {PROJECT_LABELS[q.projectType] ?? q.projectType}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-white">
                        {ht > 40000 ? '> 40 000 €' : ht < 1200 ? 'Sur demande' : formatCurrency(ht)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          label={QUOTE_STATUS_LABEL[q.status]}
                          variant={QUOTE_STATUS_VARIANT[q.status]}
                          dot
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#718096]">
                        {formatDate(q.createdAt)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
