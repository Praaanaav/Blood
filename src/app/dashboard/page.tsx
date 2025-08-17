'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Droplets } from "lucide-react";

const bloodGroups = [
  { group: "A+", units: 45 },
  { group: "A-", units: 23 },
  { group: "B+", units: 31 },
  { group: "B-", units: 12 },
  { group: "AB+", units: 8 },
  { group: "AB-", units: 4 },
  { group: "O+", units: 52 },
  { group: "O-", units: 18 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-grow bg-background">
      <div className="flex-grow p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="grid gap-8">
              <section>
                  <Card>
                      <CardHeader>
                          <CardTitle>Blood Inventory</CardTitle>
                          <CardDescription>Real-time availability of blood units.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {bloodGroups.map((blood) => (
                                  <Card key={blood.group} className="text-center flex flex-col justify-between">
                                      <CardHeader className="p-4">
                                          <CardTitle className="text-2xl font-bold text-primary">{blood.group}</CardTitle>
                                      </CardHeader>
                                      <CardContent className="p-4">
                                          <div className="flex items-center justify-center">
                                              <Droplets className="h-6 w-6 mr-2 text-red-500" />
                                              <p className="text-3xl font-semibold">{blood.units}</p>
                                          </div>
                                          <p className="text-sm text-muted-foreground mt-1">Units</p>
                                      </CardContent>
                                  </Card>
                              ))}
                          </div>
                      </CardContent>
                  </Card>
              </section>
          </div>
        </div>
      </div>
    </div>
  );
}
