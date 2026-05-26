'use client'

import { useState, useTransition, useMemo } from 'react'
import { Search, Plus, Mail, Phone, Globe, Trash2, Users } from 'lucide-react'
import { GlassCard } from '@/components/admin/GlassCard'
import { GradientButton } from '@/components/admin/GradientButton'
import { EmptyState } from '@/components/admin/EmptyState'
import { createClientAction, softDeleteClientAction } from './actions'
import { formatDate } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ClientRow {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  website: string | null
  source: string | null
  createdAt: Date
  _count: { quotes: number; projects: number }
}

// ─── Create client modal ──────────────────────────────────────────────────────

function CreateClientModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: (fd.get('phone') as string) || undefined,
      company: (fd.get('company') as string) || undefined,
      website: (fd.get('website') as string) || undefined,
      source: (fd.get('source') as string) || undefined,
    }

    setError(null)
    startTransition(async () => {
      const result = await createClientAction(data)
      if (result.success) {
        onCreated()
        onClose()
      } else {
        setError(result.error ?? 'Erreur inconnue.')
      }
    })
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="card-glass w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Nouveau client</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#718096] transition-colors hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row: name + company */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#A0AEC0]">
                Nom complet <span className="text-[#FF0080]">*</span>
              </label>
              <input
                name="name"
                required
                minLength={2}
                placeholder="Jean Dupont"
                className="input-admin w-full"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#A0AEC0]">Entreprise</label>
              <input name="company" placeholder="Acme Inc." className="input-admin w-full" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#A0AEC0]">
              Email <span className="text-[#FF0080]">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="jean@exemple.fr"
              className="input-admin w-full"
            />
          </div>

          {/* Row: phone + website */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#A0AEC0]">Téléphone</label>
              <input
                name="phone"
                type="tel"
                placeholder="+33 6 00 00 00 00"
                className="input-admin w-full"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#A0AEC0]">Site web</label>
              <input
                name="website"
                type="url"
                placeholder="https://..."
                className="input-admin w-full"
              />
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#A0AEC0]">Source</label>
            <select name="source" className="input-admin w-full">
              <option value="">— Sélectionner —</option>
              <option value="referral">Référence</option>
              <option value="linkedin">LinkedIn</option>
              <option value="search">Recherche Google</option>
              <option value="devis">Via configurateur devis</option>
              <option value="other">Autre</option>
            </select>
          </div>

          {error && (
            <p className="rounded-lg border border-[#FF0080]/30 bg-[#FF0080]/10 px-3 py-2 text-sm text-[#FF6B9D]">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <GradientButton type="button" variant="ghost" size="sm" onClick={onClose}>
              Annuler
            </GradientButton>
            <GradientButton type="submit" size="sm" loading={isPending}>
              Créer le client
            </GradientButton>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Client row card ──────────────────────────────────────────────────────────

function ClientCard({ client, onDeleted }: { client: ClientRow; onDeleted: () => void }) {
  const [isPending, startTransition] = useTransition()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = () => {
    startTransition(async () => {
      await softDeleteClientAction(client.id)
      onDeleted()
    })
  }

  return (
    <GlassCard>
      <div className="flex items-start justify-between gap-4">
        {/* Left: identity */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="font-semibold text-white">{client.name}</p>
            {client.company && <span className="text-xs text-[#718096]">{client.company}</span>}
          </div>

          <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#A0AEC0]">
            <a
              href={`mailto:${client.email}`}
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              <Mail className="h-3 w-3" />
              {client.email}
            </a>
            {client.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {client.phone}
              </span>
            )}
            {client.website && (
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                <Globe className="h-3 w-3" />
                {new URL(client.website).hostname}
              </a>
            )}
          </div>
        </div>

        {/* Right: meta + actions */}
        <div className="flex shrink-0 flex-col items-end gap-3">
          <div className="flex items-center gap-3 text-xs text-[#718096]">
            <span>{client._count.quotes} devis</span>
            <span>{client._count.projects} projets</span>
            <span>{formatDate(client.createdAt)}</span>
          </div>

          {/* Delete */}
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#FF6B9D]">Confirmer ?</span>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-xs text-[#FF0080] transition-colors hover:text-white disabled:opacity-50"
              >
                {isPending ? '…' : 'Oui'}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-[#718096] transition-colors hover:text-white"
              >
                Non
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="rounded-lg p-1.5 text-[#718096] transition-colors hover:bg-[#FF0080]/10 hover:text-[#FF6B9D]"
              title="Supprimer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  initialData: ClientRow[]
}

export function ClientsList({ initialData }: Props) {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.company ?? '').toLowerCase().includes(q)
    )
  }, [data, search])

  const handleCreated = () => {
    // The server action revalidates the path, which triggers a server re-render.
    // For the client list we do a quick reload so the new client appears.
    window.location.reload()
  }

  const handleDeleted = () => {
    // Same approach — revalidatePath in the server action refreshes the RSC cache.
    window.location.reload()
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718096]" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, société…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-4 text-sm text-white placeholder-[#718096] outline-none focus:border-[#0075FF]/50"
          />
        </div>
        <span className="text-xs text-[#718096]">
          {filtered.length} client{filtered.length !== 1 ? 's' : ''}
        </span>
        <GradientButton icon={Plus} size="sm" onClick={() => setShowModal(true)}>
          Nouveau client
        </GradientButton>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <GlassCard>
          <EmptyState
            icon={Users}
            iconVariant="success"
            title={search ? 'Aucun résultat' : "Aucun client pour l'instant"}
            description={
              search
                ? 'Essayez un autre terme de recherche.'
                : "Créez votre premier client ou attendez qu'un devis accepté soit converti."
            }
            action={
              !search ? (
                <GradientButton icon={Plus} size="sm" onClick={() => setShowModal(true)}>
                  Créer un client
                </GradientButton>
              ) : undefined
            }
          />
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((client) => (
            <ClientCard key={client.id} client={client} onDeleted={handleDeleted} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CreateClientModal onClose={() => setShowModal(false)} onCreated={handleCreated} />
      )}
    </div>
  )
}
