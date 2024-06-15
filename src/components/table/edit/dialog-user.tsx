"use client";

import { useState, type Dispatch } from "react";
import { api } from "@/trpc/react";
import { Pencil } from "lucide-react";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import FormUser from "./form-user";

interface EditComponentProps {
  id: string;
}

export default function EditComponent({ id }: EditComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const toggleDialog = () => setIsDialogOpen((prev) => !prev);
  return (
    <>
      <Button onClick={toggleDialog} size={"icon"}>
        <Pencil className='h-4 w-4' />
      </Button>
      {isDialogOpen && <DialogUser id={id} setIsDialogOpen={setIsDialogOpen} />}
    </>
  );
}

interface DialogUserProps {
  id: string;
  setIsDialogOpen: Dispatch<boolean>;
}

function DialogUser({ id, setIsDialogOpen }: DialogUserProps) {
  const { data, isLoading } = api.user.getUser.useQuery({ id });

  return (
    <AlertDialog open onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        {!data?.results[0] ? (
          isLoading ?? (
            <main>
              <Skeleton className='h-[20px] w-[100px] rounded-full' />
              <Skeleton className='mt-1 h-[20px] w-[160px] rounded-full' />
              <div className='mt-3 grid gap-2 md:grid-cols-2'>
                <Skeleton className=' h-[20px] w-full rounded-full' />
                <Skeleton className=' h-[20px] w-full rounded-full' />
              </div>
              <Skeleton className='mt-2 h-[20px] w-full rounded-full' />
            </main>
          )
        ) : (
          <FormUser data={data?.results[0]} />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
