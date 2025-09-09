'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully as admin!");
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast.error("Invalid credentials. Please check your email and password.");
      } else {
        toast.error(error.message);
      }
      console.error("Admin Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="flex justify-end mb-4">
              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Enter your administrator credentials to continue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
