'use client'

import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData } from '../lib/schema'
import { FEATURES, FeatureId, ProjectTypeId, isFeatureApplicable } from '../lib/pricing'

// ─── Feature groups ────────────────────────────────────────────────────────────

const FEATURE_GROUPS: { label: string; ids: FeatureId[] }[] = [
  {
    label: 'Authentification',
    ids: ['auth-basic', 'auth-social', 'auth-2fa', 'user-profiles', 'roles-permissions'],
  },
  {
    label: 'Paiement',
    ids: ['payment-stripe', 'subscriptions', 'invoicing', 'multi-currency'],
  },
  {
    label: 'Contenu & SEO',
    ids: ['cms-integration', 'blog', 'i18n', 'seo-advanced'],
  },
  {
    label: 'Communication',
    ids: ['contact-form', 'email-transac', 'push-notifications', 'live-chat', 'newsletter'],
  },
  {
    label: 'Data & Dashboard',
    ids: ['admin-dashboard', 'analytics', 'data-export', 'api-public', 'search-advanced'],
  },
  {
    label: 'Intégrations',
    ids: ['crm-integration', 'calendar-sync', 'maps', 'social-share', 'webhook-api'],
  },
  {
    label: 'Design & UX',
    ids: ['3d-experience', 'custom-animations', 'dark-mode', 'pwa'],
  },
  {
    label: 'Intelligence artificielle',
    ids: ['ai-chatbot', 'ai-content-gen', 'ai-recommendations', 'ai-search'],
  },
]

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

export function QuoteStep2({ form }: Props) {
  const { watch, setValue } = form
  const projectType = watch('projectType') as ProjectTypeId | undefined
  const selectedFeatures = watch('features') ?? []

  const toggle = (id: FeatureId) => {
    if (selectedFeatures.includes(id)) {
      setValue(
        'features',
        selectedFeatures.filter((f) => f !== id),
        { shouldDirty: true }
      )
    } else {
      setValue('features', [...selectedFeatures, id], { shouldDirty: true })
    }
  }

  // For each group, determine which features are applicable
  const applicableGroups = FEATURE_GROUPS.map((group) => ({
    ...group,
    ids: group.ids.filter((id) => {
      if (!projectType) return true // show all if no project type selected yet
      return isFeatureApplicable(id, projectType)
    }),
  })).filter((g) => g.ids.length > 0)

  if (!projectType) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
        <p className="text-sm text-zinc-500">
          Sélectionnez d&apos;abord un type de projet à l&apos;étape précédente.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Quelles fonctionnalités souhaitez-vous&nbsp;?
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          Cochez les fonctionnalités dont vous avez besoin. Seules les options compatibles avec
          votre projet sont affichées.
        </p>
      </div>

      {selectedFeatures.length > 0 && (
        <p className="text-xs text-zinc-500">
          {selectedFeatures.length} fonctionnalité{selectedFeatures.length > 1 ? 's' : ''}{' '}
          sélectionnée
          {selectedFeatures.length > 1 ? 's' : ''}
        </p>
      )}

      <div className="space-y-5">
        {applicableGroups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              {group.label}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {group.ids.map((id) => {
                const feature = FEATURES[id]
                const isChecked = selectedFeatures.includes(id)

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggle(id)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                      isChecked
                        ? 'border-white/30 bg-white/[0.06]'
                        : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                        isChecked ? 'border-white bg-white' : 'border-white/30 bg-transparent'
                      }`}
                    >
                      {isChecked && (
                        <svg className="h-2.5 w-2.5 text-black" viewBox="0 0 10 10" fill="none">
                          <path
                            d="M2 5l2.5 2.5L8 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Label + price */}
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block text-sm ${isChecked ? 'text-white' : 'text-zinc-300'}`}
                      >
                        {feature.label}
                      </span>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium ${isChecked ? 'text-zinc-300' : 'text-zinc-500'}`}
                    >
                      +{formatPrice(feature.price)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
