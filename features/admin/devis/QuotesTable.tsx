'use client'

import { useState, useTransition, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table'
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from 'lucide-react'
import { GlassCard } from '@/components/admin/GlassCard'
import {
  StatusBadge,
  QUOTE_STATUS_VARIANT,
  QUOTE_STATUS_LABEL,
} from '@/components/admin/StatusBadge'
import { updateQuoteStatusAction } from './actions'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { QuoteStatus } from '@prisma/client'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuoteRow {
  id: string
  quoteNumber: string
  name: string
  email: string
  company: string | null
  projectType: string
  totalHT: number
  status: QuoteStatus
  createdAt: Date
  adminNote: string | null
}

const PROJECT_LABELS: Record<string, string> = {
  'site-vitrine': 'Site vitrine',
  'site-ecom': 'E-commerce',
  webapp: 'Web / SaaS',
  mobile: 'Mobile',
  logiciel: 'Logiciel',
}

const ALL_STATUSES: QuoteStatus[] = [
  'PENDING',
  'REVIEWED',
  'SENT',
  'ACCEPTED',
  'REJECTED',
  'ARCHIVED',
]

// ─── Status select cell ───────────────────────────────────────────────────────

function QuoteStatusSelect({ id, current }: { id: string; current: QuoteStatus }) {
  const [, startTransition] = useTransition()
  const [value, setValue] = useState<QuoteStatus>(current)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as QuoteStatus
    setValue(next)
    startTransition(async () => {
      await updateQuoteStatusAction(id, next)
    })
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      className="rounded-lg border border-white/10 bg-[#0F1535] px-2 py-1 text-xs text-white outline-none focus:border-[#0075FF]/50"
    >
      {ALL_STATUSES.map((s) => (
        <option key={s} value={s} className="bg-[#0F1535]">
          {QUOTE_STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  )
}

// ─── Column definitions ───────────────────────────────────────────────────────

const col = createColumnHelper<QuoteRow>()

const columns = [
  col.accessor('quoteNumber', {
    header: 'Référence',
    cell: (info) => (
      <span className="font-mono text-xs font-medium text-white">{info.getValue()}</span>
    ),
  }),
  col.accessor('name', {
    header: 'Nom',
    cell: (info) => (
      <div>
        <p className="text-sm font-medium text-white">{info.getValue()}</p>
        {info.row.original.company && (
          <p className="text-xs text-[#718096]">{info.row.original.company}</p>
        )}
      </div>
    ),
  }),
  col.accessor('projectType', {
    header: 'Type',
    cell: (info) => (
      <span className="text-sm text-[#A0AEC0]">
        {PROJECT_LABELS[info.getValue()] ?? info.getValue()}
      </span>
    ),
  }),
  col.accessor('totalHT', {
    header: 'Prix HT',
    cell: (info) => {
      const v = info.getValue()
      return (
        <span className="font-mono text-sm text-white">
          {v > 40000 ? '> 40 000 €' : v < 1200 ? 'Sur demande' : formatCurrency(v)}
        </span>
      )
    },
  }),
  col.accessor('status', {
    header: 'Statut',
    cell: (info) => (
      <StatusBadge
        label={QUOTE_STATUS_LABEL[info.getValue()]}
        variant={QUOTE_STATUS_VARIANT[info.getValue()]}
        dot
      />
    ),
  }),
  col.accessor('createdAt', {
    header: 'Reçu le',
    cell: (info) => (
      <span className="font-mono text-xs text-[#718096]">{formatDate(info.getValue())}</span>
    ),
  }),
  col.display({
    id: 'actions',
    header: '',
    cell: (info) => (
      <QuoteStatusSelect id={info.row.original.id} current={info.row.original.status} />
    ),
  }),
]

// ─── Table component ──────────────────────────────────────────────────────────

interface Props {
  data: QuoteRow[]
}

export function QuotesTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }])
  const [globalFilter, setGlobalFilter] = useState('')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
  })

  const filteredCount = table.getFilteredRowModel().rows.length

  return (
    <div className="space-y-4">
      {/* Search + filter bar */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718096]" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, ref…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-4 text-sm text-white placeholder-[#718096] outline-none focus:border-[#0075FF]/50"
          />
        </div>
        <span className="text-xs text-[#718096]">{filteredCount} devis</span>
      </div>

      {/* Table */}
      <GlassCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-white/[0.06]">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#718096]"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-1 ${
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none hover:text-white'
                              : ''
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <span className="text-[#718096]">
                              {header.column.getIsSorted() === 'asc' ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : header.column.getIsSorted() === 'desc' ? (
                                <ChevronDown className="h-3 w-3" />
                              ) : (
                                <ChevronsUpDown className="h-3 w-3 opacity-40" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-[#718096]"
                  >
                    Aucun devis trouvé.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <>
                    <tr
                      key={row.id}
                      className="cursor-pointer border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                      onClick={() =>
                        setExpandedRow((prev) =>
                          prev === row.original.id ? null : row.original.id
                        )
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                    {/* Expanded detail row */}
                    {expandedRow === row.original.id && (
                      <tr key={`${row.id}-detail`} className="bg-white/[0.02]">
                        <td colSpan={columns.length} className="px-4 py-4">
                          <div className="grid gap-3 text-sm sm:grid-cols-3">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-[#718096]">
                                Email
                              </p>
                              <p className="mt-0.5 text-white">{row.original.email}</p>
                            </div>
                            {row.original.adminNote && (
                              <div className="sm:col-span-2">
                                <p className="text-[10px] uppercase tracking-wider text-[#718096]">
                                  Note admin
                                </p>
                                <p className="mt-0.5 text-[#A0AEC0]">{row.original.adminNote}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

// Helper: extract totalHT from JSON priceBreakdown
export function extractTotalHT(priceBreakdown: unknown): number {
  if (typeof priceBreakdown === 'object' && priceBreakdown !== null) {
    const pb = priceBreakdown as Record<string, unknown>
    if (typeof pb.totalHT === 'number') return pb.totalHT
  }
  return 0
}
