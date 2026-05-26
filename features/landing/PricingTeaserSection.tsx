import Link from 'next/link'
import { ArrowRight, Sliders, Clock, ShieldCheck } from 'lucide-react'

const highlights = [
  {
    icon: Sliders,
    title: 'Configurateur en ligne',
    desc: '5 types de projets, 34 features, 8 modificateurs. Prix instantané.',
  },
  {
    icon: Clock,
    title: 'Estimation en 5 minutes',
    desc: 'Répondez à quelques questions, obtenez un devis indicatif précis.',
  },
  {
    icon: ShieldCheck,
    title: 'Prix justes et transparents',
    desc: 'Volontairement sous le marché agence. Devis définitif après échange.',
  },
]

export function PricingTeaserSection() {
  return (
    <section id="tarifs" className="bg-[#09090B] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1535]/80 to-[#070C2B]/80">
          <div className="grid gap-12 p-10 lg:grid-cols-2 lg:gap-0 lg:p-16">
            {/* Left */}
            <div className="flex flex-col justify-center gap-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
                Tarification transparente
              </p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
                Combien coûte
                <br />
                votre projet ?
              </h2>
              <p className="text-lg text-zinc-400">
                Pas de tarif caché, pas d&apos;attente. Configurez votre projet en ligne et obtenez
                un prix indicatif en quelques clics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/devis"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0075FF] to-[#582CFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-opacity hover:opacity-90"
                >
                  Configurer mon projet
                  <ArrowRight size={16} />
                </Link>
                <div className="inline-flex items-center gap-2 text-sm text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Réponse sous 24h ouvrées
                </div>
              </div>

              {/* Price anchors */}
              <div className="border-white/8 flex flex-wrap gap-6 border-t pt-6 text-sm">
                <div>
                  <div className="font-semibold text-white">Dès 1 800 €</div>
                  <div className="text-zinc-500">Site vitrine</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Dès 3 200 €</div>
                  <div className="text-zinc-500">E-commerce</div>
                </div>
                <div>
                  <div className="font-semibold text-white">Dès 5 500 €</div>
                  <div className="text-zinc-500">Application web</div>
                </div>
              </div>
            </div>

            {/* Right — highlights */}
            <div className="flex flex-col justify-center gap-6 lg:pl-16">
              {highlights.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon size={18} className="text-[#0075FF]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{h.title}</h3>
                      <p className="mt-1 text-sm text-zinc-500">{h.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
