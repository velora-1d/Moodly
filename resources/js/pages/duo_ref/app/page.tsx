import NavigationHeader from '@/components/sections/navigation-header';
import HeroSection from '@/components/sections/hero-section';
import LanguageCarousel from '@/components/sections/language-carousel';
import FeaturesEffective from '@/components/sections/features-effective';
import FeaturesScience from '@/components/sections/features-science';
import FeaturesMotivated from '@/components/sections/features-motivated';
import FeaturesPersonalized from '@/components/sections/features-personalized';
import LearningAnywhere from '@/components/sections/learning-anywhere';
import ProductsSchools from '@/components/sections/products-schools';
import ProductsAbc from '@/components/sections/products-abc';
import ProductsMath from '@/components/sections/products-math';
import FinalCta from '@/components/sections/final-cta';
import Footer from '@/components/sections/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-nunito">
      <NavigationHeader />
      
      <div className="pt-[64px] md:pt-[80px]">
        <HeroSection />
        <LanguageCarousel />
        <FeaturesEffective />
        <FeaturesScience />
        <FeaturesMotivated />
        <FeaturesPersonalized />
        <LearningAnywhere />
        <ProductsSchools />
        <ProductsAbc />
        <ProductsMath />
        <FinalCta />
        <Footer />
      </div>
    </div>
  );
}