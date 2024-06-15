"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import clsx from "clsx";

function PathsLinks() {
  const pathname = usePathname();
  return sidebarLinks.map((item) => {
    const isActive = pathname === item.route;

    return (
      <Link
        href={item.route}
        key={item.label}
        className={clsx(
          " flex items-center gap-5 rounded-lg px-3 py-2 text-xl text-muted-foreground transition-all hover:bg-gray-300/10 hover:text-primary md:gap-3",
          isActive && "bg-gray-300/10  bg-opacity-10 text-primary"
        )}
      >
        <item.icon className='md:h-5 md:w-5' />
        <p className='md:text-[15px]'>{item.label}</p>
      </Link>
    );
  });
}

export default PathsLinks;
