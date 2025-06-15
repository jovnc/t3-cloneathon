import type { AnthropicProvider } from "@ai-sdk/anthropic";
import type { OpenAIProvider } from "@ai-sdk/openai";

export interface ModelCapability {
  type: "vision" | "search" | "documents" | "reasoning" | "image-generation"
  label: string
  icon: any
  color: string
}

export type AIModel = {
  label: string;
  value: string;
  description: string;
  provider: string;
  wrapper: AnthropicProvider | OpenAIProvider;
  capabilities: (ModelCapability | undefined)[]
  available: boolean
};
