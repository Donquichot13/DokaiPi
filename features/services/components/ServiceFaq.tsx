'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqEntry {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqEntry) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-white/8 border-b last:border-0">
      <button
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <ChevronDown
          size={18}
          className={`mt-0.5 shrink-0 text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-sm leading-relaxed text-zinc-400">{answer}</p>
        </div>
      )}
    </div>
  )
}

// Accepts only serializable data — no LucideIcon functions in props
export function ServiceFaq({ faq }: { faq: FaqEntry[] }) {
  return (
    <section className="bg-[#09090B] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
              Questions fréquentes
            </h2>
            <p className="mt-3 text-zinc-500">Pas trouvé la réponse ? Écrivez-nous directement.</p>
          </div>
          <div className="divide-y divide-transparent">
            {faq.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
