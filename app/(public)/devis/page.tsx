import type { Metadata } from 'next'
import { QuoteConfigurator } from '@/features/quote-configurator/components/QuoteConfigurator'

export const metadata: Metadata = {
  title: 'Devis en ligne | DokaiPi',
  description:
    'Configurez votre projet en 5 étapes et obtenez une estimation instantanée. Devis détaillé sous 24h, sans engagement.',
  openGraph: {
    title: 'Configurateur de devis | DokaiPi',
    description: 'Estimez le coût de votre projet web en quelques minutes.',
  },
}

export default function DevisPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero header */}
      <div className="border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-zinc-400">Devis en ligne</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Configurez votre projet
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Répondez à 5 questions pour obtenir une estimation instantanée. Un devis détaillé vous
              sera envoyé sous 24h.
            </p>
          </div>
        </div>
      </div>

      {/* Configurator */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <QuoteConfigurator />
      </div>
    </div>
  )
}
