import { AI_MODELS } from "@/constants";
import type { LanguageModelV1 } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const getModelFromSelection = (selection: string, api: string): LanguageModelV1 => {
  const res = AI_MODELS.find((model) => model.value === selection);
  if (!res) {
    throw new Error(`Model with value ${selection} not found`);
  }

  const openrouter = createOpenRouter({
    apiKey: api
  });

  const { value } = res;
  return openrouter.chat(value);
};
