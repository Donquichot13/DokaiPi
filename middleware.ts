/**
 * Next.js middleware — delegates route protection to NextAuth v5.
 *
 * The `authorized` callback in lib/auth.ts handles the actual check:
 * - /admin/* paths: require authenticated session → redirect to /login
 * - all other paths: always allowed
 *
 * Static assets (_next, images, public files) are excluded via matcher.
 */

export { auth as middleware } from '@/lib/auth'

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico
     * - public assets (files with an extension)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
