import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section 
      id="cta" 
      className="py-20 bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('https://placehold.co/1920x480.png')"}}
      data-ai-hint="blood donation"
    >
      <div className="container text-center bg-background/80 backdrop-blur-sm p-8 rounded-xl max-w-3xl mx-auto">
        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Ready to Streamline Your Blood Bank Operations?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/80">
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
