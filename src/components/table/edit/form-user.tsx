"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { RoleUser, RoleUserEnum } from "@/constants";
import { api, type RouterOutputs } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type StudentsResultsType = RouterOutputs["user"]["getUser"]["results"][0];

interface FormProps {
  data: StudentsResultsType;
}

function FormUser({ data }: FormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const refExit = useRef<HTMLButtonElement>(null);

  const updateUser = api.user.updateUser.useMutation({
    onSuccess: () => {
      router.refresh();
      refExit.current?.click();
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado con éxito",
      });
    },
  });
  const formd = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      role: RoleUserEnum.Student,
      imageUrl: "",
    },
    values: {
      firstName: data.firstName!,
      lastName: data.lastName!,
      role: data.role as RoleUserEnum,
      imageUrl: data.imageUrl!,
    },
  });
  function onSubmit(values: z.infer<typeof editFormSchema>) {
    updateUser.mutate({ ...values, id: data.id });
  }
  return (
    <>
      <Form {...formd}>
        <form onSubmit={formd.handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Editando un usuario</AlertDialogTitle>
            <AlertDialogDescription>
              This ID is: {data.id}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <main className='my-4 flex flex-col gap-2'>
            <section className='grid gap-2 md:grid-cols-2'>
              <FormField
                control={formd.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primer Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder='Primer Nombre' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formd.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segundo Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder='Segundo Nombre' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <FormField
              control={formd.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a verified email to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RoleUser.map((role: { name: string; value: string }) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formd.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen url</FormLabel>
                  <FormControl>
                    <Input placeholder='Imagen url' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </main>
          <AlertDialogFooter>
            <AlertDialogCancel ref={refExit}>Cancel</AlertDialogCancel>
            <Button type='submit' disabled={updateUser.isPending}>
              {updateUser.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </>
  );
}

export default FormUser;

const editFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "El primer nombre es requerido",
  }),
  lastName: z.string().min(1, {
    message: "El segundo nombre es requerido",
  }),
  role: z.nativeEnum(RoleUserEnum, {
    required_error: "El rol es requerido",
    invalid_type_error: "El rol debe ser una cadena válida",
  }),
  imageUrl: z.string().url({ message: "La URL de la imagen no es válida" }),
});
