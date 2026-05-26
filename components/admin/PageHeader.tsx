/**
 * PageHeader — top section for every admin page.
 * Renders title, optional breadcrumb, description, and an actions slot.
 *
 * Usage:
 *   <PageHeader
 *     title="Devis"
 *     description="Gérez les demandes de devis entrantes."
 *     actions={<GradientButton icon={Plus}>Nouveau devis</GradientButton>}
 *   />
 */

interface Props {
  title: string
  description?: string
  breadcrumb?: { label: string; href?: string }[]
  actions?: React.ReactNode
}

export function PageHeader({ title, description, breadcrumb, actions }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="mb-2 flex items-center gap-1.5 text-xs text-[#718096]">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="transition-colors hover:text-[#A0AEC0]">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-[#A0AEC0]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title */}
        <h1 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>

        {/* Description */}
        {description && <p className="mt-1.5 text-sm text-[#A0AEC0]">{description}</p>}
      </div>

      {/* Actions */}
      {actions && <div className="mt-4 flex shrink-0 items-center gap-3 sm:mt-0">{actions}</div>}
    </div>
  )
}
