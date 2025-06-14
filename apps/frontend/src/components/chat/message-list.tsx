"use client";
import MessageBubble from "./message-bubble";
import type { UIMessage, ChatRequestOptions } from "ai";
import WelcomeScreen from "./welcome-sceen";

interface MessageListProps {
  messages: UIMessage[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Display a welcome screen if there are no messages */}
        {messages.length === 0 && <WelcomeScreen />}

        {/* Render messages */}
        {messages.length > 0 && (
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
