'use client'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { CalendarDays, Banknote, GripVertical } from 'lucide-react'
import { cn, formatDate, formatCurrency } from '@/lib/utils'
import type { ProjectCard } from './KanbanBoard'

interface Props {
  card: ProjectCard
}

export function KanbanCard({ card }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
    data: { status: card.status },
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative rounded-xl border border-white/10 bg-white/[0.04] p-3 transition-shadow',
        isDragging ? 'shadow-xl shadow-[#0075FF]/20' : 'hover:border-white/20 hover:bg-white/[0.07]'
      )}
    >
      {/* Drag handle */}
      <div
        {...listeners}
        {...attributes}
        className="absolute right-2 top-2 cursor-grab rounded p-0.5 text-[#718096] opacity-0 transition-opacity active:cursor-grabbing group-hover:opacity-100"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Project name */}
      <p className="pr-6 text-sm font-medium leading-snug text-white">{card.name}</p>

      {/* Client */}
      <p className="mt-0.5 text-xs text-[#718096]">{card.clientName}</p>

      {/* Progress bar */}
      {card.progress > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-[#718096]">
            <span>Avancement</span>
            <span className="font-mono">{card.progress}%</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0075FF] to-[#582CFF] transition-all"
              style={{ width: `${card.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer meta */}
      {(card.dueDate || card.budget) && (
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-[#718096]">
          {card.dueDate && (
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {formatDate(card.dueDate)}
            </span>
          )}
          {card.budget && (
            <span className="flex items-center gap-1">
              <Banknote className="h-3 w-3" />
              {formatCurrency(card.budget)}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
