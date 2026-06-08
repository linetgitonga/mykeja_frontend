import { FeaturedRail } from '@/components/landing/featured-rail'
import { HeroSection } from '@/components/landing/hero-section'
import { NeighbourhoodsAndProof } from '@/components/landing/neighbourhoods-proof'
import { TrustAndSteps } from '@/components/landing/trust-steps'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturedRail />
        <TrustAndSteps />
        <NeighbourhoodsAndProof />
      </main>
      <SiteFooter />
    </div>
  )
}
