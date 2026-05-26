'use client'

import { UseFormReturn } from 'react-hook-form'
import { CheckCircle2 } from 'lucide-react'
import { QuoteFormData } from '../lib/schema'
import {
  PROJECT_TYPES,
  FEATURES,
  MODIFIERS,
  PriceBreakdown,
  ProjectTypeId,
  FeatureId,
  ModifierId,
} from '../lib/pricing'

function formatPrice(n: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
        {title}
      </h3>
      {children}
    </div>
  )
}

interface Props {
  form: UseFormReturn<QuoteFormData>
  breakdown: PriceBreakdown | null
}

export function QuoteStep4({ form, breakdown }: Props) {
  const { watch } = form
  const projectType = watch('projectType') as ProjectTypeId | undefined
  const features = (watch('features') ?? []) as FeatureId[]
  const modifiers = (watch('modifiers') ?? []) as ModifierId[]

  if (!projectType || !breakdown) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
        <p className="text-sm text-zinc-500">
          Sélectionnez un type de projet pour voir le récapitulatif.
        </p>
      </div>
    )
  }

  const projectMeta = PROJECT_TYPES[projectType]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Récapitulatif de votre projet</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Vérifiez les détails avant de renseigner vos coordonnées.
        </p>
      </div>

      <div className="space-y-5 rounded-xl border border-white/10 bg-white/[0.02] p-6">
        {/* Project type */}
        <Section title="Type de projet">
          <div className="border-white/8 flex items-center justify-between rounded-lg border bg-white/[0.04] px-4 py-3">
            <span className="font-medium text-white">{projectMeta.label}</span>
            <span className="text-sm text-zinc-300">{formatPrice(projectMeta.basePrice)}</span>
          </div>
        </Section>

        {/* Features */}
        {features.length > 0 && (
          <Section title={`Fonctionnalités (${features.length})`}>
            <div className="space-y-1.5">
              {features.map((id) => {
                const f = FEATURES[id]
                if (!f) return null
                return (
                  <div key={id} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span className="text-sm text-zinc-300">{f.label}</span>
                    </div>
                    <span className="text-xs text-zinc-500">+{formatPrice(f.price)}</span>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

        {/* Modifiers */}
        {modifiers.length > 0 && (
          <Section title={`Options (${modifiers.length})`}>
            <div className="space-y-1.5">
              {modifiers.map((id) => {
                const m = MODIFIERS[id]
                const detail = breakdown.modifiers.find((d) => d.id === id)
                return (
                  <div key={id} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                      <span className="text-sm text-zinc-300">{m.label}</span>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {detail
                        ? m.type === 'percentage'
                          ? `+${formatPrice(detail.amount)}`
                          : `+${formatPrice(detail.amount)}`
                        : m.type === 'percentage'
                          ? `+${Math.round(m.value * 100)} %`
                          : `+${formatPrice(m.value)}`}
                    </span>
                  </div>
                )
              })}
            </div>
          </Section>
        )}

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Price breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Sous-total (base + fonctionnalités)</span>
            <span className="text-zinc-300">{formatPrice(breakdown.subtotal)}</span>
          </div>

          {breakdown.modifiers.length > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Options</span>
              <span className="text-zinc-300">
                +{formatPrice(breakdown.rawTotal - breakdown.subtotal)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <span className="font-semibold text-white">Total HT</span>
            {breakdown.displayMode === 'price' ? (
              <span className="text-lg font-bold text-white">{formatPrice(breakdown.totalHT)}</span>
            ) : breakdown.displayMode === 'sur-demande' ? (
              <span className="font-semibold text-amber-400">Sur demande</span>
            ) : (
              <span className="font-semibold text-amber-400">À partir de {formatPrice(40000)}</span>
            )}
          </div>

          {breakdown.displayMode === 'price' && (
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>Total TTC (TVA 20 %)</span>
              <span>{formatPrice(breakdown.totalTTC)}</span>
            </div>
          )}
        </div>

        {/* Duration */}
        <div className="border-white/8 flex items-center justify-between rounded-lg border bg-white/[0.03] px-4 py-3">
          <span className="text-sm text-zinc-400">Délai estimé</span>
          <span className="text-sm font-medium text-zinc-200">{breakdown.estimatedDuration}</span>
        </div>
      </div>

      <p className="text-xs text-zinc-600">
        Ces estimations sont indicatives et basées sur les options sélectionnées. Un devis détaillé
        vous sera envoyé après analyse de votre demande.
      </p>
    </div>
  )
}
