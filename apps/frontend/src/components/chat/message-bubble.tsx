import { User, Bot } from "lucide-react";
import type { Message } from "ai";
import ReasoningDisplay from "./reasoning-display";
import MessageMarkdown from "./message-markdown";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  // Get reasoning parts for display
  const reasoningParts =
    message.parts?.filter((part: any) => part.type === "reasoning") || [];

  return (
    <div className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="mr-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Bot className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl text-sm ${
          isUser
            ? "bg-gray-200 text-gray-900 rounded-br-md"
            : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
        }`}
      >
        {/* Text Content */}
        <div>
          {message.parts?.map((part: any, i: number) => {
            if (part.type === "text") {
              return <MessageMarkdown key={i} message={part.text} />;
            }
            return null;
          }) || message.content}
        </div>
      </div>

      {/* Avatar */}
      {isUser && (
        <div className="ml-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
}
