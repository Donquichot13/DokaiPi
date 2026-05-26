'use client'

/**
 * GradientButton — primary CTA button for admin interfaces.
 * Vision UI rule: primary buttons ALWAYS use the gradient (#0075FF → #582CFF).
 * For secondary/ghost buttons use variant="ghost" or variant="outline".
 */

import { type LucideIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'success' | 'danger' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#0075FF] to-[#582CFF] text-white shadow-lg shadow-[#0075FF]/20 hover:opacity-90',
  success:
    'bg-gradient-to-r from-[#01B574] to-[#2CD9FF] text-white shadow-lg shadow-[#01B574]/20 hover:opacity-90',
  danger:
    'bg-gradient-to-r from-[#FF0080] to-[#7928CA] text-white shadow-lg shadow-[#FF0080]/20 hover:opacity-90',
  ghost: 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white',
  outline: 'border border-white/15 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 rounded-lg px-3 text-xs',
  md: 'h-10 rounded-xl px-4 text-sm',
  lg: 'h-12 rounded-xl px-6 text-sm',
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
}

export function GradientButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: Props) {
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="h-4 w-4 shrink-0" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4 shrink-0" />}
    </button>
  )
}
