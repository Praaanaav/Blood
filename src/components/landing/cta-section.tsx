import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section id="cta" className="py-12 md:py-20 bg-primary/5">
      <div className="container text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Make a Difference?</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-lg">
            Join our mission to save lives. Whether by donating blood, volunteering, or spreading the word, your help is crucial.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#">Find a Donation Center</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
