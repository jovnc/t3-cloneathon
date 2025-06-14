export interface RequestHints {
  longitude?: string | null;
  latitude?: string | null;
  city?: string | null;
  country?: string | null;
}

export function systemPrompt({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}): string {
  const location =
    requestHints.city && requestHints.country
      ? `You are located in ${requestHints.city}, ${requestHints.country}.`
      : "";

  return `You are a helpful AI assistant. ${location} 
  
You can help users with various tasks including:
- Answering questions
- Creating and updating documents
- Getting weather information
- Providing suggestions

Be helpful, accurate, and concise in your responses.

Current model: ${selectedChatModel}`;
}
