"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeyDialogProps {
  isOpen: boolean;
  onApiKeySet: (apiKey: string) => void;
  onClose?: () => void;
}

export function ApiKeyDialog({
  isOpen,
  onApiKeySet,
  onClose,
}: ApiKeyDialogProps) {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      // Store the API key in localStorage
      localStorage.setItem("openrouter_api_key", apiKey.trim());
      onApiKeySet(apiKey.trim());
      setApiKey(""); // Clear the input after successful save
    } catch (error) {
      console.error("Failed to save API key:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setApiKey(""); // Clear the input when closing
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="sm:max-w-md !fixed !left-1/2 !top-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 !m-0"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          margin: 0,
        }}
      >
        <DialogHeader>
          <DialogTitle>OpenRouter API Key Required</DialogTitle>
          <DialogDescription>
            Please enter your OpenRouter API key to continue. You can get your
            API key from{" "}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              OpenRouter.ai
            </a>
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="sk-or-v1-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!apiKey.trim() || isLoading}>
              {isLoading ? "Saving..." : "Save API Key"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
