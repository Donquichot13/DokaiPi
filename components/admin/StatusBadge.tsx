/**
 * StatusBadge — coloured pill for workflow states.
 * Covers both quote statuses (QuoteStatus) and custom labels.
 *
 * Vision UI rule: status colours must use the defined accent palette,
 * never arbitrary Tailwind colours. No more than 3-4 distinct accents per page.
 */

import { cn } from '@/lib/utils'

export type BadgeVariant =
  | 'default'
  | 'pending'
  | 'active'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'muted'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white border-white/15',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  active: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  warning: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  danger: 'bg-red-500/15 text-red-400 border-red-500/25',
  info: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  muted: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25',
}

/** Map Prisma QuoteStatus values to badge variants */
export const QUOTE_STATUS_VARIANT: Record<string, BadgeVariant> = {
  PENDING: 'pending',
  REVIEWED: 'info',
  SENT: 'active',
  ACCEPTED: 'success',
  REJECTED: 'danger',
  ARCHIVED: 'muted',
}

/** Human-readable labels for QuoteStatus */
export const QUOTE_STATUS_LABEL: Record<string, string> = {
  PENDING: 'En attente',
  REVIEWED: 'Analysé',
  SENT: 'Envoyé',
  ACCEPTED: 'Accepté',
  REJECTED: 'Refusé',
  ARCHIVED: 'Archivé',
}

interface Props {
  label: string
  variant?: BadgeVariant
  dot?: boolean
  className?: string
}

export function StatusBadge({ label, variant = 'default', dot = false, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold leading-4',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'pending' && 'bg-amber-400',
            variant === 'active' && 'bg-blue-400',
            variant === 'success' && 'bg-emerald-400',
            variant === 'warning' && 'bg-orange-400',
            variant === 'danger' && 'bg-red-400',
            variant === 'info' && 'bg-cyan-400',
            variant === 'muted' && 'bg-zinc-400',
            variant === 'default' && 'bg-white'
          )}
        />
      )}
      {label}
    </span>
  )
}
