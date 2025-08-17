import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Revolutionize Blood Bank Management
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Ensure timely blood availability with our AI-powered demand forecasting and efficient donor management system.
          </p>
        </div>
      </div>
    </section>
  );
}