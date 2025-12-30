import DashboardTopNav from '@/components/dashboard-top-nav'
import HeroSection from '@/components/sections/hero-section'
import LanguageCarousel from '@/components/sections/language-carousel'
import FeaturesAiChat from '@/components/sections/features-ai-chat' // Import new component
import FeaturesEffective from '@/components/sections/features-effective'
import FeaturesScience from '@/components/sections/features-science'
import FeaturesMotivated from '@/components/sections/features-motivated'
import FeaturesPersonalized from '@/components/sections/features-personalized'
import LearningAnywhere from '@/components/sections/learning-anywhere'

import ProductsMath from '@/components/sections/products-math'
import FinalCta from '@/components/sections/final-cta'
import Footer from '@/components/sections/footer'
import { ScrollReveal } from '@/components/ui/scroll-reveal'; // Import ScrollReveal

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-cyan-50 font-nunito">
      <DashboardTopNav />
      <div className="scroll-mt-24">
        {/* We generally let the Hero animate immediately or handle its own animation, 
            but for consistency we can wrap it or let it be. 
            Hero usually has its own entrance. Let's wrap others first. */}
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <LanguageCarousel />
        </ScrollReveal>

        <ScrollReveal>
          <FeaturesAiChat />
        </ScrollReveal>

        <ScrollReveal>
          <FeaturesEffective />
        </ScrollReveal>

        <ScrollReveal>
          <FeaturesScience />
        </ScrollReveal>

        <ScrollReveal>
          <FeaturesMotivated />
        </ScrollReveal>

        <ScrollReveal>
          <FeaturesPersonalized />
        </ScrollReveal>

        <ScrollReveal>
          <LearningAnywhere />
        </ScrollReveal>



        <ScrollReveal>
          <ProductsMath />
        </ScrollReveal>

        <ScrollReveal>
          <FinalCta />
        </ScrollReveal>

        <Footer />
      </div>
    </div>
  )
}
