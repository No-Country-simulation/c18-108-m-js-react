import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Role } from "@prisma/client";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string().length(25),
        clerkId: z.string().length(32).optional(),
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        email: z.string().email().optional(),
        imageUrl: z.string().optional(),
        role: z.nativeEnum(Role).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.currentUser.id) {
        throw new Error("No user found");
      }
      const updatedUser = await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
      return {
        message: `The user ${updatedUser.firstName} ${updatedUser.lastName} (${updatedUser.email}) has been updated.`,
        results: [updatedUser],
      };
    }),

  createUser: protectedProcedure
    .input(
      z.object({
        clerkId: z.string().optional(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        imageUrl: z.string().optional(),
        role: z.nativeEnum(Role).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.currentUser.role !== "ADMIN") {
        throw new Error("No user found");
      }
      const newUser = await ctx.db.user.create({
        data: {
          clerkId: input.clerkId,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          imageUrl: input.imageUrl,
          role: input.role,
        },
      });

      return {
        message: `The user ${newUser.firstName} ${newUser.lastName} (${newUser.email}) has been successfully created.`,
        results: [newUser],
      };
    }),

  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string().length(25),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.currentUser.id) {
        throw new Error("No user found");
      }
      const deletedUser = await ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
      return {
        message: `The user ${deletedUser.firstName} ${deletedUser.lastName} (${deletedUser.email}) has been deleted.`,
        results: [deletedUser],
      };
    }),

  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string().length(25),
      })
    )
    .query(async ({ ctx, input }) => {
      if (
        ctx.currentUser.role === "ADMIN" ||
        ctx.currentUser.role === "TEACHER" ||
        ctx.currentUser.role === "STUDENT"
      ) {
        const user = await ctx.db.user.findMany({
          where: {
            id: input.id,
          },
        });
        return {
          info: {
            count: 1,
          },
          results: user,
        };
      }
      throw new Error("Unauthorized");
    }),

  getAllTeachers: protectedProcedure.query(async ({ ctx }) => {
    if (
      ctx.currentUser.role === "ADMIN" ||
      ctx.currentUser.role === "TEACHER" ||
      ctx.currentUser.role === "STUDENT"
    ) {
      const count = await ctx.db.user.aggregate({
        where: {
          role: "TEACHER",
        },
        _count: true,
      });
      const users = await ctx.db.user.findMany({
        where: {
          role: "TEACHER",
        },
      });
      return {
        info: {
          count: count._count,
        },
        results: users,
      };
    }
    throw new Error("Unauthorized");
  }),
  getAllStudents: protectedProcedure.query(async ({ ctx }) => {
    if (
      ctx.currentUser.role === "ADMIN" ||
      ctx.currentUser.role === "TEACHER" ||
      ctx.currentUser.role === "STUDENT"
    ) {
      const count = await ctx.db.user.aggregate({
        where: {
          role: "STUDENT",
        },
        _count: true,
      });
      const users = await ctx.db.user.findMany({
        where: {
          role: "STUDENT",
        },
      });
      return {
        info: {
          count: count._count,
        },
        results: users,
      };
    }
    throw new Error("Unauthorized");
  }),
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.currentUser.role === "ADMIN") {
      const count = await ctx.db.user.aggregate({
        _count: true,
      });
      const users = await ctx.db.user.findMany();
      return {
        info: {
          count: count._count,
        },
        results: users,
      };
    }
    throw new Error("Unauthorized");
  }),
});
