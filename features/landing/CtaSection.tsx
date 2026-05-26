import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="bg-[#09090B] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0075FF]/10 to-[#582CFF]/10 p-12 text-center lg:p-20">
          {/* Background decoration */}
          <div
            aria-hidden
            className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0075FF]/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#582CFF]/10 blur-3xl"
          />
          <div aria-hidden className="border-white/8 absolute inset-0 rounded-3xl border" />

          <div className="relative">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
              Démarrons ensemble
            </p>
            <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Votre projet mérite
              <br />
              une équipe à la hauteur.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
              Premier échange gratuit et sans engagement. On vous répond sous 24h ouvrées et on
              prend le temps de comprendre votre besoin avant tout.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-lg transition-opacity hover:opacity-90"
              >
                Démarrer mon projet
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:contact@dokaipi.fr"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                <Mail size={16} />
                contact@dokaipi.fr
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
