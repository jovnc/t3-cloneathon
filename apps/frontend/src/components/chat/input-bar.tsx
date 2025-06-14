"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Paperclip, Send, Square } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ModelSelector from "./model-selector";
import type { ChatRequestOptions } from "ai";

interface InputBarProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  searchEnabled: boolean;
  setSearchEnabled: (enabled: boolean) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  input: string;
  setInput: (input: string) => void;
  disabled?: boolean;
  stop?: () => void;
  isStreaming?: boolean;
}

export default function InputBar({
  selectedModel,
  setSelectedModel,
  searchEnabled,
  setSearchEnabled,
  handleSubmit,
  input,
  setInput,
  disabled = false,
  stop,
  isStreaming = false,
}: InputBarProps) {
  // Controlled input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <TooltipProvider>
      <div className="w-full">
        <div className="max-w-3xl mx-auto p-4">
          <form onSubmit={handleSubmit}>
            <div className="border-[0.5px] border-secondary rounded-lg p-3 flex flex-col gap-3 ">
              {/* Input field for user message */}
              <Input
                className="w-full border-none shadow-none px-2 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
                value={input}
                placeholder="Type your message here..."
                onChange={handleInputChange}
              />

              <div className="flex items-center justify-between">
                {/* Model selector dropdown */}
                <ModelSelector
                  selectedModel={selectedModel}
                  onChange={setSelectedModel}
                />

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Search button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`text-xs px-2 py-1 ${
                          searchEnabled && "bg-secondary/10"
                        }`}
                        onClick={() => setSearchEnabled(!searchEnabled)}
                      >
                        <Search className="w-3 h-3 mr-1" />
                        Search
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable search functionality</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Attachment button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Attach file</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Stop button - show when streaming */}
                  {isStreaming && stop && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="p-1 h-7 w-7 border-red-300 hover:bg-red-50 rounded-lg"
                          onClick={stop}
                        >
                          <Square className="w-3 h-3 text-red-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Stop generation</p>
                      </TooltipContent>
                    </Tooltip>
                  )}

                  {/* Send button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        size="sm"
                        className="p-1 h-7 w-7 bg-primary hover:bg-primary/80 rounded-lg"
                        disabled={disabled}
                      >
                        <Send className="w-3 h-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send message</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </TooltipProvider>
  );
}
