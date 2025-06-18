"use client";

import { useState, useEffect } from "react";
import { ApiKeyDialog } from "@/components/auth/api-key-dialog";

interface ApiKeyProviderProps {
  children: React.ReactNode;
}

export function ApiKeyProvider({ children }: ApiKeyProviderProps) {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if API key exists in localStorage
    const apiKey = localStorage.getItem("openrouter_api_key");
    if (!apiKey) {
      setShowApiKeyDialog(true);
    }
  }, []);

  const handleApiKeySet = (apiKey: string) => {
    setShowApiKeyDialog(false);
  };

  // Don't render anything until we're on the client side
  if (!isClient) {
    return null;
  }

  return (
    <>
      {children}
      <ApiKeyDialog isOpen={showApiKeyDialog} onApiKeySet={handleApiKeySet} />
    </>
  );
}
