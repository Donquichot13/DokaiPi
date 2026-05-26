/**
 * GlassCard — the primary surface for all admin content blocks.
 * Enforces .card-glass (glassmorphism: blur-40, rgba bg, white/12 border, rounded-2xl).
 * Rule: every admin card MUST use this component — no naked divs with manual glass styles.
 */

import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  /** Adds hover:bg-white/[0.05] transition for interactive cards */
  interactive?: boolean
  /** Removes default padding for custom layouts (e.g. tables) */
  noPadding?: boolean
  as?: React.ElementType
}

export function GlassCard({
  children,
  className,
  interactive = false,
  noPadding = false,
  as: Tag = 'div',
}: Props) {
  return (
    <Tag
      className={cn(
        'card-glass', // defined in globals.css: blur, rgba bg, border, rounded-2xl
        !noPadding && 'p-6',
        interactive && 'cursor-pointer transition-colors duration-200 hover:bg-white/[0.05]',
        className
      )}
    >
      {children}
    </Tag>
  )
}
