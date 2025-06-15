"use client";

import { api } from "@/trpc/react";

export function useChats() {
  const utils = api.useUtils();

  const {
    data: chats,
    isLoading,
    error,
    refetch,
  } = api.chat.getUserChats.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const createChatMutation = api.chat.createChat.useMutation({
    onSuccess: () => {
      utils.chat.getUserChats.invalidate();
    },
    onError: (error) => {
      console.error("Failed to create chat:", error);
    },
  });

  const ensureChatMutation = api.chat.ensureChatExists.useMutation({
    onSuccess: () => {
      utils.chat.getUserChats.invalidate();
    },
    onError: (error) => {
      if (error.message !== "aborted") {
        console.error("Failed to ensure chat exists:", error);
      }
    },
  });

  return {
    chats: chats ?? [],
    isLoading,
    error,
    refetch,
    createChat: createChatMutation.mutate,
    isCreatingChat: createChatMutation.isPending,
    ensureChat: ensureChatMutation.mutateAsync,
    isEnsuringChat: ensureChatMutation.isPending,
  };
}

export function useChat(chatId: string) {
  const {
    data: chat,
    isLoading,
    error,
    refetch,
  } = api.chat.getChat.useQuery(
    { chatId },
    {
      enabled: !!chatId,
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    }
  );

  return {
    chat,
    isLoading,
    error,
    refetch,
  };
}
