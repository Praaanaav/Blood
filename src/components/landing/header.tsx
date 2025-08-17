import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">BloodBank Landing</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button>Request a Demo</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
