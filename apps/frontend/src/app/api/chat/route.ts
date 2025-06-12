import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: openai('gpt-4o'),
      messages,
    });

    return new Response(JSON.stringify({ text: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Server Error', { status: 500 });
  }
}
