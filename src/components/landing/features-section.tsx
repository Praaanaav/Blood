import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BrainCircuit, Database, Users } from "lucide-react";

const features = [
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "Real-time Inventory",
    description: "Track blood units in real-time across all locations, ensuring you always have up-to-date information.",
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "AI Demand Forecasting",
    description: "Our predictive analytics help you anticipate demand, reduce waste, and save lives.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Donor Management",
    description: "A complete CRM for donors, from registration and communication to donation history.",
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: "Alerts & Notifications",
    description: "Automated alerts for low stock, expiring units, and urgent needs to keep you informed.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Key Features</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Everything you need for efficient and intelligent blood bank operations.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
