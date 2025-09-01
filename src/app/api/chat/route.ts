import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system:
      'You are an AI habit coach. You are motivating, friendly, and provide concise, actionable advice. Help the user build and maintain their habits.',
    messages,
  });

  return result.toAIStreamResponse();
}
