import { streamText, type UIMessage } from "ai";
import type { NextRequest } from "next/server";
import { getModelFromSelection } from "@/lib/ai/providers";

interface Payload {
  id: string;
  messages: UIMessage[];
  selectedChatModel: string;
}

export async function POST(req: NextRequest) {
  try {
    const response: Payload = await req.json();
    const { messages, selectedChatModel } = response;
    console.log(selectedChatModel);

    const result = await streamText({
      model: getModelFromSelection(selectedChatModel),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response("Server Error", { status: 500 });
  }
}
