
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ForecastChartProps {
    data: {
        name: string;
        demand: number;
        seasonalDemand: number;
    }[];
}

export default function ForecastChart({ data }: ForecastChartProps) {
    return (
        <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Bar dataKey="demand" fill="hsl(var(--primary))" name="Forecasted Demand" />
                    <Bar dataKey="seasonalDemand" fill="hsl(var(--secondary))" name="Seasonal Demand" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
