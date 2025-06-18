// import type { AnthropicProvider } from "@ai-sdk/anthropic";
// import type { OpenAIProvider } from "@ai-sdk/openai";
import type { OpenRouterProvider } from "@openrouter/ai-sdk-provider";

export interface ModelCapability {
  type: "vision" | "search" | "documents" | "reasoning" | "image-generation";
  label: string;
  icon: any;
  color: string;
}

export type AIModel = {
  label: string;
  value: string;
  description: string;
  provider: string;
  icon: any;
  capabilities: (ModelCapability | undefined)[];
  available: boolean;
};
