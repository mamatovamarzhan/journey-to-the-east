// POST /api/chat — streams Gemini's response back to the browser.
//
// Now calls the Gemini API directly via @google/generative-ai (we used to
// proxy to a Python FastAPI service; the Python service is being retired).
// The route stays the same so the chat UI doesn't need to change.

import { NextResponse, type NextRequest } from "next/server";
import { GoogleGenerativeAI, type Content } from "@google/generative-ai";

import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

// nodejs runtime — needed for streaming via ReadableStream + the SDK's
// async iterator. Edge runtime sometimes truncates long responses.
export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  user_id?: string;
}

const MODEL_ID = "gemini-2.5-flash";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured." },
      { status: 503 }
    );
  }

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.messages?.length) {
    return NextResponse.json({ error: "At least one message required" }, { status: 400 });
  }
  if (body.messages[body.messages.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "Last message must be from the user" },
      { status: 400 }
    );
  }

  // Build Gemini-shaped history (everything except the last user turn),
  // then send the last turn as the new message to keep the stream open.
  const history: Content[] = body.messages.slice(0, -1).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));
  const lastMessage = body.messages[body.messages.length - 1].content;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_ID,
    systemInstruction: SYSTEM_PROMPT,
  });

  // Pipe Gemini's async iterator into a Web ReadableStream of UTF-8 bytes.
  // The chat UI on the client reads response.body as a stream and appends
  // chunks to the in-progress assistant bubble.
  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(lastMessage);
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (e) {
        const msg = `\n\n[stream error: ${e instanceof Error ? e.message : String(e)}]`;
        controller.enqueue(encoder.encode(msg));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
    },
  });
}
