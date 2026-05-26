'use client'

/**
 * SidebarItem — single navigation link in the admin sidebar.
 * Highlights active route with gradient text + subtle left indicator.
 * Handles both collapsed (icon-only) and expanded (icon + label) states.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  href: string
  label: string
  icon: LucideIcon
  badge?: number | string
  collapsed?: boolean
  /** Exact match vs. starts-with for active detection */
  exact?: boolean
}

export function SidebarItem({
  href,
  label,
  icon: Icon,
  badge,
  collapsed = false,
  exact = false,
}: Props) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25',
        isActive
          ? 'bg-gradient-to-r from-[#0075FF]/20 to-[#582CFF]/10 text-white'
          : 'text-[#A0AEC0] hover:bg-white/[0.04] hover:text-white',
        collapsed && 'justify-center px-2'
      )}
    >
      {/* Active left indicator */}
      {isActive && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#0075FF] to-[#582CFF]" />
      )}

      {/* Icon */}
      <Icon
        className={cn(
          'h-4.5 w-4.5 shrink-0 transition-colors',
          isActive ? 'text-[#0075FF]' : 'text-[#718096] group-hover:text-[#A0AEC0]'
        )}
      />

      {/* Label */}
      {!collapsed && <span className="flex-1 truncate">{label}</span>}

      {/* Badge */}
      {!collapsed && badge !== undefined && (
        <span
          className={cn(
            'ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold',
            isActive ? 'bg-[#0075FF]/30 text-white' : 'bg-white/10 text-[#A0AEC0]'
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  )
}
