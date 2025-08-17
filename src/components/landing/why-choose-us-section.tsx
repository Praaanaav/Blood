import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, LifeBuoy } from "lucide-react";
import Image from "next/image";

const whyChooseUsData = [
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Saving Lives",
    description: "Every pint of blood you donate can save up to three lives. Your contribution has a direct and profound impact on patients in need.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Trusted Organization",
    description: "We adhere to the highest standards of safety and care, ensuring a secure and comfortable donation process for all our donors.",
  },
  {
    icon: <LifeBuoy className="h-8 w-8 text-primary" />,
    title: "Community Support",
    description: "Join a compassionate community dedicated to making a difference. We support our donors and recipients every step of the way.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-12 md:py-20 bg-background">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Your Donation Matters</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Discover the impact of your generosity and why our community is the right choice for your contribution.
              </p>
            </div>
            <div className="space-y-6">
              {whyChooseUsData.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Doctor holding a blood bag"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
              data-ai-hint="doctor blood bag"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
