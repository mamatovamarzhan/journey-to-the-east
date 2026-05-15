// POST /api/build-tour — calls Gemini's structured-output mode and returns
// a typed Tour JSON object the chat UI renders as the "Tour Summary" card.
//
// Like /api/chat, this used to proxy to a Python service. We now call
// the Gemini SDK directly.

import { NextResponse, type NextRequest } from "next/server";
import {
  GoogleGenerativeAI,
  SchemaType,
  type Schema,
} from "@google/generative-ai";

import { SYSTEM_PROMPT, BUILD_TOUR_INSTRUCTIONS } from "@/lib/ai/system-prompt";
import type { Tour } from "@/lib/tour-types";

export const runtime = "nodejs";

const MODEL_ID = "gemini-2.5-flash";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface BuildTourRequest {
  messages: ChatMessage[];
}

// Gemini's structured-output schema — mirrors lib/tour-types.ts and the
// _TOUR_SCHEMA we used to ship in python-service/main.py. Each field has
// a description; the model uses these to fill values correctly.
const TOUR_SCHEMA: Schema = {
  type: SchemaType.OBJECT,
  required: [
    "title", "days", "travelers", "style", "cities",
    "days_plan", "breakdown", "totalUsd",
  ],
  properties: {
    title: {
      type: SchemaType.STRING,
      description: "Short editorial title, e.g. 'Silk Road in 7 Days for two'.",
    },
    days: { type: SchemaType.INTEGER },
    travelers: { type: SchemaType.INTEGER },
    style: {
      type: SchemaType.STRING,
      format: "enum",
      enum: ["Budget", "Standard", "Luxury"],
    },
    cities: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description:
        "Lowercase slugs only: samarkand, bukhara, khiva, tashkent, fergana.",
    },
    days_plan: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        required: ["day", "city", "title", "summary"],
        properties: {
          day: { type: SchemaType.INTEGER },
          city: { type: SchemaType.STRING },
          title: {
            type: SchemaType.STRING,
            description: "Headline for the day, e.g. 'Registan + the Timurid heart'.",
          },
          summary: {
            type: SchemaType.STRING,
            description: "2–3 sentence narrative of the day.",
          },
          stay: {
            type: SchemaType.STRING,
            description: "Hotel name from the context.",
          },
        },
      },
    },
    breakdown: {
      type: SchemaType.OBJECT,
      required: ["flights", "transport", "lodging", "food", "activities", "reserve"],
      properties: {
        flights: { type: SchemaType.INTEGER, description: "USD round-trip for all travelers" },
        transport: { type: SchemaType.INTEGER, description: "USD intra-Uzbekistan, total" },
        lodging: { type: SchemaType.INTEGER, description: "USD, sum across all nights" },
        food: { type: SchemaType.INTEGER, description: "USD, total for the group" },
        activities: { type: SchemaType.INTEGER },
        reserve: { type: SchemaType.INTEGER, description: "10% buffer of subtotal" },
      },
    },
    totalUsd: { type: SchemaType.INTEGER, description: "Sum of all breakdown lines." },
  },
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured." },
      { status: 503 }
    );
  }

  let body: BuildTourRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.messages?.length) {
    return NextResponse.json({ error: "Need at least one message" }, { status: 400 });
  }

  // Stitch the conversation into one prompt — Gemini's structured-output
  // mode behaves more reliably with a single user message than with a
  // multi-turn chat session.
  const transcript = body.messages
    .map((m) => `${m.role === "user" ? "USER" : "CONCIERGE"}: ${m.content}`)
    .join("\n");
  const fullPrompt =
    SYSTEM_PROMPT +
    "\n\n# CONVERSATION SO FAR\n" +
    transcript +
    "\n\n# YOUR TASK\n" +
    BUILD_TOUR_INSTRUCTIONS;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_ID });

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: TOUR_SCHEMA,
        temperature: 0.4,
      },
    });
    const text = result.response.text();
    const parsed = JSON.parse(text) as Tour;
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json(
      {
        error: "Tour generation failed",
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}
