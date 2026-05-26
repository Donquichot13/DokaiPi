/**
 * NextAuth v5 (Auth.js) configuration.
 *
 * Strategy: JWT credentials — admin-only, no OAuth in Phase 6.
 * Providers: Credentials (email + bcrypt password).
 * Route protection: handled by middleware.ts via the `authorized` callback.
 */

import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { db } from './db'

const config: NextAuthConfig = {
  // ── Pages ─────────────────────────────────────────────────────────────────
  pages: {
    signIn: '/login',
    error: '/login', // Auth errors redirect to login with ?error=...
  },

  // ── Session strategy ──────────────────────────────────────────────────────
  session: { strategy: 'jwt' },

  // ── Callbacks ─────────────────────────────────────────────────────────────
  callbacks: {
    /**
     * Middleware uses this to decide if a request is authorised.
     * Returns true (allow), false (redirect to signIn), or a Response.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminPath = nextUrl.pathname.startsWith('/admin')
      if (isAdminPath) return isLoggedIn
      return true
    },

    /** Persist custom fields into the JWT token. */
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role as string
      }
      return token
    },

    /** Expose token fields on the session object. */
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  // ── Providers ─────────────────────────────────────────────────────────────
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },

      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) return null

        try {
          const user = await db.user.findUnique({ where: { email } })

          if (!user?.passwordHash) return null
          if (user.role !== 'ADMIN') return null

          const isValid = await bcryptjs.compare(password, user.passwordHash)
          if (!isValid) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? email,
            role: user.role,
          }
        } catch {
          // DB not available in CI/dev without DATABASE_URL — fail gracefully
          return null
        }
      },
    }),
  ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
