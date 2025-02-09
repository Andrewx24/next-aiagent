import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { message } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "OpenAI API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [{ role: "user", content: message }],
    })

    const text = await result.text

    return new Response(JSON.stringify({ reply: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error:", error)
    const errorMessage = (error as Error).message || "An error occurred while processing your request"
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

