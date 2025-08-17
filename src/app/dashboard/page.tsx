
'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto">
          <div className="text-center py-16 text-muted-foreground">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Dashboard</h1>
            <p className="mt-4">This page is currently empty.</p>
            <Button variant="outline" className="mt-8" asChild>
                <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
