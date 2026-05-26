import type { ServiceData } from '../data'

export function ServiceFeatures({ service }: { service: ServiceData }) {
  return (
    <section className="bg-[#09090B] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-12 text-2xl font-bold tracking-tight text-white lg:text-3xl">
          Ce qui est inclus
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {service.features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="border-white/8 bg-white/3 rounded-2xl border p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon size={18} className={service.accentColor} />
                </div>
                <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
