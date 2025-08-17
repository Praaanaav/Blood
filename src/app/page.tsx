import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import Footer from '@/components/landing/footer';
import WhyChooseUsSection from '@/components/landing/why-choose-us-section';
import TestimonialsSection from '@/components/landing/testimonials-section';
import CallToActionSection from '@/components/landing/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
