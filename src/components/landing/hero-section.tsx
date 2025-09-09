
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function HeroSection() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="hero" className="py-20 md:py-32 bg-background">
      <div className="container text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Donate Blood, Save Lives
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl">
            Your simple act of kindness can be a lifeline for someone in need. Join our community of heroes today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {!loading && !user && (
              <Button asChild size="lg">
                <Link href="/login">Become a Donor</Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
