'use client'

import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData } from '../lib/schema'
import { MODIFIERS, ModifierId, ProjectTypeId } from '../lib/pricing'

function formatModifierValue(id: ModifierId): string {
  const mod = MODIFIERS[id]
  if (mod.type === 'percentage') {
    return `+${Math.round(mod.value * 100)} %`
  }
  return `+${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(mod.value)}`
}

const MODIFIER_DESCRIPTIONS: Record<ModifierId, string> = {
  'design-premium':
    'Maquettes Figma uniques, pixel-perfect. Aucun template, aucun compromis visuel.',
  'urgency-30d': 'Livraison garantie en moins de 30 jours. Priorité absolue sur nos plannings.',
  'urgency-15d': 'Livraison garantie en moins de 15 jours. Équipe dédiée, sprints quotidiens.',
  'maintenance-6m': 'Support technique, correctifs et mises à jour de sécurité pendant 6 mois.',
  'maintenance-1y': 'Support technique, correctifs et mises à jour de sécurité pendant 12 mois.',
  'extended-warranty': 'Garantie tous risques 2 ans. Interventions illimitées incluses.',
  'code-ownership':
    'Cession complète des droits sur le code source. Vous êtes propriétaire à 100 %.',
  'native-mobile':
    'Développement séparé iOS (Swift/SwiftUI) et Android (Kotlin). Performances maximales.',
}

interface OptionCardProps {
  id: ModifierId
  isChecked: boolean
  isDisabled?: boolean
  onToggle: (id: ModifierId) => void
}

function OptionCard({ id, isChecked, isDisabled = false, onToggle }: OptionCardProps) {
  const mod = MODIFIERS[id]

  return (
    <button
      type="button"
      onClick={() => !isDisabled && onToggle(id)}
      disabled={isDisabled}
      className={`group relative flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-40 ${
        isChecked
          ? 'border-white/30 bg-white/[0.07]'
          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      {/* Checkbox toggle */}
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
          isChecked ? 'border-white bg-white' : 'border-white/30 bg-transparent'
        }`}
      >
        {isChecked && (
          <svg className="h-3 w-3 text-black" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5l2.5 2.5L8 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <span className={`font-medium ${isChecked ? 'text-white' : 'text-zinc-200'}`}>
            {mod.label}
          </span>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
              isChecked ? 'bg-white/15 text-white' : 'bg-white/5 text-zinc-400'
            }`}
          >
            {formatModifierValue(id)}
          </span>
        </div>
        <p
          className={`mt-1.5 text-xs leading-relaxed ${isChecked ? 'text-zinc-300' : 'text-zinc-500'}`}
        >
          {MODIFIER_DESCRIPTIONS[id]}
        </p>
        {isDisabled && (
          <span className="mt-2 inline-block text-[10px] text-amber-500/70">
            Option réservée aux projets Application mobile
          </span>
        )}
      </div>
    </button>
  )
}

interface Props {
  form: UseFormReturn<QuoteFormData>
}

export function QuoteStep3({ form }: Props) {
  const { watch, setValue } = form
  const projectType = watch('projectType') as ProjectTypeId | undefined
  const selectedModifiers = watch('modifiers') ?? []

  const toggle = (id: ModifierId) => {
    if (selectedModifiers.includes(id)) {
      setValue(
        'modifiers',
        selectedModifiers.filter((m) => m !== id),
        { shouldDirty: true }
      )
    } else {
      setValue('modifiers', [...selectedModifiers, id], { shouldDirty: true })
    }
  }

  const groups: { label: string; ids: ModifierId[] }[] = [
    {
      label: 'Design',
      ids: ['design-premium'],
    },
    {
      label: 'Urgence',
      ids: ['urgency-30d', 'urgency-15d'],
    },
    {
      label: 'Maintenance & support',
      ids: ['maintenance-6m', 'maintenance-1y', 'extended-warranty'],
    },
    {
      label: 'Propriété & déploiement',
      ids: ['code-ownership', 'native-mobile'],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Options et services complémentaires</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Personnalisez votre projet avec des services additionnels. Ces options s&apos;appliquent
          en supplément du prix de base.
        </p>
      </div>

      {selectedModifiers.length > 0 && (
        <p className="text-xs text-zinc-500">
          {selectedModifiers.length} option{selectedModifiers.length > 1 ? 's' : ''} sélectionnée
          {selectedModifiers.length > 1 ? 's' : ''}
        </p>
      )}

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.ids.map((id) => (
                <OptionCard
                  key={id}
                  id={id}
                  isChecked={selectedModifiers.includes(id)}
                  isDisabled={id === 'native-mobile' && projectType !== 'mobile'}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
