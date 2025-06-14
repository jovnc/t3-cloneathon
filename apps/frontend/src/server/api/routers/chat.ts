import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { streamText, type CoreMessage } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { TRPCError } from "@trpc/server";

export const chatRouter = createTRPCRouter({
  sendMessageStream: publicProcedure
    .input(
      z.object({
        messages: z.custom<CoreMessage[]>(),
      })
    )
    .mutation(async function* ({ input }) {
      try {
        const { messages } = input;
        const { fullStream } = await streamText({
          model: anthropic("claude-4-sonnet-20250514"),
          messages,
        });

        for await (const part of fullStream) {
          yield part;
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to stream response from AI service",
          cause: error,
        });
      }
    }),
});
