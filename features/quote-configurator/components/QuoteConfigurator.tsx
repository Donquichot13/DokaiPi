'use client'

import { useState, useMemo, useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { quoteFormSchema, QuoteFormData } from '../lib/schema'
import { calculatePrice, ProjectTypeId, FeatureId, ModifierId } from '../lib/pricing'
import { createQuote } from '../actions/createQuote'
import { QuoteProgress } from './QuoteProgress'
import { QuoteStep1 } from './QuoteStep1'
import { QuoteStep2 } from './QuoteStep2'
import { QuoteStep3 } from './QuoteStep3'
import { QuoteStep4 } from './QuoteStep4'
import { QuoteStep5 } from './QuoteStep5'
import { PriceSummary } from './PriceSummary'

// Step-field map: fields to validate before advancing from each step
const STEP_FIELDS: Record<number, (keyof QuoteFormData)[]> = {
  1: ['projectType'],
  2: [],
  3: [],
  4: [],
  5: ['name', 'email', 'howDidYouHear', 'rgpdConsent'],
}

// ─── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ quoteNumber }: { quoteNumber: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
      </div>
      <h2 className="text-2xl font-bold text-white">Demande envoyée&nbsp;!</h2>
      <p className="mt-2 max-w-md text-zinc-400">
        Votre demande de devis a bien été reçue. Nous revenons vers vous sous 24 heures ouvrées.
      </p>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-4">
        <p className="text-xs text-zinc-500">Référence</p>
        <p className="mt-1 text-xl font-bold tracking-wider text-white">{quoteNumber}</p>
        <p className="mt-1 text-xs text-zinc-600">Un email de confirmation vous a été envoyé.</p>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}

// ─── Main configurator ─────────────────────────────────────────────────────────

export function QuoteConfigurator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [quoteNumber, setQuoteNumber] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: 'onTouched',
    defaultValues: {
      projectType: undefined as unknown as QuoteFormData['projectType'],
      features: [],
      modifiers: [],
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      message: '',
      howDidYouHear: undefined as unknown as QuoteFormData['howDidYouHear'],
      rgpdConsent: false as unknown as true,
    },
  })

  const projectType = form.watch('projectType') as ProjectTypeId | undefined
  const rawFeatures = form.watch('features')
  const rawModifiers = form.watch('modifiers')

  const breakdown = useMemo(() => {
    if (!projectType) return null
    return calculatePrice(
      projectType,
      (rawFeatures ?? []) as FeatureId[],
      (rawModifiers ?? []) as ModifierId[]
    )
  }, [projectType, rawFeatures, rawModifiers])

  // ── Navigation ────────────────────────────────────────────────────────────

  const goNext = async () => {
    const fields = STEP_FIELDS[currentStep]
    if (fields && fields.length > 0) {
      const valid = await form.trigger(fields)
      if (!valid) return
    }
    setCurrentStep((s) => Math.min(s + 1, 5))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goPrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  const onSubmit = (data: QuoteFormData) => {
    setSubmitError(null)
    startTransition(async () => {
      const result = await createQuote(data)
      if (result.success) {
        setQuoteNumber(result.quoteNumber)
      } else {
        setSubmitError(result.error)
      }
    })
  }

  // ── Success state ─────────────────────────────────────────────────────────

  if (quoteNumber) {
    return <SuccessScreen quoteNumber={quoteNumber} />
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="mb-8">
        <QuoteProgress currentStep={currentStep} />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main form area */}
        <div className="lg:col-span-2">
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            {/* Step panels */}
            <div className="min-h-[480px]">
              {currentStep === 1 && <QuoteStep1 form={form} />}
              {currentStep === 2 && <QuoteStep2 form={form} />}
              {currentStep === 3 && <QuoteStep3 form={form} />}
              {currentStep === 4 && <QuoteStep4 form={form} breakdown={breakdown} />}
              {currentStep === 5 && <QuoteStep5 form={form} />}
            </div>

            {/* Error banner */}
            {submitError && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {submitError}
              </div>
            )}

            {/* Navigation bar */}
            <div className="border-white/8 mt-8 flex items-center justify-between border-t pt-6">
              {/* Back button */}
              <button
                type="button"
                onClick={goPrev}
                disabled={currentStep === 1}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-200 disabled:pointer-events-none disabled:opacity-0"
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </button>

              {/* Forward / Submit button */}
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0075FF] to-[#582CFF] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0075FF] to-[#582CFF] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer ma demande
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <PriceSummary breakdown={breakdown} currentStep={currentStep} />
        </div>
      </div>
    </div>
  )
}
