"use client";

import type { UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchWithErrorHandlers, generateUUID } from "@/lib/utils";
import { ChatSDKError } from "@/lib/errors";
import { toast } from "sonner";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAutoResume } from "@/hooks/use-auto-resume";
import { useChats } from "@/hooks/use-chats";
import { api } from "@/trpc/react";
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
  const [isCreatingFirstMessage, setIsCreatingFirstMessage] = useState(false);
  const isMountedRef = useRef(true);

  const router = useRouter();
  const pathname = usePathname();
  const { ensureChat } = useChats();
  const utils = api.useUtils();

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    error,
    stop,
    experimental_resume,
    data,
    reload,
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
    onFinish: async (message, options) => {
      // Invalidate the chat list cache to update sidebar titles
      try {
        await utils.chat.getUserChats.invalidate();
        // Also invalidate the specific chat to ensure fresh data
        await utils.chat.getChat.invalidate({ chatId: id });
      } catch (error) {
        console.error("Failed to invalidate cache:", error);
      }
    },
  });

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  // Reset hasAppendedQuery when the query changes (for edge cases)
  useEffect(() => {
    if (!query) {
      setHasAppendedQuery(false);
    }
  }, [query]);

  const customHandleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: any) => {
      const isFirstMessage =
        pathname === "/" &&
        initialMessages.length === 0 &&
        messages.length === 0;

      if (isFirstMessage && input.trim()) {
        e.preventDefault(); // Prevent default form submission
        setIsCreatingFirstMessage(true);

        try {
          // 1. Create chat in database first
          await ensureChat({ chatId: id });

          // 2. Navigate to chat page with the message as a query param
          const messageContent = encodeURIComponent(input.trim());
          router.push(`/chat/${id}?query=${messageContent}`);

          // Clear the input since we're navigating away
          setInput("");
        } catch (error) {
          console.error("Failed to create chat:", error);
          toast.error("Failed to send message. Please try again.");
          setIsCreatingFirstMessage(false);
          return;
        }
      } else {
        // For existing chats, proceed normally
        handleSubmit(e, chatRequestOptions);
      }
    },
    [
      pathname,
      initialMessages.length,
      messages.length,
      input,
      ensureChat,
      id,
      router,
      handleSubmit,
      setInput,
    ]
  );

  // Handle query parameter for first message
  useEffect(() => {
    if (query && !hasAppendedQuery) {
      const decodedQuery = decodeURIComponent(query);

      // Add the message and trigger AI response
      append({
        role: "user",
        content: decodedQuery,
      });

      setHasAppendedQuery(true);

      // Clean up the URL by removing the query parameter
      const newUrl = `/chat/${id}`;
      window.history.replaceState({}, "", newUrl);

      // Invalidate cache immediately after first message to update sidebar
      setTimeout(() => {
        utils.chat.getUserChats.invalidate();
      }, 100);
    }
  }, [query, append, hasAppendedQuery, id, utils.chat.getUserChats]);

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
      <MessageList messages={messages} error={error} reload={reload} />

      {/* Input Bar */}
      <InputBar
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        searchEnabled={searchEnabled}
        setSearchEnabled={setSearchEnabled}
        handleSubmit={customHandleSubmit}
        input={input}
        setInput={setInput}
        disabled={
          status === "streaming" ||
          status === "submitted" ||
          isCreatingFirstMessage
        }
        stop={stop}
        isStreaming={status === "streaming"}
      />
    </div>
  );
}
