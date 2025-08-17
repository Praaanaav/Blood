'use client';

import { Button } from "@/components/ui/button";
import { HeartPulse, LogIn, LogOut, User, Shield, Stethoscope, HandHeart, UserPlus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react";
import React, { useState } from "react";


export default function Header() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setLoggedInUser(role);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const UserAvatar = () => {
    if (!loggedInUser) return <User />;
    if (loggedInUser === 'admin') return <Shield />;
    if (loggedInUser === 'patient') return <Stethoscope />;
    if (loggedInUser === 'donor') return <HandHeart />;
    return <User/>
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-2 mr-6">
          <Link href="/" className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">BloodBank Landing</span>
          </Link>
        </div>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
            <Link href="#forecasting" className="transition-colors hover:text-foreground/80 text-foreground/60">Forecasting</Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
            <Link href="#testimonials" className="transition-colors hover:text-foreground/80 text-foreground/60">Testimonials</Link>
            <Link href="#cta" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserAvatar />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {loggedInUser ? (
                <>
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
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => handleLogin('admin')}>
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Login</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLogin('patient')}>
                          <Stethoscope className="mr-2 h-4 w-4" />
                          <span>Patient Login</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLogin('donor')}>
                          <HandHeart className="mr-2 h-4 w-4" />
                          <span>Donor Login</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Register</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <HandHeart className="mr-2 h-4 w-4" />
                          <span>Register as Donor</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Stethoscope className="mr-2 h-4 w-4" />
                          <span>Register as Patient</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
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
                <DropdownMenuItem asChild><Link href="#features">Features</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="#forecasting">Forecasting</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="#pricing">Pricing</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="#testimonials">Testimonials</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="#cta">Contact</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
