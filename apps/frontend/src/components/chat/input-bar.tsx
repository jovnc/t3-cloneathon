"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Paperclip, Send } from "lucide-react";
import ModelSelector from "./model-selector";
import { useChatContext } from "@/providers/ChatProvider";

export default function InputBar() {
  const {
    selectedModel,
    setSelectedModel: onModelChange,
    searchEnabled,
    setSearchEnabled,
    handleSubmit: onSubmit,
    input,
    handleInputChange: onInputChange,
  } = useChatContext();

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={onSubmit}>
          <div className="border border-secondary rounded-lg p-3 flex flex-col gap-3">
            {/* Input field for user message */}
            <Input
              className="w-full border-none shadow-none px-2 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
              value={input}
              placeholder="Type your message here..."
              onChange={onInputChange}
            />

            <div className="flex items-center justify-between">
              {/* Model selector dropdown */}
              <ModelSelector
                selectedModel={selectedModel}
                onChange={onModelChange}
              />

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {/* Search button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`text-xs px-2 py-1  ${
                    searchEnabled
                      ? "bg-success"
                      : "bg-background hover:bg-success/80"
                  }`}
                  onClick={() => setSearchEnabled(!searchEnabled)}
                >
                  <Search className="w-3 h-3 mr-1" />
                  Search
                </Button>

                {/* Attachment button */}
                <Button type="button" variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>

                {/* Send button */}
                <Button
                  type="submit"
                  size="sm"
                  className="p-1 h-7 w-7 bg-primary hover:bg-primary/80 rounded-lg"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
