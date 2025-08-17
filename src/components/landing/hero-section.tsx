import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 md:py-32 bg-background">
      <div className="container text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Revolutionize Blood Bank Management
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl">
            Ensure timely blood availability with our AI-powered demand forecasting and efficient donor management system.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register/donor">Become a Donor</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
