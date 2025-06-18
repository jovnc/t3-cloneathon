import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getUserChats, getChat } from "@/lib/db/ai";

export const chatRouter = createTRPCRouter({
  // Get all chats for the authenticated user
  getUserChats: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.user?.id as string;
      const chats = await getUserChats(userId);
      return chats;
    } catch (error) {
      console.error("Failed to fetch user chats:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user chats",
        cause: error,
      });
    }
  }),

  // Get a specific chat by ID
  getChat: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const userId = ctx.user?.id as string;
        const chat = await getChat(input.chatId, userId);

        if (!chat) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Chat not found",
          });
        }

        // Verify the chat belongs to the user
        if (chat.userId !== userId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You don't have access to this chat",
          });
        }

        return chat;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error("Failed to fetch chat:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch chat",
          cause: error,
        });
      }
    }),

  // Create a new chat
  createChat: protectedProcedure
    .input(z.object({ title: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = ctx.user?.id as string;
        const chatId = crypto.randomUUID();

        const chat = await ctx.db.chats.create({
          data: {
            id: chatId,
            title: input.title ?? "New Chat",
            userId: userId,
          },
          select: {
            id: true,
            title: true,
            created_at: true,
          },
        });

        return chat;
      } catch (error) {
        console.error("Failed to create chat:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create chat",
          cause: error,
        });
      }
    }),

  // Ensure chat exists (create if doesn't exist)
  ensureChatExists: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        title: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const userId = ctx.user?.id as string;

        const chat = await ctx.db.chats.upsert({
          where: {
            id: input.chatId,
          },
          update: {
            ...(input.title && { title: input.title }),
          },
          create: {
            id: input.chatId,
            title: input.title ?? "New Chat",
            userId: userId,
          },
          select: {
            id: true,
            title: true,
            created_at: true,
            userId: true,
          },
        });

        return chat;
      } catch (error) {
        console.error("Failed to ensure chat exists:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create or access chat",
          cause: error,
        });
      }
    }),
});
