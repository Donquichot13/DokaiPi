import type { NextConfig } from 'next'

// Static export mode — activated by EXPORT_MODE=true in GitHub Actions
// Generates a fully static site for GitHub Pages (public pages only).
const isStaticExport = process.env.EXPORT_MODE === 'true'

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: 'export',
    // GitHub Pages serves from /<repo-name>/ — set via env in CI
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    images: { unoptimized: true },
  }),
}

export default nextConfig
