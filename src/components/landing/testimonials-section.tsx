import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Recipient",
    testimonial: "I am alive today because of selfless donors. The blood I received gave me a second chance at life. I can't thank you enough.",
    avatar: "SL",
    image: "https://placehold.co/100x100.png",
    aiHint: "woman portrait"
  },
  {
    name: "John D.",
    role: "Donor",
    testimonial: "Donating blood is a simple way to make a huge impact. The process was easy, and the staff were incredibly supportive.",
    avatar: "JD",
    image: "https://placehold.co/100x100.png",
    aiHint: "man portrait"
  },
  {
    name: "Maria G.",
    role: "Recipient's Mother",
    testimonial: "When my son needed an urgent transfusion, your blood bank was there for us. Your work is a true blessing to our community.",
    avatar: "MG",
    image: "https://placehold.co/100x100.png",
    aiHint: "woman portrait"
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 md:py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Voices of Our Community</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Hear from donors and recipients who have been touched by the gift of life.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between">
              <CardContent className="p-6">
                <blockquote className="text-lg text-foreground mb-4">
                  "{testimonial.testimonial}"
                </blockquote>
              </CardContent>
              <div className="bg-muted/50 p-6 pt-4 flex items-center">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
