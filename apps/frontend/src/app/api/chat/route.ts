import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: anthropic('claude-4-sonnet-20250514'),
      messages,
    });
    console.log('AI response:', result.text);

    return new Response(JSON.stringify({ text: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Server Error', { status: 500 });
  }
}
