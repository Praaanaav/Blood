// src/ai/flows/demand-forecasting.ts
'use server';
/**
 * @fileOverview AI-powered blood demand forecasting flow.
 *
 * - getBloodDemandForecast - A function that retrieves the AI blood demand forecast.
 * - BloodDemandForecastInput - The input type for the getBloodDemandForecast function.
 * - BloodDemandForecastOutput - The return type for the getBloodDemandForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BloodDemandForecastInputSchema = z.object({
  timePeriod: z
    .string()
    .describe("The time period for the demand forecast, e.g., 'next week', 'next month'."),
  location: z.string().describe('The location for the demand forecast.'),
});
export type BloodDemandForecastInput = z.infer<typeof BloodDemandForecastInputSchema>;

const BloodDemandForecastOutputSchema = z.object({
  forecastSummary: z
    .string()
    .describe('A summary of the blood demand forecast for the specified time period and location.'),
  forecastDetails: z
    .string()
    .describe('Detailed information about the blood demand forecast, including specific blood types and quantities needed.'),
});
export type BloodDemandForecastOutput = z.infer<typeof BloodDemandForecastOutputSchema>;

export async function getBloodDemandForecast(input: BloodDemandForecastInput): Promise<BloodDemandForecastOutput> {
  return bloodDemandForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bloodDemandForecastPrompt',
  input: {schema: BloodDemandForecastInputSchema},
  output: {schema: BloodDemandForecastOutputSchema},
  prompt: `You are an AI assistant specializing in blood demand forecasting.

  Based on the provided time period and location, generate a comprehensive blood demand forecast.

  Time Period: {{{timePeriod}}}
  Location: {{{location}}}

  Provide a summary of the forecast and detailed information, including specific blood types and quantities needed.
  Ensure the forecast is accurate and actionable for blood bank management.
  Response should be in simple English.
  `,
});

const bloodDemandForecastFlow = ai.defineFlow(
  {
    name: 'bloodDemandForecastFlow',
    inputSchema: BloodDemandForecastInputSchema,
    outputSchema: BloodDemandForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
