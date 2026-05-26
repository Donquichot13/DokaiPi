'use client'

import { UseFormReturn } from 'react-hook-form'
import { Monitor, ShoppingBag, LayoutDashboard, Smartphone, Cpu } from 'lucide-react'
import { QuoteFormData } from '../lib/schema'
import { ProjectTypeId, PROJECT_TYPES } from '../lib/pricing'

const PROJECT_TYPE_META: Record<
  ProjectTypeId,
  { icon: React.ComponentType<{ className?: string }>; description: string; highlight: string }
> = {
  'site-vitrine': {
    icon: Monitor,
    description: "Présence en ligne professionnelle, SEO, mobile-first. Jusqu'à 6 pages.",
    highlight: 'Artisans, PME, libéraux',
  },
  'site-ecom': {
    icon: ShoppingBag,
    description:
      'Boutique en ligne complète avec paiement sécurisé, gestion produits et commandes.',
    highlight: 'Vente en ligne',
  },
  webapp: {
    icon: LayoutDashboard,
    description: 'Application SaaS, dashboard, outil métier. Architecture scalable et maintenable.',
    highlight: 'Startups, SaaS',
  },
  mobile: {
    icon: Smartphone,
    description: 'iOS & Android depuis une seule codebase. Publication stores incluse.',
    highlight: 'Apps cross-platform',
  },
  logiciel: {
    icon: Cpu,
    description:
      'Automatisations, outils internes, migrations. Pour des besoins métier spécifiques.',
    highlight: 'Entreprises, ETI',
  },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

interface Props {
  form: UseFormReturn<QuoteFormData>
}

export function QuoteStep1({ form }: Props) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form
  const selected = watch('projectType')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Quel type de projet souhaitez-vous réaliser&nbsp;?
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Sélectionnez la catégorie qui correspond le mieux à votre besoin.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {(
          Object.entries(PROJECT_TYPES) as [ProjectTypeId, { label: string; basePrice: number }][]
        ).map(([id, { label, basePrice }]) => {
          const meta = PROJECT_TYPE_META[id]
          const Icon = meta.icon
          const isSelected = selected === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => setValue('projectType', id, { shouldValidate: true })}
              className={`group relative flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                isSelected
                  ? 'border-white/40 bg-white/[0.07] shadow-lg'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              {/* Selection indicator */}
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isSelected ? 'border-white bg-white' : 'border-white/30'
                }`}
              >
                {isSelected && <div className="h-2 w-2 rounded-full bg-black" />}
              </div>

              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isSelected ? 'bg-gradient-to-br from-[#0075FF]/30 to-[#582CFF]/30' : 'bg-white/5'
                }`}
              >
                <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-zinc-400'}`} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className={`font-medium ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                    {label}
                  </span>
                  <span
                    className={`shrink-0 text-sm font-semibold ${isSelected ? 'text-white' : 'text-zinc-300'}`}
                  >
                    à partir de {formatPrice(basePrice)}
                  </span>
                </div>
                <p
                  className={`mt-1 text-xs leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}
                >
                  {meta.description}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                    isSelected ? 'bg-white/10 text-zinc-300' : 'bg-white/5 text-zinc-500'
                  }`}
                >
                  {meta.highlight}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {errors.projectType && <p className="text-sm text-red-400">{errors.projectType.message}</p>}
    </div>
  )
}
