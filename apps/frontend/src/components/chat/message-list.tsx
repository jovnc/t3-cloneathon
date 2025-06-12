"use client";
import { useChatContext } from "@/providers/ChatProvider";
import MessageBubble from "./message-bubble";

export default function MessageList() {
  const { messages } = useChatContext();
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            Hi there! How can I help you today?
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
      </div>
    </div>
  );
}
