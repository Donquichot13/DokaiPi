'use client'

import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import { KanbanCard } from './KanbanCard'
import type { ProjectCard } from './KanbanBoard'

export interface ColumnDef {
  id: string // matches ProjectStatus value
  label: string
  accent: string // Tailwind colour class for the top border accent
}

interface Props {
  column: ColumnDef
  cards: ProjectCard[]
  isOver: boolean
}

export function KanbanColumn({ column, cards, isOver }: Props) {
  const { setNodeRef } = useDroppable({ id: column.id })

  return (
    <div className="flex min-w-[240px] flex-1 flex-col">
      {/* Column header */}
      <div className={cn('mb-3 border-b-2 pb-2', column.accent)}>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A0AEC0]">
            {column.label}
          </h3>
          <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#718096]">
            {cards.length}
          </span>
        </div>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          'min-h-[120px] flex-1 space-y-2.5 rounded-xl p-2 transition-colors',
          isOver ? 'bg-white/[0.04] ring-1 ring-[#0075FF]/40' : ''
        )}
      >
        {cards.map((card) => (
          <KanbanCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
