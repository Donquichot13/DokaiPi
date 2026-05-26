import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Agri-Connect',
    category: 'Application web SaaS',
    description:
      'Plateforme de mise en relation entre producteurs locaux et restaurateurs. Gestion des commandes, facturation automatique et tableaux de bord analytics.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    gradient: 'from-emerald-900/60 to-teal-900/60',
    accent: 'bg-emerald-500',
  },
  {
    title: 'LexPro',
    category: 'Logiciel sur mesure',
    description:
      'Outil de gestion documentaire pour un cabinet d’avocats. Recherche sémantique, génération automatique de documents, accès sécurisé par rôle.',
    tags: ['Node.js', 'Prisma', 'Docker'],
    gradient: 'from-blue-900/60 to-indigo-900/60',
    accent: 'bg-blue-500',
  },
  {
    title: 'Nomad Market',
    category: 'Site e-commerce',
    description:
      'Boutique de mobilier nomade et tendance. Intégration Shopify, moteur de recherche avancé, module blog SEO, performance Core Web Vitals 95+.',
    tags: ['Shopify', 'SEO', 'Tailwind'],
    gradient: 'from-orange-900/60 to-amber-900/60',
    accent: 'bg-orange-500',
  },
  {
    title: 'FitTrack',
    category: 'Application mobile',
    description:
      "Suivi d'entraînement iOS & Android avec coach IA intégré. Recommandations personnalisées, sync Apple Health / Google Fit, notifications push.",
    tags: ['Flutter', 'Firebase', 'IA'],
    gradient: 'from-rose-900/60 to-pink-900/60',
    accent: 'bg-rose-500',
  },
]

export function PortfolioSection() {
  return (
    <section id="realisations" className="bg-[#09090B] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
              Réalisations
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Ce qu&apos;on a construit
            </h2>
          </div>
          <p className="max-w-sm text-sm text-zinc-500">
            Des projets réels, livrés dans les délais, avec un code propre et maintenable.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="border-white/8 group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-white/15"
            >
              {/* Gradient background */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                </div>
                {/* Category badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white/3 p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <ArrowUpRight
                    size={18}
                    className="mt-0.5 shrink-0 text-zinc-600 transition-colors group-hover:text-white"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-white/8 rounded-full border bg-white/5 px-2.5 py-0.5 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/devis"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Démarrer votre projet
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
