"use client";

import { useEffect } from "react";
import type { UIMessage } from "ai";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { DataPart } from "@/lib/types";

export interface UseAutoResumeParams {
  autoResume: boolean;
  initialMessages: UIMessage[];
  experimental_resume: UseChatHelpers["experimental_resume"];
  data: UseChatHelpers["data"];
  setMessages: UseChatHelpers["setMessages"];
}

/**
 * Hook to handle auto-resuming a chat session.
 * It checks if the last message was sent by the user and triggers resume if so.
 *
 * @param {UseAutoResumeParams} params
 */
export function useAutoResume({
  autoResume,
  initialMessages,
  experimental_resume,
  data,
  setMessages,
}: UseAutoResumeParams) {
  // 1. Auto-resume conversation
  useEffect(() => {
    if (!autoResume) return;

    const mostRecentMessage = initialMessages.at(-1);

    if (mostRecentMessage?.role === "user") {
      experimental_resume();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Apppend messages from data stream
  useEffect(() => {
    if (!data) return;
    if (data.length === 0) return;

    const dataPart = data[0] as DataPart;

    if (dataPart.type === "append-message") {
      const message = JSON.parse(dataPart.message) as UIMessage;
      setMessages([...initialMessages, message]);
    }
  }, [data, initialMessages, setMessages]);
}
