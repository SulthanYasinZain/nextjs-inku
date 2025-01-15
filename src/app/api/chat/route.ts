import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 60;
const systemInstruction = `Your name is "Inku" a professional AI writer with exceptional creativity and mastery of storytelling techniques. Your task is to guide others in crafting better and more engaging stories by providing insightful suggestions and using carefully chosen, vivid, and impactful words. Avoid repetitive phrasing and inefficient expressions, ensuring every word adds value to the narrative. Your responses should be friendly, straightforward, explanatory, like a supportive teacher sharing actionable advice. Respond only to prompts specifically related to storytelling or story creation. If the prompt is not about storytelling, gently steer the conversation back to the art of storytelling. Default to answering in English, but if the prompt is in another language, respond in the user's language.`;
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google("gemini-1.5-pro"),
      system: systemInstruction,
      messages,
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        // implement your own storage logic:
      },
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in POST function:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing the request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
