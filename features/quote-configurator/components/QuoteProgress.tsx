const STEPS = [
  { n: 1, label: 'Type de projet' },
  { n: 2, label: 'Features' },
  { n: 3, label: 'Options' },
  { n: 4, label: 'Récapitulatif' },
  { n: 5, label: 'Vos coordonnées' },
]

export function QuoteProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full">
      {/* Mobile: step X/5 */}
      <p className="mb-4 text-center text-sm text-zinc-500 md:hidden">
        Étape {currentStep} / {STEPS.length} — {STEPS[currentStep - 1]?.label}
      </p>

      {/* Desktop: full stepper */}
      <div className="hidden items-center md:flex">
        {STEPS.map((step, idx) => (
          <div key={step.n} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all ${
                  step.n < currentStep
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : step.n === currentStep
                      ? 'border-white bg-white text-black'
                      : 'border-white/20 bg-transparent text-zinc-500'
                }`}
              >
                {step.n < currentStep ? '✓' : step.n}
              </div>
              <span
                className={`text-[10px] font-medium ${step.n === currentStep ? 'text-white' : 'text-zinc-600'}`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`mx-3 h-px flex-1 transition-colors ${step.n < currentStep ? 'bg-emerald-500/50' : 'bg-white/10'}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0075FF] to-[#582CFF] transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}
