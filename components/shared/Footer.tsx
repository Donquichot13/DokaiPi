import Link from 'next/link'

const footerLinks = {
  Services: [
    { label: 'Site vitrine', href: '/services/site-vitrine' },
    { label: 'Application web', href: '/services/application-web' },
    { label: 'Application mobile', href: '/services/application-mobile' },
    { label: 'Logiciel sur mesure', href: '/services/logiciel-sur-mesure' },
  ],
  Entreprise: [
    { label: 'À propos', href: '/#processus' },
    { label: 'Réalisations', href: '/#realisations' },
    { label: 'Obtenir un devis', href: '/devis' },
  ],
  Légal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'CGV', href: '/cgv' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-white">
              Dokai
              <span className="bg-gradient-to-r from-[#0075FF] to-[#582CFF] bg-clip-text text-transparent">
                Pi
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Agence web & solutions digitales sur mesure pour les entreprises ambitieuses.
            </p>
            <p className="mt-4 text-xs text-zinc-600">contact@dokaipi.fr</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} DokaiPi — Tous droits réservés
          </p>
          <p className="text-xs text-zinc-700">Conçu et développé avec ❤️ en France</p>
        </div>
      </div>
    </footer>
  )
}
