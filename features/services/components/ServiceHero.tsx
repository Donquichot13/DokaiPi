import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import type { ServiceData } from '../data'

export function ServiceHero({ service }: { service: ServiceData }) {
  const Icon = service.icon
  return (
    <section className={`relative overflow-hidden bg-[#09090B] pb-16 pt-24 lg:pb-24 lg:pt-32`}>
      {/* Gradient background */}
      <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${service.heroGradient}`} />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="transition-colors hover:text-zinc-300">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/#services" className="transition-colors hover:text-zinc-300">
            Services
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{service.label}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — text */}
          <div>
            <div
              className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5`}
            >
              <Icon size={22} className={service.accentColor} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl xl:text-6xl">
              {service.label}
            </h1>
            <p className="mt-4 text-xl font-medium text-zinc-300">{service.tagline}</p>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">{service.description}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Obtenir un devis
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Configurer le prix
              </Link>
            </div>
          </div>

          {/* Right — price card */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              À partir de
            </div>
            <div className="mt-2 text-5xl font-bold text-white">
              {service.basePrice.toLocaleString('fr-FR')}
              <span className="text-2xl font-medium text-zinc-400"> €HT</span>
            </div>
            <div className="mt-1 text-sm text-zinc-500">
              Prix indicatif · Devis personnalisé après échange
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <Clock size={16} className="shrink-0 text-zinc-400" />
              <span className="text-sm text-zinc-400">
                Délai estimé :{' '}
                <strong className="font-medium text-white">{service.duration}</strong>
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-zinc-600">
              * Prix HT. TVA 20% applicable. Le prix final dépend des features et modificateurs
              sélectionnés dans le configurateur.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
