
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getBloodDemandForecast, type BloodDemandForecastOutput } from '@/ai/flows/demand-forecasting';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import ForecastChart from '@/components/dashboard/forecast-chart';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

const formSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  timePeriod: z.string().nonempty({ message: 'Please select a time period.' }),
});

export default function DashboardPage() {
  const [forecast, setForecast] = useState<BloodDemandForecastOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 'New York, NY',
      timePeriod: 'next month',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setForecast(null);
    try {
      const result = await getBloodDemandForecast(values);
      setForecast(result);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get forecast. Please try again.",
      })
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Forecasting Dashboard</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Predict future blood requirements and visualize demand trends.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Get New Forecast</CardTitle>
              <CardDescription>Select a location and time period to generate a new demand forecast.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timePeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Period</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="next week">Next Week</SelectItem>
                            <SelectItem value="next month">Next Month</SelectItem>
                            <SelectItem value="next quarter">Next Quarter</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate Forecast'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {isLoading && (
             <div className="grid gap-8">
                <Skeleton className="h-[400px] w-full" />
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="h-[200px] w-full" />
                    <Skeleton className="h-[200px] w-full" />
                </div>
             </div>
          )}

          {forecast && (
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Demand Forecast Visualization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ForecastChart data={forecast.forecastData} />
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Forecast Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="min-h-[100px]">
                            <p className="whitespace-pre-wrap">{forecast.forecastSummary}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Forecast Details</CardTitle>
                        </CardHeader>
                        <CardContent className="min-h-[100px]">
                            <p className="whitespace-pre-wrap">{forecast.forecastDetails}</p>
                        </CardContent>
                    </Card>
                </div>
                
                {forecast.alerts && forecast.alerts.length > 0 && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Alerts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {forecast.alerts.map((alert, index) => (
                                <Alert key={index} variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Potential Shortage</AlertTitle>
                                    <AlertDescription>
                                        {alert}
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
          )}

           {!isLoading && !forecast && (
              <div className="text-center py-16 text-muted-foreground">
                <p>Generate a forecast to see the dashboard.</p>
              </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
