'use client'

/**
 * AdminSidebar — collapsible admin navigation.
 *
 * Expanded: 264px  |  Collapsed: 80px
 * Toggle state persisted in localStorage (no hydration flash via useEffect).
 *
 * Vision UI rules:
 * - bg-[#0F1535] (admin-bg-base)
 * - Border right: white/[0.08]
 * - Logo and bottom user block always visible
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { SidebarItem } from './SidebarItem'
import { SidebarSection } from './SidebarSection'

const STORAGE_KEY = 'dokaipi_sidebar_collapsed'

interface Props {
  userName: string
  userEmail: string
}

export function AdminSidebar({ userName, userEmail }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Read persisted state after hydration to avoid SSR mismatch
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) setCollapsed(saved === 'true')
    setMounted(true)
  }, [])

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  // Render nothing until mounted to prevent hydration mismatch on collapse state
  const effectiveCollapsed = mounted ? collapsed : false

  return (
    <aside
      className="relative flex flex-col border-r border-white/[0.08] bg-[#0F1535] transition-all duration-300"
      style={{ width: effectiveCollapsed ? 80 : 264 }}
    >
      {/* Logo area */}
      <div className="flex h-16 shrink-0 items-center px-4">
        {!effectiveCollapsed ? (
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0075FF] to-[#582CFF] shadow-lg shadow-[#0075FF]/25">
              <span className="text-xs font-extrabold text-white">D</span>
            </div>
            <span className="font-bold tracking-tight text-white">DokaiPi</span>
          </Link>
        ) : (
          <Link
            href="/admin"
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0075FF] to-[#582CFF] shadow-lg shadow-[#0075FF]/25"
          >
            <span className="text-xs font-extrabold text-white">D</span>
          </Link>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-white/[0.08]" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        <div className="space-y-6">
          <SidebarSection label="Navigation" collapsed={effectiveCollapsed}>
            <SidebarItem
              href="/admin"
              label="Dashboard"
              icon={LayoutDashboard}
              exact
              collapsed={effectiveCollapsed}
            />
            <SidebarItem
              href="/admin/devis"
              label="Devis"
              icon={FileText}
              collapsed={effectiveCollapsed}
            />
            <SidebarItem
              href="/admin/clients"
              label="Clients"
              icon={Users}
              collapsed={effectiveCollapsed}
            />
            <SidebarItem
              href="/admin/projets"
              label="Projets"
              icon={FolderKanban}
              collapsed={effectiveCollapsed}
            />
          </SidebarSection>

          <SidebarSection label="Système" collapsed={effectiveCollapsed}>
            <SidebarItem
              href="/admin/settings"
              label="Paramètres"
              icon={Settings}
              collapsed={effectiveCollapsed}
            />
          </SidebarSection>
        </div>
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-white/[0.08]" />

      {/* User block */}
      <div
        className={`flex items-center gap-3 px-4 py-4 ${effectiveCollapsed ? 'justify-center' : ''}`}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0075FF]/40 to-[#582CFF]/40 text-xs font-bold text-white">
          {(userName[0] ?? 'A').toUpperCase()}
        </div>
        {!effectiveCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{userName}</p>
            <p className="truncate text-[10px] text-[#718096]">{userEmail}</p>
          </div>
        )}
      </div>

      {/* Collapse toggle button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={effectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-[72px] flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.12] bg-[#0F1535] text-[#718096] shadow-sm transition-colors hover:text-white"
      >
        {effectiveCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  )
}
