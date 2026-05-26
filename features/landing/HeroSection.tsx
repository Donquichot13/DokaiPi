'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useReducedMotion, motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const HeroCanvas = dynamic(() => import('./HeroCanvas').then((m) => m.HeroCanvas), {
  ssr: false,
  loading: () => <HeroFallback />,
})

function HeroFallback() {
  return (
    <div className="relative h-full w-full">
      {/* Gradient orbs — static, LCP-safe */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0075FF] opacity-20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute left-1/3 top-1/3 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#582CFF] opacity-15 blur-3xl"
      />
    </div>
  )
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const show3D = !prefersReducedMotion && !isMobile

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#09090B] pt-16">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
      />

      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,117,255,0.08),transparent)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
        {/* Left — Text */}
        <div className="flex flex-col gap-8">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : fadeUp}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
              <Sparkles size={12} className="text-[#0075FF]" />
              Freelance premium · Livraison rapide
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : fadeUp}
            className="text-5xl font-bold leading-[1.08] tracking-tight text-white lg:text-6xl xl:text-7xl"
          >
            Votre vision,
            <br />
            <span className="bg-gradient-to-r from-[#0075FF] to-[#582CFF] bg-clip-text text-transparent">
              notre code.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : fadeUp}
            className="max-w-lg text-lg leading-relaxed text-zinc-400"
          >
            Sites web, applications mobiles et logiciels sur mesure. On conçoit des produits
            digitaux performants pour les entreprises qui veulent se démarquer.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : fadeUp}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Configurez votre projet
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/#realisations"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Voir les réalisations
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : fadeUp}
            className="flex items-center gap-4 text-xs text-zinc-500"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-[#09090B] bg-gradient-to-br from-zinc-600 to-zinc-800"
                />
              ))}
            </div>
            <span>+40 projets livrés · Délai moyen 3 semaines</span>
          </motion.div>
        </div>

        {/* Right — 3D canvas or fallback */}
        <div className="relative h-[420px] w-full lg:h-[540px]">
          {show3D ? (
            <Suspense fallback={<HeroFallback />}>
              <HeroCanvas />
            </Suspense>
          ) : (
            <HeroFallback />
          )}

          {/* Floating badge — position absolute, always visible */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={prefersReducedMotion ? {} : fadeUp}
            className="absolute bottom-8 left-4 rounded-xl border border-white/10 bg-[#09090B]/80 p-4 backdrop-blur-md"
          >
            <div className="text-xs font-medium text-zinc-400">Stack moderne</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {['Next.js', 'React', 'TypeScript', 'Tailwind'].map((t) => (
                <span
                  key={t}
                  className="bg-white/8 rounded-full px-2 py-0.5 text-[10px] font-medium text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
