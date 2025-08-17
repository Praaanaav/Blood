import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section id="cta" className="py-20 bg-muted/50">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Ready to Streamline Your Blood Bank Operations?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Our team is here to help you get started. Request a personalized consultation to see how our platform can fit your needs.
        </p>
        <div className="mt-8">
          <Button size="lg">
            Request a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
