"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, Compass, Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Tour } from "@/lib/tour-types";

import { StarterChips } from "./starter-chips";
import { MessageBubble } from "./message-bubble";
import { TourSummaryCard } from "./tour-summary-card";
import { BookingDialog } from "./booking-dialog";

export interface AccountInfo {
  email: string;
  name: string | null;
  telegram_username: string | null;
}

type Role = "user" | "assistant";
interface Msg {
  id: string;
  role: Role;
  content: string;
  /** Only set while the assistant message is streaming in. */
  streaming?: boolean;
  /** Carries a built tour. When set, MessageBubble renders the card. */
  tour?: Tour;
}

/**
 * The whole /chat experience. State is intentionally local — every page
 * load starts a fresh session. Persistence to `ai_conversations` is a
 * later enhancement.
 */
export function ChatUI({ account }: { account: AccountInfo | null }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [buildingTour, setBuildingTour] = useState(false);
  const [bookingFor, setBookingFor] = useState<Tour | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom as new content streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // True once any assistant message has invited the user to build a tour.
  // The system prompt tells Gemini to say "click 'Build my tour'" when
  // ready — we surface the button once the magic phrase appears.
  const tourReady = messages.some(
    (m) => m.role === "assistant" && /build (my )?tour/i.test(m.content)
  );
  const alreadyHaveTour = messages.some((m) => m.tour);

  const submit = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride ?? input).trim();
      if (!text || sending) return;

      setInput("");
      setSending(true);

      // Append the user message + an empty streaming assistant placeholder.
      const userMsg: Msg = { id: rid(), role: "user", content: text };
      const aiMsg: Msg = { id: rid(), role: "assistant", content: "", streaming: true };
      // Capture the full conversation we'll send, including the new user turn.
      const upTo: Msg[] = [...messages, userMsg];
      setMessages([...upTo, aiMsg]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: upTo.map((m) => ({ role: m.role, content: m.content })),
            user_id: undefined, // wire through once we persist conversations
          }),
        });
        if (!res.ok || !res.body) {
          const errText = await res.text().catch(() => "");
          throw new Error(errText || `Chat HTTP ${res.status}`);
        }

        // Stream chunks into the placeholder.
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          // Update in-place using functional setState to avoid races.
          setMessages((curr) =>
            curr.map((m) =>
              m.id === aiMsg.id ? { ...m, content: accumulated } : m
            )
          );
        }
        // Mark streaming complete.
        setMessages((curr) =>
          curr.map((m) =>
            m.id === aiMsg.id ? { ...m, streaming: false } : m
          )
        );
      } catch (e) {
        setMessages((curr) =>
          curr.map((m) =>
            m.id === aiMsg.id
              ? {
                  ...m,
                  streaming: false,
                  content:
                    "Sorry — I couldn't reach the planner just now. Make sure the Python service is running on the configured PYTHON_SERVICE_URL and try again.",
                }
              : m
          )
        );
        toast.error(e instanceof Error ? e.message : "Chat failed");
      } finally {
        setSending(false);
      }
    },
    [input, sending, messages]
  );

  async function onBuildTour() {
    if (buildingTour) return;
    setBuildingTour(true);
    const placeholder: Msg = {
      id: rid(),
      role: "assistant",
      content: "Putting your itinerary together…",
      streaming: true,
    };
    setMessages((curr) => [...curr, placeholder]);
    try {
      const res = await fetch("/api/build-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? j?.detail ?? `HTTP ${res.status}`);
      }
      const tour = (await res.json()) as Tour;
      setMessages((curr) =>
        curr.map((m) =>
          m.id === placeholder.id
            ? {
                ...m,
                streaming: false,
                content: `Here's a draft. Have a look and confirm when you're ready.`,
                tour,
              }
            : m
        )
      );
    } catch (e) {
      setMessages((curr) =>
        curr.map((m) =>
          m.id === placeholder.id
            ? {
                ...m,
                streaming: false,
                content: `I couldn't build the tour: ${e instanceof Error ? e.message : "unknown error"}`,
              }
            : m
        )
      );
    } finally {
      setBuildingTour(false);
    }
  }

  return (
    <section className="container-editorial pt-28 md:pt-36 pb-32 max-w-4xl">
      {/* Editorial header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-uz-turquoise text-uz-cream inline-flex items-center justify-center shadow-warm">
            <Compass className="h-5 w-5 text-uz-ochre" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              AI Concierge
            </p>
            <h1 className="font-serif text-2xl md:text-3xl tracking-tight">
              Plan your Uzbekistan trip
            </h1>
          </div>
        </div>
        {!account && (
          <Badge variant="terracotta" className="hidden sm:inline-flex">
            Sign in to save trips
          </Badge>
        )}
      </div>

      {/* Conversation area */}
      <div
        ref={scrollRef}
        className="rounded-3xl border border-border bg-uz-cream-deep/30 dark:bg-uz-ultramarine-soft/30 p-4 md:p-6 max-h-[64vh] overflow-y-auto scroll-smooth"
      >
        {messages.length === 0 ? (
          <EmptyState onPick={(t) => submit(t)} />
        ) : (
          <div className="space-y-5">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <MessageBubble role={m.role} streaming={!!m.streaming}>
                    {m.tour ? (
                      <TourSummaryCard
                        tour={m.tour}
                        onConfirm={() => setBookingFor(m.tour!)}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{m.content || (m.streaming ? "…" : "")}</p>
                    )}
                  </MessageBubble>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Build-tour CTA */}
      {tourReady && !alreadyHaveTour && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="ochre"
            size="lg"
            onClick={onBuildTour}
            disabled={buildingTour}
          >
            {buildingTour ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
            {buildingTour ? "Building your tour…" : "Build my tour"}
          </Button>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mt-4 flex items-end gap-3 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            // Cmd/Ctrl+Enter → submit. Plain Enter sends too unless Shift is held.
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder={
            messages.length === 0
              ? "Tell me about your trip… or pick a starter above."
              : "Type your reply…"
          }
          className="flex-1 resize-none bg-transparent px-3 py-2 text-base outline-none placeholder:text-muted-foreground max-h-40"
        />
        <Button type="submit" variant="terracotta" size="md" disabled={sending || !input.trim()}>
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </Button>
      </form>

      {/* Booking modal */}
      <BookingDialog
        open={!!bookingFor}
        tour={bookingFor}
        account={account}
        onClose={() => setBookingFor(null)}
      />
    </section>
  );
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="py-10 px-2 md:px-6 text-center">
      <Sparkles className="h-7 w-7 text-uz-ochre mx-auto mb-3" />
      <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-2">
        Welcome, traveller.
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
        Tell me where you're flying from, how many days you have, and what
        kind of trip you're picturing. I'll handle the rest.
      </p>
      <StarterChips onPick={onPick} />
      <p className="mt-8 text-xs text-muted-foreground">
        Or jump straight in —{" "}
        <Link href="/cities" className="text-uz-terracotta hover:underline">
          browse the cities first
        </Link>{" "}
        if you'd like context.
      </p>
    </div>
  );
}

function rid() {
  return Math.random().toString(36).slice(2, 10);
}
