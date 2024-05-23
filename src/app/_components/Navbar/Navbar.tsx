"use client";

import React from "react";
import Link from "next/link";
import {
  AppleIcon,
  Home,
  LineChart,
  Package,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Menu from "./Menu";
import { paths } from "./paths";

function Logo() {
  return (
    <>
      <AppleIcon className='h-4 w-4 transition-all group-hover:scale-110' />
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
            {/* icon to aplication :  */}
            <Logo />
          </Link>
          {paths.map(({ Icon, path, label }) => (
            <TooltipProvider key={path}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={path}
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  >
                    {<Icon className='h-5 w-5' />}
                    <span className='sr-only'>{label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>{label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        <nav className='mt-auto flex flex-col items-center gap-4 px-2 py-4'>
          <Menu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Settings />
                </TooltipTrigger>
                <TooltipContent side='right'>Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Menu>
        </nav>
      </aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeft className='h-5 w-5' />
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
            {paths.map(({ Icon, path, label }) => (
              <Link
                key={path}
                href={path}
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
              >
                <Icon className='h-5 w-5' />
                {label}
              </Link>
            ))}

            
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Navbar;
