/**
 * AdminLayoutShell — the root visual container for all /admin/* pages.
 *
 * Structure:
 *   <bg deep>
 *     <AdminSidebar />         ← collapsible, client
 *     <flex-col main>
 *       <AdminHeader />        ← top bar with sign-out
 *       <main>children</main>  ← page content
 *     </flex-col>
 *   </bg>
 *
 * Server component: auth() is called in app/admin/layout.tsx and user data
 * is passed down as plain serialisable props.
 */

import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

interface Props {
  children: React.ReactNode
  userName: string
  userEmail: string
}

export function AdminLayoutShell({ children, userName, userEmail }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#070C2B]">
      {/* Sidebar */}
      <AdminSidebar userName={userName} userEmail={userEmail} />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
