"use client";
import MessageBubble from "./message-bubble";
import type { UIMessage } from "ai";
import WelcomeScreen from "./welcome-sceen";
import { Button } from "../ui/button";
import { Repeat } from "lucide-react";

interface MessageListProps {
  messages: UIMessage[];
  error: any;
  reload: () => void;
}

export default function MessageList({
  messages,
  error,
  reload,
}: MessageListProps) {
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

        {/* Display error message if any */}
        {error && (
          <div className="w-full text-center text-sm text-muted-foreground mt-4 space-y-2">
            <div className="text-destructive">An error occurred.</div>
            <Button
              type="button"
              onClick={() => reload()}
              variant={"ghost"}
              size="sm"
            >
              <Repeat />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
