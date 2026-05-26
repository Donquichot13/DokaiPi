'use client'

/**
 * AuroraBackground — animated deep blue-violet aurora for auth / hero sections.
 * Vision UI rule: background must be #070C2B (admin-bg-deep), never grey / black.
 * Usage: wrap <AuroraBackground> around the full page, render children on top.
 */

import { useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
}

export function AuroraBackground({ children, className = '' }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`relative min-h-screen overflow-hidden bg-[#070C2B] ${className}`}>
      {/* Aurora orbs — skip animation if user prefers reduced motion */}
      {!prefersReducedMotion && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Primary violet orb — top-left */}
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-aurora rounded-full bg-[#582CFF] opacity-[0.12] blur-[120px]" />

          {/* Blue orb — top-right */}
          <div
            className="absolute -right-32 top-[-80px] h-[500px] w-[500px] animate-aurora rounded-full bg-[#0075FF] opacity-[0.10] blur-[100px]"
            style={{ animationDelay: '-3s', animationDuration: '10s' }}
          />

          {/* Cyan accent — center-bottom */}
          <div
            className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 animate-aurora rounded-full bg-[#2CD9FF] opacity-[0.06] blur-[90px]"
            style={{ animationDelay: '-6s', animationDuration: '12s' }}
          />
        </div>
      )}

      {/* Static subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
