'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loginAdmin = async () => {
      try {
        // NOTE: This is insecure for a production environment.
        // The admin user should be created in the Firebase console first.
        await signInWithEmailAndPassword(auth, "admin@example.com", "password");
        toast.success("Logged in successfully as admin!");
        router.push("/dashboard");
      } catch (error: any) {
        // If the admin user doesn't exist, we can't log in.
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            toast.error("Admin account not found or password incorrect. Please create 'admin@example.com' in your Firebase console.");
        } else {
            toast.error(error.message);
        }
        console.error("Admin Login Error:", error);
        setIsLoading(false);
      }
    };

    loginAdmin();
  }, [router]);

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
              <CardDescription>
                {isLoading ? "Attempting to log in automatically..." : "Automatic login failed."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center p-6">
              {isLoading ? (
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Signing in...</span>
                </div>
              ) : (
                <p className="text-destructive text-center">
                  Please ensure an admin account with the email 'admin@example.com' exists in your Firebase project.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
