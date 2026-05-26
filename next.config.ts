import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'standalone' — activable si hébergement conteneurisé
  // Pour cPanel / o2switch, on utilise le server.js custom ci-dessous

  // Shared hosting (o2switch CloudLinux) : limit worker processes
  // to avoid EAGAIN (RLIMIT_NPROC) during "Collecting page data"
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
}

export default nextConfig
