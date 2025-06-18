/**
 * Utility functions for managing OpenRouter API key
 */

export const API_KEY_STORAGE_KEY = "openrouter_api_key";

/**
 * Get the OpenRouter API key from localStorage
 */
export function getOpenRouterApiKey(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

/**
 * Set the OpenRouter API key in localStorage
 */
export function setOpenRouterApiKey(apiKey: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

/**
 * Remove the OpenRouter API key from localStorage
 */
export function removeOpenRouterApiKey(): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

/**
 * Check if the OpenRouter API key exists
 */
export function hasOpenRouterApiKey(): boolean {
  return !!getOpenRouterApiKey();
}
