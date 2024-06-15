import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Role } from "@prisma/client";
import { z } from "zod";

export const courseRouter = createTRPCRouter({
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

  updateCourse: protectedProcedure
    .input(
      z.object({
        id: z.string().length(25),
        name: z.string(),
        imageUrl: z.string().optional(),
        gradeId: z.string().length(25).optional(),
        teacherId: z.string().length(25).optional(),
        // studentId: z.array(z.string().length(25)).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.currentUser.role !== "ADMIN") {
        throw new Error("No user found");
      }
      const newCourse = await ctx.db.course.create({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
          gradeId: input.gradeId,
          teacherId: input.teacherId,
          // studentId: input.studentId,
        },
      });

      return {
        message: `The course ${newCourse.name} has been successfully created.`,
        results: [newCourse],
      };
    }),
  createCourse: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        imageUrl: z.string().optional(),
        gradeId: z.string().length(25).optional(),
        teacherId: z.string().length(25).optional(),
        // studentId: z.array(z.string().length(25)).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.currentUser.role !== "ADMIN") {
        throw new Error("No user found");
      }
      const newCourse = await ctx.db.course.create({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
          gradeId: input.gradeId,
          teacherId: input.teacherId,
          // studentId: input.studentId,
        },
      });

      return {
        message: `The course ${newCourse.name} has been successfully created.`,
        results: [newCourse],
      };
    }),

  // deleteUser: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.string().length(25),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     if (!ctx.currentUser.id) {
  //       throw new Error("No user found");
  //     }
  //     const deletedUser = await ctx.db.user.delete({
  //       where: {
  //         id: input.id,
  //       },
  //     });
  //     return {
  //       message: `The user ${deletedUser.firstName} ${deletedUser.lastName} (${deletedUser.email}) has been deleted.`,
  //       results: [deletedUser],
  //     };
  //   }),

  getCourse: protectedProcedure
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
        const course = await ctx.db.course.findUnique({
          where: {
            id: input.id,
          },
          select: {
            id: true,
            name: true,
            imageUrl: true,
            teacher: {
              select: {
                id: true,
                clerkId: true,
                firstName: true,
                lastName: true,
                email: true,
                imageUrl: true,
              },
            },
            students: {
              select: {
                id: true,
                clerkId: true,
                firstName: true,
                lastName: true,
                email: true,
                imageUrl: true,
              },
            },
          },
        });
        return {
          info: {
            count: 1,
          },
          results: course,
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

  getAllCourses: protectedProcedure.query(async ({ ctx }) => {
    if (
      ctx.currentUser.role === "ADMIN" ||
      ctx.currentUser.role === "TEACHER"
    ) {
      const count = await ctx.db.course.aggregate({
        _count: true,
      });
      const courses = await ctx.db.course.findMany({
        select: {
          id: true,
          name: true,
          imageUrl: true,
          teacher: {
            select: { id: true, firstName: true, lastName: true },
          },
          students: {
            select: { id: true },
          },
        },
      });
      return {
        info: {
          count: count._count,
        },
        results: courses,
      };
    }
    throw new Error("Unauthorized");
  }),
});
