/**
 * NextAuth v5 route handler.
 * Handles GET /api/auth/* and POST /api/auth/* (sign in, sign out, CSRF, etc.)
 */

import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
