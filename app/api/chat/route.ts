import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: [{ role: "user", content: message }],
    })

    const text = result

    return new Response(JSON.stringify({ reply: text }), {
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

