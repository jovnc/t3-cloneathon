import type { AIModel, ModelCapability } from "@/app/types"
import { anthropic } from "@ai-sdk/anthropic"
import { Eye, Globe, FileText, Settings, ImageIcon } from "lucide-react"

const capabilities: Record<string, ModelCapability> = {
  vision: {
    type: "vision",
    label: "Supports image uploads and analysis",
    icon: Eye,
    color: "bg-green-100 text-green-600",
  },
  search: {
    type: "search",
    label: "Uses search to answer questions",
    icon: Eye,
    color: "bg-blue-100 text-blue-600",
  },
  documents: {
    type: "documents",
    label: "Supports PDF uploads and analysis",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
  reasoning: {
    type: "reasoning",
    label: "Has reasoning capabilities",
    icon: Settings,
    color: "bg-purple-100 text-purple-600",
  },
  imageGeneration: {
    type: "image-generation",
    label: "Can generate images",
    icon: ImageIcon,
    color: "bg-orange-100 text-orange-600",
  },
}

export const DEFAULT_AI_MODEL = "claude-3-7-sonnet-20250219"

export const AI_MODELS: AIModel[] = [
  {
    value: "claude-3-7-sonnet-20250219",
    label: "Claude 3.7 Sonnet",
    description: "Coding and reasoning model from Anthropic",
    provider: "Anthropic",
    wrapper: anthropic,
    capabilities: [capabilities.vision, capabilities.documents, capabilities.reasoning],
    available: true,
  },
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    description: "Previous version of Anthropic's coding model",
    provider: "Anthropic",
    wrapper: anthropic,
    capabilities: [capabilities.vision, capabilities.documents, capabilities.reasoning],
    available: true,
  },
  
]
