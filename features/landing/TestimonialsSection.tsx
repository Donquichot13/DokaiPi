const testimonials = [
  {
    quote:
      'Livraison en 3 semaines pile, exactement comme convenu. Le site est rapide, beau et mon référencement a explosé en 2 mois. Je recommande sans hésiter.',
    name: 'Sarah Lefebvre',
    role: 'Fondatrice',
    company: 'Atelier Botanique',
    stars: 5,
    initials: 'SL',
    gradient: 'from-violet-600 to-purple-600',
  },
  {
    quote:
      "Excellente communication tout au long du projet. Les maquettes Figma étaient exactement ce qu'on voulait, et le dev a suivi sans surprise. Parfait.",
    name: 'Marc Dupuis',
    role: 'CTO',
    company: 'Logistix Pro',
    stars: 5,
    initials: 'MD',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    quote:
      "Notre app mobile a été publiée sur les deux stores en 6 semaines. Les retours clients sont excellents — l'UX est fluide et les perfs au top.",
    name: 'Inès Moreau',
    role: 'CEO',
    company: 'FreshKids',
    stars: 5,
    initials: 'IM',
    gradient: 'from-emerald-600 to-teal-600',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-amber-400">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-[#09090B] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
            Témoignages
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Ce que disent nos clients
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="border-white/8 bg-white/3 flex flex-col gap-5 rounded-2xl border p-6"
            >
              <Stars count={t.stars} />
              <blockquote className="flex-1 text-sm leading-relaxed text-zinc-400">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-xs font-bold text-white`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
