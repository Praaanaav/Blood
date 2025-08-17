
'use client';

import { Button } from "@/components/ui/button";
import { HeartPulse, LogOut, Shield, Stethoscope, HandHeart, Menu, User, UserPlus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react";


export default function Header() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const UserAvatar = () => {
    if (!loggedInUser) return <User className="h-5 w-5" />;
    if (loggedInUser === 'admin') return <Shield className="h-5 w-5" />;
    if (loggedInUser === 'patient') return <Stethoscope className="h-5 w-5"/>;
    if (loggedInUser === 'donor') return <HandHeart className="h-5 w-5"/>;
    return <User className="h-5 w-5"/>
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-2 mr-6">
          <Link href="/" className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">BloodBank</span>
          </Link>
        </div>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="/#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
            <Link href="/#forecasting" className="transition-colors hover:text-foreground/80 text-foreground/60">Forecasting</Link>
            <Link href="/#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
            <Link href="/#testimonials" className="transition-colors hover:text-foreground/80 text-foreground/60">Testimonials</Link>
            <Link href="/#cta" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserAvatar />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {loggedInUser ? (
                <>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem disabled>
                    Logged in as {loggedInUser}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Login</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href="/login/admin">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Administrator</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login/patient">
                      <Stethoscope className="mr-2 h-4 w-4" />
                      <span>Patient</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login/donor">
                      <HandHeart className="mr-2 h-4 w-4" />
                      <span>Donor</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Register</DropdownMenuLabel>
                   <DropdownMenuItem asChild>
                      <Link href="/register/donor">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Register as Donor</span>
                      </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                      <Link href="/register/patient">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Register as Patient</span>
                      </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link href="/#features">Features</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/#forecasting">Forecasting</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/#pricing">Pricing</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/#testimonials">Testimonials</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/#cta">Contact</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
