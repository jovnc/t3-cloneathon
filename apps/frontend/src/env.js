import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // Environment variables available on the server-side only.
  // Will throw an error if accessed on the client.
  server: {},

  // Environment variables available on the client-side (and server-side).
  // Must be prefixed with NEXT_PUBLIC_.
  client: {},

  // Environment variables that are available both on the server and client.
  runtimeEnv: {},

  // Skip validation during build if certain variables are dynamically set at runtime post-build.
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  // Called when server variables are accessed on the client.
  onClientAccessError: (error) => {
    console.error(
      "❌ Attempted to access server-side environment variable on the client",
      error
    );
    throw new Error(
      "❌ Attempted to access server-side environment variable on the client"
    );
  },

  // Called when an environment variable is invalid.
  onValidationError: (error) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    throw new Error("❌ Invalid environment variables. Check your.env file.");
  },
});
