/**
 * EmptyState — displayed when a list, table, or dashboard section has no data.
 * Accepts an icon, title, description, and optional CTA.
 *
 * Vision UI rule: always render inside a GlassCard or with the glassmorphism surface.
 */

import { type LucideIcon } from 'lucide-react'
import { GradientIcon } from './GradientIcon'

type GradientVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface Props {
  icon?: LucideIcon
  iconVariant?: GradientVariant
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  iconVariant = 'primary',
  title,
  description,
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <GradientIcon icon={Icon} variant={iconVariant} size="lg" className="mb-4 opacity-80" />
      )}
      <h3 className="text-base font-semibold text-white">{title}</h3>
      {description && <p className="mt-1 max-w-xs text-sm text-[#A0AEC0]">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
