import { HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold">BloodBank</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
            <Link href="/#testimonials" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BloodBank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
