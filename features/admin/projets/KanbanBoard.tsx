'use client'

import { useState, useTransition } from 'react'
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import { Layers } from 'lucide-react'
import { GlassCard } from '@/components/admin/GlassCard'
import { EmptyState } from '@/components/admin/EmptyState'
import { KanbanColumn, type ColumnDef } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'
import { updateProjectStatusAction } from './actions'
import type { ProjectStatus } from '@prisma/client'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectCard {
  id: string
  name: string
  description: string | null
  status: ProjectStatus
  budget: number | null
  progress: number
  dueDate: Date | null
  clientName: string
}

// ─── Column definitions ───────────────────────────────────────────────────────

const COLUMNS: ColumnDef[] = [
  { id: 'DISCOVERY', label: 'Découverte', accent: 'border-[#2CD9FF]' },
  { id: 'IN_PROGRESS', label: 'En cours', accent: 'border-[#0075FF]' },
  { id: 'REVIEW', label: 'En révision', accent: 'border-[#FF9F0A]' },
  { id: 'DELIVERED', label: 'Livré', accent: 'border-[#01B574]' },
  { id: 'ON_HOLD', label: 'En pause', accent: 'border-[#718096]' },
  { id: 'CANCELLED', label: 'Annulé', accent: 'border-[#FF0080]' },
]

// ─── Board component ──────────────────────────────────────────────────────────

interface Props {
  initialCards: ProjectCard[]
}

export function KanbanBoard({ initialCards }: Props) {
  const [cards, setCards] = useState(initialCards)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [overColumnId, setOverColumnId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const activeCard = activeId ? cards.find((c) => c.id === activeId) : null

  const cardsForColumn = (colId: string) => cards.filter((c) => c.status === colId)

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    setOverColumnId(over ? String(over.id) : null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setOverColumnId(null)

    if (!over) return

    const cardId = String(active.id)
    const newStatus = String(over.id) as ProjectStatus

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.status === newStatus) return

    // Optimistic update
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, status: newStatus } : c)))

    // Persist
    startTransition(async () => {
      const result = await updateProjectStatusAction(cardId, newStatus)
      if (!result.success) {
        // Rollback
        setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, status: card.status } : c)))
      }
    })
  }

  if (cards.length === 0) {
    return (
      <GlassCard>
        <EmptyState
          icon={Layers}
          iconVariant="primary"
          title="Aucun projet en cours"
          description="Les projets créés depuis les devis acceptés apparaîtront ici."
        />
      </GlassCard>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(String(e.active.id))}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveId(null)
        setOverColumnId(null)
      }}
    >
      {/* Scrollable board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              cards={cardsForColumn(col.id)}
              isOver={overColumnId === col.id}
            />
          ))}
        </div>
      </div>

      {/* Drag overlay — floating ghost card */}
      <DragOverlay dropAnimation={null}>
        {activeCard ? (
          <div className="w-[240px] rotate-1 scale-105 shadow-2xl shadow-[#0075FF]/30">
            <KanbanCard card={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
