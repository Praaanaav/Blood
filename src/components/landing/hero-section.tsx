import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-[60vh] min-h-[400px] md:h-[70vh] flex items-center justify-center text-center text-white bg-cover bg-center bg-no-repeat"
             style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}}
             data-ai-hint="blood donation drive">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl !leading-tight">
            Revolutionize Blood Bank Management
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-lg text-white/80 md:text-xl">
            Ensure timely blood availability with our AI-powered demand forecasting and efficient donor management system.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register/donor">Become a Donor</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
