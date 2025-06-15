"use client"

import type React from "react"

import { useState } from "react"
import { Search, Info, ChevronDown, ArrowLeft, Pin, PinOff } from "lucide-react"
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Mock favorites state - you can replace this with actual state management
  const [favoriteModelIds, setFavoriteModelIds] = useState([
    "claude-3-7-sonnet-20250219",
    "gemini-2.5-flash",
    "o4-mini",
    "gpt-imagegen",
    "claude-3-5-sonnet-20241022",
  ])

  const filteredModels = AI_MODELS.filter(
    (model: AIModel) =>
      model.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const favoriteModels = filteredModels.filter((model) => favoriteModelIds.includes(model.value))
  const otherModels = filteredModels.filter((model) => !favoriteModelIds.includes(model.value))
  const displayedModels = filteredModels.slice(0, 7)

  const handleModelSelect = (model: AIModel) => {
    if (model.available) {
      onChange(model.value)
    }
  }

  const toggleFavorite = (modelValue: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent model selection when clicking pin
    setFavoriteModelIds((prev) =>
      prev.includes(modelValue) ? prev.filter((id) => id !== modelValue) : [...prev, modelValue],
    )
  }

  const ModelCard = ({ model }: { model: AIModel }) => {
    const isFavorite = favoriteModelIds.includes(model.value)
    const isHovered = hoveredCard === model.value

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onMouseEnter={() => setHoveredCard(model.value)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleModelSelect(model)}
            className={`relative p-4 rounded-lg border transition-all cursor-pointer ${
              model.available
                ? selectedModel === model.value
                  ? "bg-primary/20 ring-1 ring-violet-200 hover:bg-violet-100"
                  : "hover:bg-white bg-gray-50"
                : "opacity-50 cursor-not-allowed border-gray-100 bg-gray-50"
            }`}
          >
            {/* Pin Button - Top Right Corner */}
            {model.available && (
              <div
                className={`absolute -top-2 -right-2 transition-opacity duration-200 rounded-lg ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => toggleFavorite(model.value, e)}
                    className="h-8 w-8 p-0 rounded-lg border-1 border-violet-300 bg-violet-100 text-violet-600 hover:bg-violet-200"
                >
                    {isFavorite ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                </Button>

              </div>
            )}

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex items-center justify-center">{}</div>

              <div>
                <h3 className={`font-medium text-sm ${model.available ? "text-violet-950" : "text-violet-200"}`}>
                  {model.label}
                </h3>
              </div>

              <div className="flex items-center justify-center space-x-1 flex-wrap">
                {model.capabilities.map((capability, index) => {
                  const Icon = capability?.icon
                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                        <div className={`p-1.5 rounded-full ${capability?.color} transition-colors hover:opacity-80`}>
                          {Icon && <Icon className="w-3 h-3" />}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{capability?.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-xs">{model.description}</p>
        </TooltipContent>
      </Tooltip>
    )
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

        {showAll ? (
          // Grid View
          <div className="max-h-[500px] overflow-y-auto">
            {/* Favorites Section */}
            {favoriteModels.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Pin className="w-4 h-4 text-violet-950" />
                  <h2 className="text-lg font-semibold text-violet-950">Favourites</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {favoriteModels.map((model) => (
                    <ModelCard key={model.value} model={model} />
                  ))}
                </div>
              </div>
            )}

            {/* Others Section */}
            {otherModels.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Others</h2>
                <div className="grid grid-cols-3 gap-3">
                  {otherModels.map((model) => (
                    <ModelCard key={model.value} model={model} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // List View - Favorites Models List
          <div className="space-y-3">
            {displayedModels.map((model) => (
              <div
                key={model.value}
                onClick={() => handleModelSelect(model)}
                className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
                  model.available
                    ? selectedModel === model.value
                      ? "bg-primary/20 "
                      : "hover:bg-primary/5"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className={`text-md font-medium ${model.available ? "text-violet-900" : "text-violet-300"}`}>
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

                <div className="flex items-center space-x-1">
                  {model.capabilities.map((capability, index) => {
                    const Icon = capability?.icon
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
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show All Toggle / Back Button */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          {showAll ? (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setShowAll(false)}
                className="flex items-center space-x-2 text-violet-900 hover:text-violet-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Favourites</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setShowAll(true)}
              className="flex items-center space-x-2 text-violet-900 hover:text-violet-700"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Show all</span>
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
