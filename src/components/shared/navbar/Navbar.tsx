"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Logo() {
  return (
    <>
      <span className='sr-only'>Acme Inc</span>
    </>
  );
}

function Navbar() {
  return (
    <header>
      <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
        <nav className='flex flex-col items-center gap-4 px-2 py-4'>
          <Link
            href='#'
            className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
          >
            <Logo />
          </Link>
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-4'></nav>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              href='#'
              className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
            >
              <Logo />
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Navbar;
