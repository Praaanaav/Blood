import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    description: "For small clinics and individual blood banks.",
    features: [
      "Real-time Inventory",
      "Donor Management",
      "Basic Reporting",
      "Email Support",
    ],
    isPopular: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "For medium-sized hospitals and networks.",
    features: [
      "All Basic features",
      "AI Demand Forecasting",
      "Advanced Reporting",
      "Alerts & Notifications",
      "Priority Support",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large hospital chains and regional systems.",
    features: [
      "All Professional features",
      "Multi-site Management",
      "API Access & Integrations",
      "Dedicated Account Manager",
      "24/7/365 Support",
    ],
    isPopular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-12 md:py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Flexible Pricing for Every Need</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Choose a plan that scales with your organization.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("flex flex-col", plan.isPopular && "border-primary ring-2 ring-primary shadow-lg")}>
              <CardHeader>
                {plan.isPopular && <div className="text-sm font-bold text-primary text-center -mt-2 mb-2">MOST POPULAR</div>}
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
