import { streamText, type UIMessage } from "ai";
import type { NextRequest } from "next/server";
import { getModelFromSelection } from "@/lib/ai/providers";
import { saveMessages, ensureChatExists } from "@/lib/db/ai";
import type { Message } from "@/lib/db/types";
import { auth } from "@/server/auth";

interface Payload {
  id: string;
  messages: UIMessage[];
  selectedChatModel: string;
}

export async function POST(req: NextRequest) {
  try {
    const response: Payload = await req.json();
    const { id: chatId, messages, selectedChatModel } = response;

    // Get the authenticated user
    const session = await auth();
    const userId = session?.user?.id;

    const result = await streamText({
      model: getModelFromSelection(selectedChatModel),
      messages,
      onFinish: async (completion) => {
        try {
          const chat = await ensureChatExists(chatId, userId);

          // Unauthenticated users don't save messages
          if (!chat && !userId) {
            console.warn(
              "Skipping message save - no authenticated user or existing chat"
            );
            return;
          }

          // Convert messages to your database format
          const messagesToSave: Partial<Message>[] = [];

          // Save the latest user message if it's new
          const lastUserMessage = messages[messages.length - 1];
          if (lastUserMessage?.role === "user") {
            messagesToSave.push({
              chatId,
              parts: {
                role: lastUserMessage.role,
                content: lastUserMessage.content,
                timestamp: new Date().toISOString(),
              },
            });
          }

          // Save the AI assistant response
          messagesToSave.push({
            chatId,
            parts: {
              role: "assistant",
              content: completion.text,
              timestamp: new Date().toISOString(),
              model: selectedChatModel,
            },
          });

          await saveMessages({ messages: messagesToSave as Message[] });
        } catch (error) {
          console.error("Failed to save messages:", error);
          // Don't throw here to avoid breaking the stream response
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Server Error", { status: 500 });
  }
}
