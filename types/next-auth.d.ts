/**
 * NextAuth v5 type augmentation.
 * Extends Session and JWT with the `id` and `role` fields set in auth.ts callbacks.
 */

import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }

  interface User {
    id?: string
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: string
  }
}
