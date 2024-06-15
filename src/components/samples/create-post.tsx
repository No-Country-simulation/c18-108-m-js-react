"use client";

import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "El titulo es requerido",
  }),
});

export function CreatePost() {
  const router = useRouter();

  const createPost = api.post.createPost.useMutation({
    onSuccess: () => {
      form.reset();
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPost.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='El titulo del post' {...field} />
              </FormControl>
              <FormDescription>
                Escribe un titulo para tu siguiente post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={createPost.isPending}>
          {createPost.isPending ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
