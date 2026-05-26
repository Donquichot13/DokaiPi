import { CheckCircle2 } from 'lucide-react'
import type { ServiceData } from '../data'

export function ServiceDeliverables({ service }: { service: ServiceData }) {
  return (
    <section className="border-white/8 border-y bg-[#09090B] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Deliverables */}
          <div>
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-white lg:text-3xl">
              Ce qu&apos;on livre
            </h2>
            <ul className="space-y-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span className="text-sm leading-relaxed text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-white lg:text-3xl">
              Stack technique
            </h2>
            <div className="flex flex-wrap gap-3">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              Stack choisie pour sa robustesse, sa maintenabilité et son écosystème. On
              n&apos;utilise pas de technologies exotiques — votre code doit rester lisible par
              n&apos;importe quel développeur.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
