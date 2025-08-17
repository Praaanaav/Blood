import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
  {
    quote: "This system has transformed our blood inventory management. The AI forecasting is a game-changer, reducing waste and ensuring we're always prepared.",
    name: "Dr. Emily Carter",
    title: "Head of Hematology, City General Hospital",
    logoUrl: "https://placehold.co/120x40.png",
    logoHint: "hospital logo",
  },
  {
    quote: "The donor management features are incredibly intuitive. Our donor engagement has increased by 30% since we switched.",
    name: "John Smith",
    title: "Blood Drive Coordinator, Community Health Services",
    logoUrl: "https://placehold.co/120x40.png",
    logoHint: "health logo",
  },
  {
    quote: "Implementation was seamless, and the support team is outstanding. I can't imagine going back to our old manual processes.",
    name: "Maria Garcia",
    title: "Lab Director, Regional Medical Center",
    logoUrl: "https://placehold.co/120x40.png",
    logoHint: "medical center",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Trusted by Leading Healthcare Providers</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            See what our partners have to say about our platform.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic">“{testimonial.quote}”</blockquote>
              </CardContent>
              <div className="p-6 bg-muted/50 mt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                    <Image src={testimonial.logoUrl} alt="Client Logo" width={100} height={30} data-ai-hint={testimonial.logoHint} className="object-contain self-center" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
