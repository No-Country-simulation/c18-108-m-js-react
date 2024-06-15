import Image from "next/image";
import type { RouterOutputs } from "@/trpc/react";

import { cn } from "@/lib/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";

type CourseType = RouterOutputs["course"]["getAllCourses"]["results"][number];

export function CourseCard({
  data,
  width,
  height,
  className,
}: {
  data: CourseType;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 space-y-3 ", className)}>
      <div>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className='aspect-[5/3]'>
              <Image
                src={data.imageUrl ?? ""}
                alt={data.name}
                width={width}
                height={height}
                className={cn("h-full w-full rounded-md object-cover")}
              />
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent className='w-40'>
            <ContextMenuItem>Editar</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Agregar alumnos</ContextMenuItem>
            <ContextMenuItem>Cambiar de profesor</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <div className='space-y-1 text-sm'>
          <h3 className='font-medium leading-none'>{data.name}</h3>
          <h4 className='text-xs text-muted-foreground'>
            Docente: {data.teacher?.firstName} {data.teacher?.lastName}
          </h4>
        </div>
      </div>
    </div>
  );
}
