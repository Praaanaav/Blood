'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getBloodDemandForecast, type BloodDemandForecastOutput } from '@/ai/flows/demand-forecasting';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  timePeriod: z.string().nonempty({ message: 'Please select a time period.' }),
});

export default function DemandForecastingSection() {
  const [forecast, setForecast] = useState<BloodDemandForecastOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      timePeriod: '',
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
    <section id="forecasting" className="py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">AI-Powered Demand Forecasting</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Get accurate predictions for blood supply needs in your area.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Get a Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (e.g., City, State)</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA" {...field} />
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
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Forecast'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Forecast Summary</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[100px]">
                {isLoading && <Skeleton className="h-20 w-full" />}
                {forecast && <p className="whitespace-pre-wrap">{forecast.forecastSummary}</p>}
                {!isLoading && !forecast && (
                  <p className="text-muted-foreground">Your forecast summary will appear here.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Forecast Details</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[100px]">
                 {isLoading && <Skeleton className="h-24 w-full" />}
                 {forecast && <p className="whitespace-pre-wrap">{forecast.forecastDetails}</p>}
                 {!isLoading && !forecast && (
                   <p className="text-muted-foreground">Detailed breakdown will appear here.</p>
                 )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
