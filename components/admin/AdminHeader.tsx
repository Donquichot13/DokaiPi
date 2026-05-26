/**
 * AdminHeader — top bar of the admin layout.
 * Server component: receives user data from layout via props.
 * Contains: page context (rendered via children slot), user action (sign-out).
 */

import { signOut } from '@/lib/auth'
import { LogOut } from 'lucide-react'

interface Props {
  /** Optional slot — pass breadcrumb / page title chips here from each admin page */
  children?: React.ReactNode
}

export function AdminHeader({ children }: Props) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0F1535]/60 px-6 backdrop-blur-sm">
      {/* Left slot */}
      <div className="flex items-center gap-3 text-sm text-[#A0AEC0]">
        {children ?? <span className="text-sm font-medium text-white">Administration</span>}
      </div>

      {/* Right: sign-out */}
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/login' })
        }}
      >
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-[#718096] transition-colors hover:bg-white/[0.05] hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Déconnexion
        </button>
      </form>
    </header>
  )
}
