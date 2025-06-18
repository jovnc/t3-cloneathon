import type { AIModel, ModelCapability } from "@/app/types";
import {
  Eye,
  Brain,
  FileText,
  ImageIcon,
  Globe,
  Sparkle,
  Moon,
} from "lucide-react";

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
    icon: Globe,
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
    icon: Brain,
    color: "bg-violet-100 text-violet-600",
  },
  imageGeneration: {
    type: "image-generation",
    label: "Can generate images",
    icon: ImageIcon,
    color: "bg-orange-100 text-orange-600",
  },
};

export const DEFAULT_AI_MODEL = "anthropic/claude-3.7-sonnet";

export const FAVOURITE_MODELS: string[] = [
  "anthropic/claude-3.7-sonnet",
  "anthropic/claude-3.5-sonnet",
  "moonshotai/kimi-dev-72b:free",
];

export const AI_MODELS: AIModel[] = [
  {
    value: "anthropic/claude-3.7-sonnet",
    label: "Claude 3.7 Sonnet",
    description: "Coding and reasoning model from Anthropic",
    provider: "Anthropic",
    icon: Brain,
    capabilities: [
      capabilities.vision,
      capabilities.documents,
      capabilities.reasoning,
    ],
    available: true,
  },
  {
    value: "anthropic/claude-3.5-sonnet",
    label: "Claude 3.5 Sonnet",
    description: "Previous version of Anthropic's coding model",
    provider: "Anthropic",
    icon: Sparkle,
    capabilities: [
      capabilities.vision,
      capabilities.documents,
      capabilities.reasoning,
    ],
    available: true,
  },
  {
    value: "moonshotai/kimi-dev-72b:free",
    label: "Kimi Dev 72B",
    description: "Open-source coding model from Moonshot AI",
    provider: "Moonshot AI",
    icon: Moon,
    capabilities: [
      capabilities.vision,
      capabilities.documents,
      capabilities.reasoning,
    ],
    available: true,
  },
];
