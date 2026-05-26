/**
 * SidebarSection — groups SidebarItems under a labelled section.
 * Renders a small uppercase label above the group of nav items.
 */

interface Props {
  label?: string
  children: React.ReactNode
  collapsed?: boolean
}

export function SidebarSection({ label, children, collapsed = false }: Props) {
  return (
    <div className="space-y-0.5">
      {label && !collapsed && (
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-[#718096]">
          {label}
        </p>
      )}
      {label && collapsed && <div className="mx-auto my-2 h-px w-6 bg-white/10" />}
      {children}
    </div>
  )
}
