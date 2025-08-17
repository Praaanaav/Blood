
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function PatientRegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Patient Registration</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" placeholder="Jane Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login/patient" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
