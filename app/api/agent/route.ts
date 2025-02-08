import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { task } = await req.json()

  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: `You are an AI agent. Your task is: ${task}. Provide a concise response.`,
    })

    return new Response(JSON.stringify({ result: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error:", error)
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

