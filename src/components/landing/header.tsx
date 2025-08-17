'use client';

import { Button } from "@/components/ui/button";
import { HeartPulse, Menu, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react";


export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-2 mr-6">
          <Link href="/" className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">BloodBank</span>
          </Link>
        </div>
        <nav className="hidden items-center space-x-8 text-sm font-medium md:flex">
            <Link href="/#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
            <Link href="/#testimonials" className="transition-colors hover:text-foreground/80 text-foreground/60">Testimonials</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <User className="mr-2"/>
                  Login / Sign Up
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Login</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem asChild><Link href="/dashboard">Administrator</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/login/donor">Donor</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/login/patient">Patient</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Sign Up</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem asChild><Link href="/register/donor">Donor</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/register/patient">Patient</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><Link href="/#features">Features</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/#testimonials">Testimonials</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard">Admin Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login/donor">Donor Login</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/login/patient">Patient Login</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/register/donor">Donor Sign Up</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/register/patient">Patient Sign Up</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
