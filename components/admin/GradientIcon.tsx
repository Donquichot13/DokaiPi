/**
 * GradientIcon — icon wrapped in a gradient-filled rounded container.
 * Used for KPI cards, feature highlights, and section identifiers in admin pages.
 *
 * Vision UI rule: never use flat colour for accent icons — always use a gradient.
 */

import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type GradientVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'

const GRADIENT_CLASSES: Record<GradientVariant, string> = {
  primary: 'bg-gradient-to-br from-[#0075FF] to-[#582CFF]',
  success: 'bg-gradient-to-br from-[#01B574] to-[#2CD9FF]',
  warning: 'bg-gradient-to-br from-[#FF9F0A] to-[#FF5E62]',
  danger: 'bg-gradient-to-br from-[#FF0080] to-[#7928CA]',
  info: 'bg-gradient-to-br from-[#2CD9FF] to-[#582CFF]',
}

type IconSize = 'sm' | 'md' | 'lg'

const SIZE_CLASSES: Record<IconSize, { container: string; icon: string }> = {
  sm: { container: 'h-9 w-9 rounded-xl', icon: 'h-4 w-4' },
  md: { container: 'h-11 w-11 rounded-xl', icon: 'h-5 w-5' },
  lg: { container: 'h-14 w-14 rounded-2xl', icon: 'h-6 w-6' },
}

interface Props {
  icon: LucideIcon
  variant?: GradientVariant
  size?: IconSize
  className?: string
}

export function GradientIcon({ icon: Icon, variant = 'primary', size = 'md', className }: Props) {
  const { container, icon } = SIZE_CLASSES[size]

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center shadow-lg',
        GRADIENT_CLASSES[variant],
        container,
        className
      )}
    >
      <Icon className={cn('text-white', icon)} />
    </div>
  )
}
