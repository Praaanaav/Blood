
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 for form, 2 for pending verification
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const actionCodeSettings = {
    url: typeof window !== 'undefined' ? `${window.location.origin}/register` : 'http://localhost:9002/register',
    handleCodeInApp: true,
  };
  
  useEffect(() => {
    // This effect runs only on the client-side
    const currentUrl = window.location.href;
    if (isSignInWithEmailLink(auth, currentUrl)) {
        setIsVerifying(true);
        let savedEmail = window.localStorage.getItem('emailForSignIn');
        if (!savedEmail) {
            toast.error("Could not verify email. Your session may have expired. Please try signing up again.");
            setIsVerifying(false);
            router.push('/register');
            return;
        }

        const savedPassword = window.localStorage.getItem('passwordForSignIn');
        if (!savedPassword) {
            toast.error("Could not retrieve your password. Your session may have expired. Please restart the registration process.");
            window.localStorage.removeItem('emailForSignIn');
            setIsVerifying(false);
            router.push('/register');
            return;
        }

        signInWithEmailLink(auth, savedEmail, currentUrl)
            .then((result) => {
                // The user is temporarily signed in. Now, we delete this temp user.
                return result.user.delete();
            })
            .then(() => {
                // Now, create the permanent user with the verified email and saved password.
                return createUserWithEmailAndPassword(auth, savedEmail, savedPassword);
            })
            .then((finalUserCredential) => {
                toast.success("Account created successfully! You can now log in.");
                window.localStorage.removeItem('emailForSignIn');
                window.localStorage.removeItem('passwordForSignIn');
                router.push("/login");
            })
            .catch((error) => {
                console.error("Verification Error:", error);
                toast.error(error.message || "An error occurred during verification. Please try again.");
                setIsVerifying(false);
                window.localStorage.removeItem('emailForSignIn');
                window.localStorage.removeItem('passwordForSignIn');
                router.push('/register');
            });
    }
  }, [router]);


  const handleSendVerification = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
        // NOTE: Storing sensitive data like a password in localStorage is not recommended for production apps without further security measures.
        window.localStorage.setItem('emailForSignIn', email);
        window.localStorage.setItem('passwordForSignIn', password); 
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        toast.info("Verification link sent! Please check your email to complete registration.");
        setStep(2);
    } catch (error: any) {
        console.error("Registration Error:", error);
        toast.error(error.message);
        window.localStorage.removeItem('emailForSignIn');
        window.localStorage.removeItem('passwordForSignIn');
    }
  };


  if (isVerifying) {
    return (
        <div className="flex flex-col min-h-screen bg-background items-center justify-center">
            <p>Verifying your email and creating your account...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="mx-auto grid w-full max-w-md gap-6">
          <div className="flex justify-end mb-4">
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          <Card>
            {step === 1 && (
                <>
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl">Create an Account</CardTitle>
                    <CardDescription>Enter your details to get a verification link.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="user@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" onClick={handleSendVerification}>Send Verification Link</Button>
                    <p className="text-sm text-center text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                        Login
                        </Link>
                    </p>
                </CardFooter>
                </>
            )}
             {step === 2 && (
              <>
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl">Check Your Email</CardTitle>
                  <CardDescription>
                    A verification link has been sent to <span className="font-bold">{email}</span>. Click the link in the email to complete your registration.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-center text-muted-foreground">
                        You can close this window. After verification, you can log in.
                    </p>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
