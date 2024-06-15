/* eslint-disable @next/next/no-img-element */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserHead() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img
          className='size-10 rounded-full md:h-10 md:w-10'
          src='https://ui-avatars.com/api/?name=Nombre+Default'
          alt='user name and lastname'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserHead;
