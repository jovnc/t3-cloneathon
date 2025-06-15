"use client"

import { useState } from "react"
import { Search, Info, ChevronDown, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AI_MODELS } from "@/constants/ai"
import type { AIModel } from "@/app/types"

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
            className="pl-10 text-lg py-3 border-0 border-b-2 border-gray-200 rounded-none focus:border-purple-500 focus:ring-0"
          />
        </div>

        {/* Upgrade Banner */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Unlock all models + higher limits</h3>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-pink-600">$8</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold">
              Upgrade now
            </Button>
          </div>
        </div>

        {/* Models List */}
        <div className="space-y-4">
          {displayedModels.map((model) => (
            <div
              key={model.value}
              onClick={() => handleModelSelect(model)}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                model.available
                  ? selectedModel === model.value
                    ? "bg-purple-50 border-purple-300 ring-2 ring-purple-200"
                    : "hover:bg-gray-50 border-gray-200"
                  : "opacity-50 border-gray-100 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className={`text-lg font-medium ${model.available ? "text-gray-800" : "text-gray-400"}`}>
                    {model.label}
                  </span>
                  <span className="text-sm text-gray-500">{model.provider}</span>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
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
        {filteredModels.length > 7 && (
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
