"use client"

import { useState } from "react"
import { Search, Info, ChevronDown, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AI_MODELS } from "@/constants/ai"
import type { AIModel } from "@/app/types"
import UpgradeBanner from "./upgrade-banner"

interface ModelSelectorProps {
  selectedModel: string
  onChange: (modelValue: string) => void
}

export default function ModelSelector({ selectedModel, onChange }: ModelSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAll, setShowAll] = useState(false)

  const filteredModels = AI_MODELS.filter(
    (model: AIModel) =>
      model.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const displayedModels = showAll ? filteredModels : filteredModels.slice(0, 7)

  const handleModelSelect = (model: AIModel) => {
    if (model.available) {
      onChange(model.value)
    }
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-lg py-3 rounded-md"
          />
        </div>

        <UpgradeBanner />

        {/* Models List */}
        <div className="space-y-4">
          {displayedModels.map((model) => (
            <div
              key={model.value}
              onClick={() => handleModelSelect(model)}
              className={`flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer ${
                model.available
                  ? selectedModel === model.value
                    ? "bg-primary/10 "
                    : "hover:bg-gray-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className={`text-md font-medium ${model.available ? "text-violet-500" : "text-violet-300"}`}>
                    {model.label}
                  </span>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-violet-400 hover:text-violet-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{model.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center space-x-2">
              {model.capabilities.map((capability, index) => {
                const Icon = capability?.icon;
                return (
                    <Tooltip key={index}>
                    <TooltipTrigger>
                        <div className={`p-2 rounded-full ${capability?.color} transition-colors hover:opacity-80`}>
                        {Icon && <Icon />} 
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{capability?.label}</p>
                    </TooltipContent>
                    </Tooltip>
                );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Show All Toggle */}
        {(
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
              <span>{showAll ? "Show less" : "Show all"}</span>
              <Filter className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
