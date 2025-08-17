
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Droplets, TrendingUp, AlertTriangle, Calendar, BarChart as BarChartIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

const forecastData = [
    { month: "July", demand: 120 },
    { month: "Aug", demand: 150 },
    { month: "Sep", demand: 170 },
    { month: "Oct", demand: 160 },
    { month: "Nov", demand: 190 },
    { month: "Dec", demand: 210 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background p-4 md:p-8">
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

        <div className="grid gap-8 lg:grid-cols-2">
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

             <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Demand & Forecasting</CardTitle>
                        <CardDescription>AI-powered insights to predict future needs.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Demand Forecasts</h3>
                                <p className="text-sm text-muted-foreground">Daily, Weekly, & Monthly projections.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <AlertTriangle className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Predicted Shortages</h3>
                                <p className="text-sm text-muted-foreground">Get alerts with safety buffer suggestions.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <BarChartIcon className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Historical Trends</h3>
                                <p className="text-sm text-muted-foreground">Analyze past demand patterns with charts.</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4">
                            <Calendar className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Seasonal Insights</h3>
                                <p className="text-sm text-muted-foreground">Understand how seasons impact demand.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>


        <section className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>6-Month Demand Forecast</CardTitle>
                    <CardDescription>Projected blood demand for the upcoming months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={forecastData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--accent))' }}
                                    content={<ChartTooltipContent />}
                                />
                                <Legend />
                                <Bar dataKey="demand" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </section>

      </div>
    </div>
  );
}
