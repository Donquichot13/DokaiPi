import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SERVICES } from '@/features/services/data'
import { ServiceHero } from '@/features/services/components/ServiceHero'
import { ServiceFeatures } from '@/features/services/components/ServiceFeatures'
import { ServiceDeliverables } from '@/features/services/components/ServiceDeliverables'
import { ServiceFaq } from '@/features/services/components/ServiceFaq'
import { ServiceCta } from '@/features/services/components/ServiceCta'

// Pre-render all 4 service slugs at build time
export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

// Next.js 15: params is a Promise
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) return {}
  return {
    title: service.label,
    description: service.description.slice(0, 160),
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = SERVICES[slug]
  if (!service) notFound()

  return (
    <>
      <ServiceHero service={service} />
      <ServiceFeatures service={service} />
      <ServiceDeliverables service={service} />
      <ServiceFaq faq={service.faq} />
      <ServiceCta service={service} />
    </>
  )
}
