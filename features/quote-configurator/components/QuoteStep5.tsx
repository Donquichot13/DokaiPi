'use client'

import { UseFormReturn } from 'react-hook-form'
import { QuoteFormData } from '../lib/schema'

interface InputProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function Field({ label, required, error, children }: InputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-zinc-300">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/25 focus:bg-white/[0.06] focus:ring-0'

const HOW_OPTIONS = [
  { value: 'google', label: 'Recherche Google' },
  { value: 'recommendation', label: 'Recommandation' },
  { value: 'social', label: 'Réseaux sociaux' },
  { value: 'other', label: 'Autre' },
] as const

interface Props {
  form: UseFormReturn<QuoteFormData>
}

export function QuoteStep5({ form }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form

  const howDidYouHear = watch('howDidYouHear')
  const rgpdConsent = watch('rgpdConsent')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Vos coordonnées</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Ces informations nous permettent de vous envoyer votre devis et d&apos;organiser un
          premier échange.
        </p>
      </div>

      <div className="space-y-5">
        {/* Name + Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom complet" required error={errors.name?.message}>
            <input
              {...register('name')}
              type="text"
              placeholder="Jean Dupont"
              autoComplete="name"
              className={inputClass}
            />
          </Field>

          <Field label="Adresse email" required error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              placeholder="jean@example.com"
              autoComplete="email"
              className={inputClass}
            />
          </Field>
        </div>

        {/* Phone + Company */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Téléphone" error={errors.phone?.message}>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+33 6 00 00 00 00"
              autoComplete="tel"
              className={inputClass}
            />
          </Field>

          <Field label="Entreprise" error={errors.company?.message}>
            <input
              {...register('company')}
              type="text"
              placeholder="Acme SAS"
              autoComplete="organization"
              className={inputClass}
            />
          </Field>
        </div>

        {/* Website */}
        <Field label="Site web actuel" error={errors.website?.message}>
          <input
            {...register('website')}
            type="url"
            placeholder="https://monsite.fr"
            autoComplete="url"
            className={inputClass}
          />
        </Field>

        {/* Message */}
        <Field label="Message (optionnel)" error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows={4}
            placeholder="Décrivez votre projet, vos objectifs, vos contraintes particulières..."
            className={`${inputClass} resize-none`}
          />
          <p className="text-right text-[10px] text-zinc-600">
            {watch('message')?.length ?? 0} / 1000 caractères
          </p>
        </Field>

        {/* How did you hear */}
        <Field
          label="Comment nous avez-vous connus&nbsp;?"
          required
          error={errors.howDidYouHear?.message}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {HOW_OPTIONS.map((opt) => {
              const isSelected = howDidYouHear === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValue('howDidYouHear', opt.value, { shouldValidate: true })}
                  className={`rounded-lg border py-2.5 text-center text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                    isSelected
                      ? 'border-white/30 bg-white/[0.08] text-white'
                      : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:text-zinc-300'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </Field>

        {/* RGPD */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <button
            type="button"
            onClick={() => setValue('rgpdConsent', !rgpdConsent as true, { shouldValidate: true })}
            className="flex items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <div
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                rgpdConsent ? 'border-white bg-white' : 'border-white/30 bg-transparent'
              }`}
            >
              {rgpdConsent && (
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
            <p className="text-xs leading-relaxed text-zinc-400">
              J&apos;accepte que mes données personnelles soient traitées par DokaiPi dans le but de
              répondre à ma demande de devis, conformément à notre{' '}
              <span className="text-zinc-300 underline">politique de confidentialité</span>. Ces
              données ne seront pas transmises à des tiers.
              <span className="ml-1 text-red-400">*</span>
            </p>
          </button>
          {errors.rgpdConsent && (
            <p className="mt-2 text-xs text-red-400">{errors.rgpdConsent.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
