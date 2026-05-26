import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ServiceData } from '../data'

export function ServiceCta({ service }: { service: ServiceData }) {
  return (
    <section className="bg-[#09090B] pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="bg-white/3 rounded-3xl border border-white/10 p-10 text-center lg:p-16">
          <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Prêt à démarrer votre {service.label.toLowerCase()} ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Utilisez notre configurateur pour obtenir un prix indicatif en 5 minutes, puis on prend
            rendez-vous pour affiner ensemble.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/devis?type=${service.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0075FF] to-[#582CFF] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-opacity hover:opacity-90"
            >
              Configurer mon {service.label.toLowerCase()}
              <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:contact@dokaipi.fr"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Discuter du projet
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
