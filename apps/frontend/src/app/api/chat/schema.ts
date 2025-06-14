import { z } from "zod";

export const postRequestBodySchema = z.object({
  id: z.string(),
  message: z.object({
    id: z.string(),
    role: z.string(),
    parts: z.any(),
    experimental_attachments: z.array(z.any()).optional(),
  }),
  selectedChatModel: z.string(),
  selectedVisibilityType: z.enum(["public", "private"]),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
