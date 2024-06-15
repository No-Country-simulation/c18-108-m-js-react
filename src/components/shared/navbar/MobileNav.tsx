"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import PathsLinks from "./PathsLinks";

const MobileNav = () => {
  return (
    <header className='fixed flex  w-full items-center justify-between px-4 py-3 md:hidden'>
      <Sheet>
        <SheetTrigger>
          <Menu className='size-8' />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <nav className='mt-10 grid gap-3'>
            <PathsLinks />
          </nav>
        </SheetContent>
      </Sheet>

      <UserButton />
    </header>
  );
};

export default MobileNav;
