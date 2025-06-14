import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

export const myProvider = {
  languageModel: (modelId: string) => {
    switch (modelId) {
      case "claude-3-5-sonnet-20241022":
        return anthropic("claude-3-5-sonnet-20241022");
      case "claude-4-sonnet-20250514":
        return anthropic("claude-4-sonnet-20250514");
      case "gpt-4":
        return openai("gpt-4");
      case "gpt-4-turbo":
        return openai("gpt-4-turbo");
      case "chat-model-reasoning":
        return anthropic("claude-3-5-sonnet-20241022"); // fallback for reasoning model
      default:
        return anthropic("claude-3-5-sonnet-20241022");
    }
  },
};
