const steps = [
  {
    number: '01',
    title: 'Brief & cadrage',
    description:
      'On prend le temps de comprendre votre métier, vos objectifs et vos contraintes. Un appel de 30 minutes suffit pour cadrer 95% des projets.',
    duration: '1 jour',
  },
  {
    number: '02',
    title: 'Maquettes & validation',
    description:
      "Wireframes puis maquettes Figma haute-fidélité. On itère ensemble jusqu'à validation complète avant de coder la moindre ligne.",
    duration: '3-5 jours',
  },
  {
    number: '03',
    title: 'Développement',
    description:
      'Stack moderne, code propre, revues de code régulières. Accès à un environnement de staging tout au long du développement.',
    duration: '1-8 semaines',
  },
  {
    number: '04',
    title: 'Livraison & suivi',
    description:
      'Déploiement sur votre hébergeur ou Vercel. Formation, documentation, et support post-livraison inclus. On reste disponibles.',
    duration: '1-2 jours',
  },
]

export function ProcessSection() {
  return (
    <section id="processus" className="bg-[#09090B] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
            Notre processus
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            De l&apos;idée à la mise en ligne
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Un processus rodé, transparent et collaboratif. Vous savez toujours où on en est.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-0 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute left-[calc(50%+24px)] right-0 top-6 hidden h-px bg-gradient-to-r from-white/20 to-transparent lg:block"
                />
              )}

              <div className="flex flex-col gap-5 px-0 py-6 lg:px-6 lg:py-0">
                {/* Number badge */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <div className="h-px flex-1 bg-white/10 lg:hidden" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{step.description}</p>
                  <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
                    ⏱ {step.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
