import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import AppSidebar from '@/components/landing/app-sidebar';
import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import DemandForecastingSection from '@/components/landing/demand-forecasting-section';
import PricingSection from '@/components/landing/pricing-section';
import TestimonialsSection from '@/components/landing/testimonials-section';
import CtaSection from '@/components/landing/cta-section';
import Footer from '@/components/landing/footer';
import { HeartPulse } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-grow">
            <HeroSection />
            <FeaturesSection />
            <DemandForecastingSection />
            <PricingSection />
            <TestimonialsSection />
            <CtaSection />
          </main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
