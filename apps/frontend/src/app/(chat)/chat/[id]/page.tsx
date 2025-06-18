"use client";

import { DEFAULT_AI_MODEL } from "@/constants";
import { Chat } from "@/components/chat/chat";
import type { UIMessage } from "ai";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    query?: string;
  }>;
}

export default function Page({ params, searchParams }: PageProps) {
  const [chatId, setChatId] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [modelIdFromCookie, setModelIdFromCookie] = useState(DEFAULT_AI_MODEL);

  // Handle async params
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const resolvedSearchParams = await searchParams;
      setChatId(resolvedParams.id);
      setQuery(resolvedSearchParams.query || "");
    };
    resolveParams();
  }, [params, searchParams]);

  // Get model from cookie
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      const modelCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("chat-model=")
      );
      if (modelCookie) {
        const model = modelCookie.split("=")[1];
        setModelIdFromCookie(model || DEFAULT_AI_MODEL);
      }
    }
  }, []);

  const {
    data: chat,
    isLoading,
    error,
  } = api.chat.getChat.useQuery(
    { chatId },
    {
      enabled: !!chatId,
      retry: (failureCount, error) => {
        // Don't retry if chat is not found
        if (error.data?.code === "NOT_FOUND") {
          return false;
        }
        return failureCount < 3;
      },
    }
  );

  // Don't render anything until we have the chatId
  if (!chatId) {
    return null;
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  // Handle error or no chat found - render empty chat
  if (error || !chat) {
    return (
      <Chat
        id={chatId}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie}
        autoResume={!!query}
      />
    );
  }

  // Transform messages to UIMessage format
  const initialMessages = chat.messages.map((msg) => ({
    id: msg.id,
    role: (msg.parts as any)?.role || "assistant",
    content: (msg.parts as any)?.content || "",
  })) as UIMessage[];

  return (
    <Chat
      id={chatId}
      initialMessages={initialMessages}
      initialChatModel={modelIdFromCookie}
      autoResume={!!query}
    />
  );
}
