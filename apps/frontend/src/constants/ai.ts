import type { AIModel } from "@/app/types";
import { anthropic } from "@ai-sdk/anthropic";

export const DEFAULT_AI_MODEL = "claude-3-7-sonnet-20250219";

export const AI_MODELS: AIModel[] = [
  {
    value: "claude-3-7-sonnet-20250219",
    label: "Claude 3.7 Sonnet",
    description: "Coding and reasoning model from Anthropic",
    provider: "Anthropic",
    wrapper: anthropic,
  },
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    description: "Previous version of Anthropic's coding model",
    provider: "Anthropic",
    wrapper: anthropic,
  },
];
