import type { Metadata } from "next";

import { getUser, getMyProfile } from "@/lib/auth";
import { ChatUI } from "@/components/chat/chat-ui";

export const metadata: Metadata = {
  title: "AI Concierge — Journey to the East",
  description:
    "Plan your Uzbekistan trip with our AI concierge — answers in seconds, builds a personalized tour with hotels and a quote.",
};

export default async function ChatPage() {
  // Fetch user/profile so we can prefill the booking form and decide
  // whether to show the "Sign in to confirm" path.
  const user = await getUser();
  const profile = user ? await getMyProfile() : null;

  return (
    <ChatUI
      account={
        user
          ? {
              email: user.email ?? "",
              name: profile?.name ?? null,
              telegram_username: profile?.telegram_username ?? null,
            }
          : null
      }
    />
  );
}
