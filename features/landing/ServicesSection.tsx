import Link from 'next/link'
import { Monitor, ShoppingBag, LayoutDashboard, Smartphone, Cpu, ArrowRight } from 'lucide-react'

const services = [
  {
    slug: 'site-vitrine',
    icon: Monitor,
    label: 'Site vitrine',
    price: '1 800',
    description:
      'Présence en ligne professionnelle, jusqu’à 6 pages optimisées SEO. Délai : 2-4 semaines.',
    color: 'from-blue-600 to-blue-400',
  },
  {
    slug: 'site-ecommerce',
    icon: ShoppingBag,
    label: 'Site e-commerce',
    price: '3 200',
    description:
      'Boutique Shopify ou WooCommerce avec paiement intégré, catalogue produits, gestion commandes.',
    color: 'from-violet-600 to-violet-400',
  },
  {
    slug: 'application-web',
    icon: LayoutDashboard,
    label: 'Application web / SaaS',
    price: '5 500',
    description:
      'Dashboard, outil métier ou SaaS. Architecture moderne, authentification, API REST, CI/CD.',
    color: 'from-cyan-600 to-cyan-400',
  },
  {
    slug: 'application-mobile',
    icon: Smartphone,
    label: 'Application mobile',
    price: '6 900',
    description:
      'iOS + Android via Flutter ou React Native. Publication sur les stores, notifications push.',
    color: 'from-emerald-600 to-emerald-400',
  },
  {
    slug: 'logiciel-sur-mesure',
    icon: Cpu,
    label: 'Logiciel sur mesure',
    price: '5 200',
    description:
      'Backend, outil interne ou automatisation. Scripts, API, intégrations métier, migrations de données.',
    color: 'from-orange-600 to-orange-400',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#09090B] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
            Nos services
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            Ce qu&apos;on crée pour vous
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Du site vitrine à l&apos;application mobile complexe — on couvre tous les besoins
            digitaux avec la même exigence.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="border-white/8 bg-white/3 hover:bg-white/6 group relative flex flex-col gap-5 rounded-2xl border p-6 transition-all duration-300 hover:border-white/15"
              >
                {/* Icon */}
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-lg`}
                >
                  <Icon size={20} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white">{service.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {service.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">
                    À partir de{' '}
                    <strong className="font-semibold text-white">{service.price} €</strong>
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>
              </Link>
            )
          })}

          {/* CTA card */}
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-transparent p-6 text-center">
            <p className="text-sm text-zinc-400">
              Projet unique ? Besoin d&apos;un devis personnalisé ?
            </p>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0075FF] to-[#582CFF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-opacity hover:opacity-90"
            >
              Configurateur de devis
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
