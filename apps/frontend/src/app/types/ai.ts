import type { AnthropicProvider } from "@ai-sdk/anthropic";
import type { OpenAIProvider } from "@ai-sdk/openai";

export type AIModel = {
  label: string;
  value: string;
  description: string;
  provider: string;
  wrapper: AnthropicProvider | OpenAIProvider;
};
