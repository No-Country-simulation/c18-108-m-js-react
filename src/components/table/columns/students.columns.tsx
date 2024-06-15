"use client";

import type { RouterOutputs } from "@/trpc/react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import EditComponent from "../edit/dialog-user";

type StudentsResultsType = RouterOutputs["user"]["getAllStudents"]["results"];

export const columns: ColumnDef<StudentsResultsType[number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estado
        <CaretSortIcon className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span
                className={clsx(
                  "rounded-md  px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white",
                  status ? "bg-green-400" : "bg-red-400"
                )}
              >
                {status ? "Activo" : "Inactivo"}
              </span>
            </TooltipTrigger>
            <TooltipContent>{status ? "Activo" : "Inactivo"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    header: "Nombre y Apellido",
    cell: ({ row }) => {
      const user = row.original;
      return user.firstName + ", " + user.lastName;
    },
  },

  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return <EditComponent id={user.id} />;
    },
  },
];
