import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-end mb-4">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
            <CardDescription>Welcome to the BloodBank Management System.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the central hub for managing donors, patients, and inventory. Use the navigation to access different sections of the application.</p>
            {/* Future dashboard widgets will go here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
