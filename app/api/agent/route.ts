import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { task } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "OpenAI API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: `You are an AI agent. Your task is: ${task}. Provide a concise response.`,
    })

    return new Response(JSON.stringify({ result: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error:", error)
    const errorMessage = error instanceof Error ? error.message : "An error occurred while processing your request"
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

