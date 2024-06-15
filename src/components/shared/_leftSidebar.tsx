"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Settings } from "lucide-react";

import { LogoIcon } from "../icons";
import PathsLinks from "./navbar/PathsLinks";

const LeftSidebar = () => {
  return (
    <div className='hidden h-dvh  min-h-dvh w-[220px] min-w-[220px] flex-col justify-between  border-r bg-muted/30 px-3 py-6 md:flex'>
      <div>
        <header className='flex w-full flex-col'>
          <LogoIcon className='size-28' />
        </header>
        <nav className='mt-8 grid w-full gap-1 '>
          <PathsLinks />
        </nav>
      </div>
      <header className='flex justify-between'>
        <Link href={"setting"} className='flex items-center gap-2'>
          <Settings className='h-5 w-5' />
          <span className='text-sm'>Ajustes</span>
        </Link>
        <UserButton />
      </header>
    </div>
  );
};

export default LeftSidebar;
