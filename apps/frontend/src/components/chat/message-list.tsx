"use client";
import MessageBubble from "./message-bubble";
import type { UIMessage, ChatRequestOptions } from "ai";

interface MessageListProps {
  messages: UIMessage[];
  reload?: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  isLoading?: boolean;
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="text-center text-secondary mt-20">
            Hi there! How can I help you today?
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
