"use client";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useChats } from "@/hooks/use-chats";

function generateChatTitle(chat: any): string {
  if (chat.title && chat.title !== "New Chat") {
    return chat.title;
  }

  // Try to use the first user message as title
  if (chat.messages && chat.messages.length > 0) {
    // Find the first user message
    const firstUserMessage = chat.messages.find((msg: any) => {
      const parts = msg.parts;
      return parts && parts.role === "user";
    });

    if (firstUserMessage) {
      const content = firstUserMessage.parts?.content;
      if (content && typeof content === "string") {
        return content.length > 50 ? content.substring(0, 50) + "..." : content;
      }
    }
  }

  return "New Chat";
}

export function ChatList() {
  const { chats, isLoading, error } = useChats();

  if (isLoading) {
    return (
      <div className="space-y-2 px-2 py-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full bg-gray-200" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xs text-red-500 px-2 py-4">
        Failed to load conversations. Please try again.
      </div>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <div className="text-xs text-gray-500 px-2 py-4">
        No conversations yet. Start a new chat!
      </div>
    );
  }

  // Group chats by date
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayChats = chats.filter(
    (chat) => chat.created_at.toDateString() === today.toDateString()
  );

  const yesterdayChats = chats.filter(
    (chat) => chat.created_at.toDateString() === yesterday.toDateString()
  );

  const olderChats = chats.filter((chat) => chat.created_at < yesterday);

  return (
    <div className="space-y-4">
      {todayChats.length > 0 && (
        <div>
          <div className="text-xs font-medium text-gray-500 mb-2 px-2">
            Today
          </div>
          <div className="space-y-1">
            {todayChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block p-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer truncate"
                title={generateChatTitle(chat)}
              >
                {generateChatTitle(chat)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {yesterdayChats.length > 0 && (
        <div>
          <div className="text-xs font-medium text-gray-500 mb-2 px-2">
            Yesterday
          </div>
          <div className="space-y-1">
            {yesterdayChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block p-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer truncate"
                title={generateChatTitle(chat)}
              >
                {generateChatTitle(chat)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {olderChats.length > 0 && (
        <div>
          <div className="text-xs font-medium text-gray-500 mb-2 px-2">
            Older
          </div>
          <div className="space-y-1">
            {olderChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className="block p-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer truncate"
                title={generateChatTitle(chat)}
              >
                {generateChatTitle(chat)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
