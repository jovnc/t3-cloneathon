"use client";

import { useChat } from "@ai-sdk/react";
import React, { createContext, useContext, useState } from "react";
import type { Message } from "ai";

const ChatContext = createContext<{
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  searchEnabled: boolean;
  setSearchEnabled: (enabled: boolean) => void;
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
} | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <ChatContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
        searchEnabled,
        setSearchEnabled,
        messages,
        input,
        handleInputChange,
        handleSubmit,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
