import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import Link from "next/link";

export default function DonorRegisterPage() {
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
              <CardTitle className="text-2xl">Create a Donor Account</CardTitle>
              <CardDescription>Join our community of lifesavers. It only takes a minute.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="donor@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full">Create Account</Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login/donor" className="font-semibold text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}