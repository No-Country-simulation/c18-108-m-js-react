import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
  return (
    <Table>
      <TableCaption>Una lista de todos tus mensajes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'></TableHead>
          <TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger className='w-full rounded-md bg-slate-300 px-4 py-2 text-left'>
                Todos los cursos
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Cursos</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Cursos Favoritos</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>
          <TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger className='w-full rounded-md bg-slate-300 px-4 py-2 text-left'>
                Bandeja de entrada
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>No leído</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Destacado</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Enviado</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Archivado</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  Comentarios de la presentación
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>

          <TableHead className='text-right'>
            <Input placeholder='Buscar...' />
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export default Page;
