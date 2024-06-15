import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Bienvenido ${input.text}`,
      };
    }),

  createPost: protectedProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.currentUser.id) {
        throw new Error("No user found");
      }
      const newPost = await ctx.db.post.create({
        data: {
          title: input.title,
          userId: ctx.currentUser.id,
        },
      });

      return newPost;
    }),

  getLatestPosts: protectedProcedure.query(({ ctx }) => {
    const posts = ctx.db.post.findMany({
      where: { userId: ctx.currentUser.id },
    });
    return posts;
  }),
});
