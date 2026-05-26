/**
 * Auth layout — no Navbar/Footer.
 * AuroraBackground is applied per-page (login, forgot-password, etc.)
 * so this layout is intentionally bare.
 */

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
