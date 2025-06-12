import { User, Bot } from "lucide-react";

export default function MessageBubble({ message }: { message: any }) {
  const isUser = message.role === "user";

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
        <div className="font-semibold text-xs mb-1">{isUser ? "You:" : "AI:"}</div>
        {message.parts?.map((part: any, i: number) =>
          part.type === "text" ? <div key={i}>{part.text}</div> : null
        ) || message.content}
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
