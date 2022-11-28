import { z } from "zod";
import { protectedProcedure, router } from "../utils";

const MAX_TODOS = 5;

export default router({
  getUserTodos: protectedProcedure
    .input(z.object({ currentPage: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.todo.findMany({
        where: {
          userId: ctx.user.id,
        },
        select: {
          id: true,
          title: true,
          completed: true,
        },
        skip: MAX_TODOS * (input.currentPage - 1),
        take: MAX_TODOS,
      });
    }),
  modifyToDo: protectedProcedure
    .input(
      z.object({
        type: z.enum(["update", "delete"]),
        id: z.string(),
        status: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.type === "update") {
        return await ctx.prisma.todo.update({
          where: {
            id: input.id,
          },
          data: {
            completed: input.status,
          },
        });
      }
      return await ctx.prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    }),
  createToDo: protectedProcedure
    .input(z.object({ title: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.create({
        data: {
          title: input.title,
          userId: ctx.user.id,
        },
      });
    }),
});
