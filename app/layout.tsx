import type { Metadata } from 'next'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/700.css'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'DokaiPi — Agence Web & Solutions Digitales',
    template: '%s | DokaiPi',
  },
  description:
    'DokaiPi conçoit des sites web, applications mobiles et logiciels sur mesure pour les entreprises ambitieuses.',
  keywords: ['agence web', 'développement web', 'application mobile', 'SaaS', 'freelance'],
  authors: [{ name: 'DokaiPi' }],
  creator: 'DokaiPi',
  metadataBase: new URL('https://dokaipi.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://dokaipi.fr',
    siteName: 'DokaiPi',
    title: 'DokaiPi — Agence Web & Solutions Digitales',
    description:
      'DokaiPi conçoit des sites web, applications mobiles et logiciels sur mesure pour les entreprises ambitieuses.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
