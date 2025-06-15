import { db } from "@/server/db";
import type { Message } from "./types";
import { ChatSDKError } from "../errors";

export async function ensureChatExists(chatId: string, userId?: string) {
  try {
    if (!userId) {
      console.warn(
        "No user ID provided for chat creation, skipping chat creation"
      );
      return null;
    }

    const chat = await db.chats.upsert({
      where: {
        id: chatId,
      },
      update: {},
      create: {
        id: chatId,
        title: "New Chat",
        userId: userId,
      },
    });

    return chat;
  } catch (error) {
    console.error("Failed to ensure chat exists:", error);
    throw new ChatSDKError("bad_request:database", "Failed to create chat");
  }
}

export async function saveMessages({ messages }: { messages: Array<Message> }) {
  try {
    return await db.messages.createMany({
      data: messages as any,
      skipDuplicates: true, // Skip duplicates to avoid errors
    });
  } catch (error) {
    throw new ChatSDKError("bad_request:database", "Failed to save messages");
  }
}

export async function getChat(chatId: string, userId?: string) {
  try {
    const chat = await db.chats.findUnique({
      where: { id: chatId },
      select: {
        id: true,
        userId: true,
        title: true,
        messages: {
          orderBy: { created_at: "asc" },
          select: {
            id: true,
            parts: true,
            created_at: true,
          },
        },
      },
    });

    return chat;
  } catch (error) {
    console.error("Failed to fetch chat:", error);
    throw new ChatSDKError("bad_request:database", "Failed to fetch chat");
  }
}

export async function getUserChats(userId: string) {
  try {
    const chats = await db.chats.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        created_at: true,
        _count: {
          select: { messages: true },
        },
        messages: {
          orderBy: { created_at: "asc" },
          take: 2,
          select: {
            parts: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: 20,
    });

    return chats;
  } catch (error) {
    console.error("Failed to fetch user chats:", error);
    throw new ChatSDKError(
      "bad_request:database",
      "Failed to fetch user chats"
    );
  }
}
