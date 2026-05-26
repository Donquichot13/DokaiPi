import { HeroSection } from '@/features/landing/HeroSection'
import { ServicesSection } from '@/features/landing/ServicesSection'
import { ProcessSection } from '@/features/landing/ProcessSection'
import { TechSection } from '@/features/landing/TechSection'
import { PortfolioSection } from '@/features/landing/PortfolioSection'
import { TestimonialsSection } from '@/features/landing/TestimonialsSection'
import { PricingTeaserSection } from '@/features/landing/PricingTeaserSection'
import { CtaSection } from '@/features/landing/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechSection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingTeaserSection />
      <CtaSection />
    </>
  )
}
