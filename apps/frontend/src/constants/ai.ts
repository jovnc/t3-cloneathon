import type { AIModel } from "@/app/types";

export const DEFAULT_AI_MODEL = "claude-3-7-sonnet-20250219";

export const AI_MODELS: AIModel[] = [
  {
    value: "claude-3-7-sonnet-20250219",
    label: "Claude 3.7 Sonnet",
    description: "Coding and reasoning model from Anthropic",
    provider: "Anthropic",
  },
];
