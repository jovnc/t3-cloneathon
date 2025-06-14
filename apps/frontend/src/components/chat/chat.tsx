"use client";

import type { UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { fetchWithErrorHandlers, generateUUID } from "@/lib/utils";
import { ChatSDKError } from "@/lib/errors";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useAutoResume } from "@/hooks/use-auto-resume";
import MessageList from "./message-list";
import InputBar from "./input-bar";

interface ChatProps {
  id: string;
  initialMessages: Array<UIMessage>;
  initialChatModel: string;
  autoResume: boolean;
}

export function Chat({
  id,
  initialMessages,
  initialChatModel,
  autoResume,
}: ChatProps) {
  const [selectedModel, setSelectedModel] = useState(initialChatModel);
  const [searchEnabled, setSearchEnabled] = useState(false);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
    experimental_resume,
    data,
  } = useChat({
    id,
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    fetch: fetchWithErrorHandlers,
    experimental_prepareRequestBody: (body) => ({
      id,
      messages: body.messages,
      selectedChatModel: selectedModel,
    }),
    onError: (error) => {
      if (error instanceof ChatSDKError) {
        toast(`Error: ${error.message}`);
      }
    },
  });

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  // TODO: change implementation to use a more robust state management solution
  useEffect(() => {
    if (query && !hasAppendedQuery) {
      append({
        role: "user",
        content: query,
      });

      setHasAppendedQuery(true);
      window.history.replaceState({}, "", `/chat/${id}`);
    }
  }, [query, append, hasAppendedQuery, id]);

  useAutoResume({
    autoResume,
    initialMessages,
    experimental_resume,
    data,
    setMessages,
  });

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Message List */}
      <MessageList
        messages={messages}
        reload={reload}
        isLoading={status === "streaming" || status === "submitted"}
      />

      {/* Input Bar */}
      <InputBar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        searchEnabled={searchEnabled}
        setSearchEnabled={setSearchEnabled}
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        disabled={status === "streaming" || status === "submitted"}
        stop={stop}
        isStreaming={status === "streaming"}
      />
    </div>
  );
}
