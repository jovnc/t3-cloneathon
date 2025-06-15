"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ModelSelector from "./model-selector";
import { AI_MODELS } from "@/constants/ai";

interface ModelDropdownProps {
  selectedModel: string;
  onChange: (modelValue: string) => void;
}

export default function ModelDropdown({
  selectedModel,
  onChange,
}: ModelDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedModelData = AI_MODELS.find(
    (model) => model.value === selectedModel
  );

  const handleModelChange = (modelValue: string) => {
    onChange(modelValue);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-violet-500 hover:text-violet-400 hover:bg-primary/10 px-3 py-2 rounded-lg"
          size={"sm"}
        >
          <span className="font-medium text-xs">
            {selectedModelData?.label || "Select Model"}
          </span>
          <ChevronDown
            className={`w-3 h-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[500px] max-w-xl p-0 shadow-lg border-0 text-xs"
        side="top"
        align="start"
        sideOffset={8}
      >
        <ModelSelector
          selectedModel={selectedModel}
          onChange={handleModelChange}
        />
      </PopoverContent>
    </Popover>
  );
}
