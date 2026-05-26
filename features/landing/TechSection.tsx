const techStack = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'UI' },
  { name: 'TypeScript', category: 'Langage' },
  { name: 'Tailwind CSS', category: 'Styles' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Base de données' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'Vercel', category: 'Déploiement' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Stripe', category: 'Paiement' },
  { name: 'Sanity', category: 'CMS' },
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'Figma', category: 'Design' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'GitHub Actions', category: 'CI/CD' },
]

export function TechSection() {
  return (
    <section className="border-white/8 border-y bg-[#09090B] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">
          Stack & outils maîtrisés
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="border-white/8 bg-white/3 hover:bg-white/6 flex items-center gap-2 rounded-lg border px-4 py-2.5 transition-colors hover:border-white/15"
            >
              <span className="text-sm font-medium text-zinc-300">{tech.name}</span>
              <span className="bg-white/8 rounded-full px-2 py-0.5 text-[10px] text-zinc-500">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
