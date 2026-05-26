/**
 * Admin layout — server component.
 * Reads the session and redirects unauthenticated users (belt-and-suspenders,
 * middleware already blocks non-admins).
 * Passes user data to AdminLayoutShell as plain props (serialisable).
 */

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  // Middleware handles /admin protection, but guard here too for defence-in-depth
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <AdminLayoutShell
      userName={session.user.name ?? session.user.email}
      userEmail={session.user.email}
    >
      {children}
    </AdminLayoutShell>
  )
}
