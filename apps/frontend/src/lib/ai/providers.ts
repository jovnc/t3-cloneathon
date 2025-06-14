import { AI_MODELS } from "@/constants";
import type { LanguageModelV1 } from "ai";

export const getModelFromSelection = (selection: string): LanguageModelV1 => {
  const res = AI_MODELS.find((model) => model.value === selection);
  if (!res) {
    throw new Error(`Model with value ${selection} not found`);
  }
  const { wrapper, value } = res;
  return wrapper(value);
};
