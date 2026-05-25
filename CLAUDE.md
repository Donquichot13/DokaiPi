# DokaiPi — Project Guide

Freelance premium / micro-studio web agency site. Full-stack showcase + CRM.

## Stack

- **Next.js 15** App Router, TypeScript strict
- **Tailwind CSS 3** + custom admin tokens (see § Style admin)
- **shadcn/ui** New York style, dark default
- **Framer Motion** for animations — always `useReducedMotion()`
- **React Three Fiber + Drei** — lazy-loaded, SSR disabled, mobile-guarded
- **Prisma 5 + PostgreSQL** — `db` singleton in `lib/db.ts`
- **NextAuth v5** (beta) — credentials provider, ADMIN role only
- **Resend + React Email** for transactional emails
- **TanStack Table v8** for admin data tables
- **Recharts** for charts
- **dnd-kit** for Kanban drag-and-drop
- **Vitest** for unit tests

## Route structure

```
app/
  (public)/         — public site (Linear/Vercel sober style)
    page.tsx        — /
    services/[slug] — /services/site-vitrine etc.
    devis/          — /devis (quote configurator)
  (auth)/           — /login
  admin/            — /admin/** (Vision UI style, protected)
```

## Key rules

- **Public vs admin styles are STRICTLY separate.** Vision UI ONLY on `/admin/**`. Never use admin tokens on public pages.
- `calculatePrice()` is the single source of truth for pricing — `features/quote-configurator/lib/pricing.ts`.
- Modifiers are applied in **spec TABLE ORDER** (§3 of pricing-spec.md), never in user-selection order.
- Client soft delete: always filter `deletedAt: null` in queries.
- Quote.features, Quote.modifiers, Quote.priceBreakdown stored as **JSON snapshots** — never recalculate from relations.
- Quote number format: `Q-YYYY-NNNN` (4-digit zero-padded).

## Pricing spec

Source of truth: `pricing-spec.md` at repo root.

- 5 project types, 34 features, 8 modifiers
- Price minimum: 1 200€ → show "Sur demande"
- Price maximum display: 40 000€ → show "À partir de 40 000€"
- Rounding: `Math.ceil(rawTotal / 50) * 50`
- All prices HT; TTC = HT × 1.20

## Style admin (Vision UI inspired)

Source of truth: `admin-design-system.md` at repo root.

**Non-negotiable rules for every admin page:**

1. Background deep blue-violet (`#070C2B`) — never neutral grey or pure black
2. Cards use `.card-glass` utility (glassmorphism: blur, rgba bg, white/12 border, rounded-2xl)
3. Primary buttons always gradient (`#0075FF → #582CFF`) — never flat colour
4. Border radius generous: cards 16-20px, buttons 12px, inputs 8px
5. Accents: max 3-4 visible at once; no neon overload
6. Every admin page must pass the visual checklist in `admin-design-system.md`

Admin Tailwind tokens (in `tailwind.config.ts`):

- `admin-bg-base: #0F1535`, `admin-bg-deep: #070C2B`
- `gradient-primary`, `gradient-success`, `gradient-warning`, `gradient-danger`, `gradient-info`
- JetBrains Mono for KPI values and dates

## Folder conventions

```
components/
  shared/    — public site reusable components (Navbar, Footer, etc.)
  admin/     — admin-only components (GlassCard, AuroraBackground, etc.)
features/
  landing/   — landing page sections
  quote-configurator/
    components/  — form steps, summary
    lib/         — pricing.ts (pure function, tested)
  services/
    components/  — shared across service pages
emails/          — React Email templates
lib/
  db.ts          — Prisma singleton
  auth.ts        — NextAuth config
prisma/
  schema.prisma
  seed.ts
```

## Environment variables

See `.env.example`. Required:

- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — NextAuth secret (generate: `openssl rand -base64 32`)
- `RESEND_API_KEY` — for transactional emails
- `ADMIN_EMAIL` — where new quote notifications are sent

## Git conventions

- Branch: feature/phase-N-short-description
- Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`
- One commit per phase minimum; prefer atomic commits
