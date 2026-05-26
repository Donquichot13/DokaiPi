'use client'

import { useActionState } from 'react'
import { Lock } from 'lucide-react'
import { AuroraBackground } from '@/components/admin/AuroraBackground'
import { GlassCard } from '@/components/admin/GlassCard'
import { GradientButton } from '@/components/admin/GradientButton'
import { loginAction } from './actions'

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-[#718096] outline-none transition-all focus:border-[#0075FF]/50 focus:bg-white/[0.08] focus:ring-0 autofill:bg-[#0F1535]'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, {})

  return (
    <AuroraBackground className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="text-3xl font-extrabold tracking-tight text-white">DokaiPi</div>
          <p className="mt-1 text-sm text-[#718096]">Espace administration</p>
        </div>

        {/* Card */}
        <GlassCard className="p-8">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0075FF] to-[#582CFF]">
              <Lock className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">Connexion</h1>
              <p className="text-xs text-[#718096]">Administrateurs uniquement</p>
            </div>
          </div>

          {/* Error banner */}
          {state.error && (
            <div className="mb-5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-[#A0AEC0]">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@dokaipi.com"
                className={inputClass}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-medium text-[#A0AEC0]">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            <div className="pt-2">
              <GradientButton
                type="submit"
                loading={isPending}
                disabled={isPending}
                className="w-full justify-center"
                size="lg"
              >
                {isPending ? 'Connexion…' : 'Se connecter'}
              </GradientButton>
            </div>
          </form>
        </GlassCard>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-[#718096]">Accès restreint — DokaiPi CRM v1</p>
      </div>
    </AuroraBackground>
  )
}
