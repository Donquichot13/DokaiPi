/**
 * Seed script — creates the initial admin user.
 * Run: pnpm prisma:seed
 *
 * Override credentials via env vars:
 *   SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD=yourpass pnpm prisma:seed
 */

import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@dokaipi.com'
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'admin123'
  const name = process.env.SEED_ADMIN_NAME ?? 'Admin DokaiPi'

  if (password.length < 8) {
    throw new Error('SEED_ADMIN_PASSWORD must be at least 8 characters')
  }

  const passwordHash = await bcryptjs.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, name, passwordHash, role: 'ADMIN' },
  })

  console.log(`✓ Admin user ready: ${user.email} (id: ${user.id})`)
  console.log('  → Change the password after first login!')
}

main()
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
