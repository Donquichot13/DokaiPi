'use client'

import { PriceBreakdown } from '../lib/pricing'

function formatPrice(n: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

interface Props {
  breakdown: PriceBreakdown | null
  currentStep: number
}

export function PriceSummary({ breakdown, currentStep }: Props) {
  if (!breakdown) {
    return (
      <div className="sticky top-6 rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm font-medium text-zinc-500">Estimation du prix</p>
        <p className="mt-3 text-xs text-zinc-600">
          Sélectionnez un type de projet pour voir l&apos;estimation en temps réel.
        </p>
      </div>
    )
  }

  const { displayMode, basePrice, featuresTotal, modifiers, totalHT, totalTTC, estimatedDuration } =
    breakdown

  return (
    <div className="sticky top-6 space-y-4">
      {/* Main price card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Estimation</p>

        {/* Price display */}
        <div className="mt-3">
          {displayMode === 'price' ? (
            <>
              <p className="text-3xl font-bold text-white">{formatPrice(totalHT)}</p>
              <p className="mt-0.5 text-xs text-zinc-500">HT — soit {formatPrice(totalTTC)} TTC</p>
            </>
          ) : displayMode === 'sur-demande' ? (
            <>
              <p className="text-xl font-bold text-amber-400">Sur demande</p>
              <p className="mt-1 text-xs text-zinc-500">Projet hors grille tarifaire standard</p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold text-amber-400">À partir de {formatPrice(40000)}</p>
              <p className="mt-1 text-xs text-zinc-500">Devis sur mesure requis</p>
            </>
          )}
        </div>

        {/* Duration */}
        <div className="border-white/8 mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-xs text-zinc-500">Délai estimé</span>
          <span className="text-xs font-medium text-zinc-300">{estimatedDuration}</span>
        </div>
      </div>

      {/* Breakdown details (show from step 2+) */}
      {currentStep >= 2 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Détail
          </p>

          <div className="space-y-2 text-xs">
            {/* Base */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Base projet</span>
              <span className="text-zinc-300">{formatPrice(basePrice)}</span>
            </div>

            {/* Features total */}
            {featuresTotal > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Fonctionnalités</span>
                <span className="text-zinc-300">+{formatPrice(featuresTotal)}</span>
              </div>
            )}

            {/* Modifiers */}
            {modifiers.map((mod) => (
              <div key={mod.id} className="flex items-center justify-between">
                <span className="max-w-[150px] truncate text-zinc-400" title={mod.label}>
                  {mod.label}
                </span>
                <span className="text-zinc-300">+{formatPrice(mod.amount)}</span>
              </div>
            ))}

            {/* Subtotal line */}
            {(featuresTotal > 0 || modifiers.length > 0) && (
              <>
                <div className="border-white/8 border-t pt-2" />
                <div className="flex items-center justify-between font-medium">
                  <span className="text-zinc-300">Total HT</span>
                  {displayMode === 'price' ? (
                    <span className="text-white">{formatPrice(totalHT)}</span>
                  ) : (
                    <span className="text-amber-400">—</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Trust badges */}
      <div className="border-white/8 space-y-2 rounded-xl border bg-white/[0.02] p-4">
        {['Devis détaillé sous 24h', 'Sans engagement', 'Paiement en plusieurs fois possible'].map(
          (item) => (
            <div key={item} className="flex items-center gap-2">
              <svg
                className="h-3.5 w-3.5 shrink-0 text-emerald-500"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2.5 7l3 3L11.5 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs text-zinc-400">{item}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}
