/**
 * NextAuth v5 route handler.
 * Handles GET /api/auth/* and POST /api/auth/* (sign in, sign out, CSRF, etc.)
 *
 * Static export mode (EXPORT_MODE=true): force-static is required by Next.js.
 * Auth routes return 503 in the pre-rendered static files — auth requires a server.
 */

import type { NextRequest } from 'next/server'

// Required for output: 'export' — all route handlers must declare force-static.
export const dynamic = 'force-static'

// Required for output: 'export' with catch-all dynamic segments.
// Enumerates the NextAuth paths that will be pre-rendered as static stubs.
export function generateStaticParams() {
  return [
    { nextauth: ['session'] },
    { nextauth: ['csrf'] },
    { nextauth: ['signin'] },
    { nextauth: ['signout'] },
    { nextauth: ['providers'] },
    { nextauth: ['callback', 'credentials'] },
  ]
}

export async function GET(req: NextRequest) {
  if (process.env.EXPORT_MODE === 'true') {
    return new Response(JSON.stringify({ error: 'Auth requires a server runtime' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const { handlers } = await import('@/lib/auth')
  return handlers.GET(req)
}

export async function POST(req: NextRequest) {
  if (process.env.EXPORT_MODE === 'true') {
    return new Response(JSON.stringify({ error: 'Auth requires a server runtime' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const { handlers } = await import('@/lib/auth')
  return handlers.POST(req)
}
