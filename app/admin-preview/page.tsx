/**
 * /admin-preview — Design system showcase for Vision UI admin components.
 * This route is NOT linked from the public site; it exists solely for visual QA.
 * In production, protect it behind the admin middleware (Phase 6).
 */

import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Plus,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Package,
  Zap,
  TrendingUp,
  Inbox,
} from 'lucide-react'
import type { BadgeVariant } from '@/components/admin/StatusBadge'
import { AuroraBackground } from '@/components/admin/AuroraBackground'
import { GlassCard } from '@/components/admin/GlassCard'
import { GradientIcon } from '@/components/admin/GradientIcon'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { GradientButton } from '@/components/admin/GradientButton'
import { SidebarItem } from '@/components/admin/SidebarItem'
import { SidebarSection } from '@/components/admin/SidebarSection'
import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/admin/EmptyState'

export default function AdminPreviewPage() {
  return (
    <AuroraBackground>
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {/* ── Page Header ─────────────────────────────────────────────── */}
          <PageHeader
            title="Design System Preview"
            description="Visual QA for all Vision UI admin components. Not linked from the public site."
            breadcrumb={[{ label: 'Admin', href: '/admin' }, { label: 'Preview' }]}
            actions={
              <>
                <GradientButton variant="ghost" icon={Download} size="sm">
                  Export
                </GradientButton>
                <GradientButton icon={Plus} size="sm">
                  Nouveau
                </GradientButton>
              </>
            }
          />

          <div className="space-y-12">
            {/* ── Section: GlassCards + KPI grid ──────────────────────── */}
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#718096]">
                GlassCard + GradientIcon — KPI grid
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  {
                    label: 'Devis reçus',
                    value: '24',
                    icon: FileText,
                    variant: 'primary' as const,
                    trend: '+12%',
                  },
                  {
                    label: 'Clients actifs',
                    value: '8',
                    icon: Users,
                    variant: 'success' as const,
                    trend: '+3',
                  },
                  {
                    label: 'En attente',
                    value: '5',
                    icon: Clock,
                    variant: 'warning' as const,
                    trend: '2 new',
                  },
                  {
                    label: 'CA estimé',
                    value: '87k€',
                    icon: TrendingUp,
                    variant: 'info' as const,
                    trend: '+18%',
                  },
                ].map(({ label, value, icon, variant, trend }) => (
                  <GlassCard key={label}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-[#718096]">{label}</p>
                        <p className="mt-2 font-mono text-2xl font-bold text-white">{value}</p>
                        <p className="mt-1 text-[11px] text-[#A0AEC0]">{trend}</p>
                      </div>
                      <GradientIcon icon={icon} variant={variant} size="sm" />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* ── Section: Status Badges ───────────────────────────────── */}
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#718096]">
                StatusBadge — all variants
              </h2>
              <GlassCard>
                <div className="flex flex-wrap gap-3">
                  {(
                    [
                      { label: 'Default', variant: 'default' },
                      { label: 'En attente', variant: 'pending', dot: true },
                      { label: 'Actif', variant: 'active', dot: true },
                      { label: 'Succès', variant: 'success', dot: true },
                      { label: 'Avertissement', variant: 'warning', dot: true },
                      { label: 'Erreur', variant: 'danger', dot: true },
                      { label: 'Info', variant: 'info', dot: true },
                      { label: 'Archivé', variant: 'muted' },
                    ] satisfies { label: string; variant: BadgeVariant; dot?: boolean }[]
                  ).map(({ label, variant, dot }) => (
                    <StatusBadge key={label} label={label} variant={variant} dot={dot} />
                  ))}
                </div>
              </GlassCard>
            </section>

            {/* ── Section: Gradient Buttons ────────────────────────────── */}
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#718096]">
                GradientButton — all variants & sizes
              </h2>
              <GlassCard>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <GradientButton variant="primary" icon={Plus}>
                      Primary
                    </GradientButton>
                    <GradientButton variant="success" icon={CheckCircle2}>
                      Success
                    </GradientButton>
                    <GradientButton variant="danger" icon={AlertTriangle}>
                      Danger
                    </GradientButton>
                    <GradientButton variant="ghost">Ghost</GradientButton>
                    <GradientButton variant="outline">Outline</GradientButton>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <GradientButton size="sm" icon={Zap}>
                      Small
                    </GradientButton>
                    <GradientButton size="md" icon={Zap}>
                      Medium
                    </GradientButton>
                    <GradientButton size="lg" icon={Zap}>
                      Large
                    </GradientButton>
                    <GradientButton loading>Loading…</GradientButton>
                    <GradientButton disabled>Disabled</GradientButton>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* ── Section: Gradient Icons ──────────────────────────────── */}
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#718096]">
                GradientIcon — all variants & sizes
              </h2>
              <GlassCard>
                <div className="flex flex-wrap items-end gap-6">
                  {(['primary', 'success', 'warning', 'danger', 'info'] as const).map((v) => (
                    <div key={v} className="flex flex-col items-center gap-3">
                      <GradientIcon icon={Package} variant={v} size="lg" />
                      <GradientIcon icon={Package} variant={v} size="md" />
                      <GradientIcon icon={Package} variant={v} size="sm" />
                      <span className="text-[10px] text-[#718096]">{v}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </section>

            {/* ── Section: Sidebar components ─────────────────────────── */}
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#718096]">
                Sidebar — items & sections
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Expanded */}
                <GlassCard>
                  <p className="mb-4 text-xs text-[#718096]">Expanded (264px)</p>
                  <div className="w-48 space-y-4">
                    <SidebarSection label="Navigation">
                      <SidebarItem href="/admin" label="Dashboard" icon={LayoutDashboard} exact />
                      <SidebarItem href="/admin/devis" label="Devis" icon={FileText} badge={5} />
                      <SidebarItem href="/admin/clients" label="Clients" icon={Users} />
                    </SidebarSection>
                    <SidebarSection label="Paramètres">
                      <SidebarItem href="/admin/settings" label="Paramètres" icon={Settings} />
                    </SidebarSection>
                  </div>
                </GlassCard>

                {/* Collapsed */}
                <GlassCard>
                  <p className="mb-4 text-xs text-[#718096]">Collapsed (80px)</p>
                  <div className="w-14 space-y-4">
                    <SidebarSection collapsed>
                      <SidebarItem
                        href="/admin"
                        label="Dashboard"
                        icon={LayoutDashboard}
                        exact
                        collapsed
                      />
                      <SidebarItem
                        href="/admin/devis"
                        label="Devis"
                        icon={FileText}
                        badge={5}
                        collapsed
                      />
                      <SidebarItem href="/admin/clients" label="Clients" icon={Users} collapsed />
                    </SidebarSection>
                  </div>
                </GlassCard>
              </div>
            </section>

            {/* ── Section: Empty State ─────────────────────────────────── */}
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#718096]">
                EmptyState
              </h2>
              <GlassCard>
                <EmptyState
                  icon={Inbox}
                  iconVariant="info"
                  title="Aucun devis pour l'instant"
                  description="Les demandes de devis apparaîtront ici dès qu'un client soumettra le formulaire."
                  action={
                    <GradientButton icon={Plus} size="sm">
                      Créer un devis manuellement
                    </GradientButton>
                  }
                />
              </GlassCard>
            </section>

            {/* ── Section: Interactive GlassCard ──────────────────────── */}
            <section>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#718096]">
                GlassCard — interactive variant
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {['Card A', 'Card B', 'Card C'].map((label) => (
                  <GlassCard key={label} interactive>
                    <p className="text-sm font-medium text-white">{label}</p>
                    <p className="mt-1 text-xs text-[#718096]">
                      Hover pour voir l&apos;effet interactif
                    </p>
                  </GlassCard>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AuroraBackground>
  )
}
