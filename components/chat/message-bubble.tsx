"use client";

import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Single chat bubble. User messages are deep-turquoise pills right-aligned;
 * assistant messages get a small compass avatar + cream-deep background with
 * a terracotta accent stripe on the left.
 */
export function MessageBubble({
  role,
  streaming,
  children,
}: {
  role: "user" | "assistant";
  streaming: boolean;
  children: React.ReactNode;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-uz-turquoise text-uz-cream px-4 py-3 shadow-sm">
          <div className="text-[15px] leading-relaxed">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 h-9 w-9 rounded-full bg-uz-ultramarine inline-flex items-center justify-center mt-1">
        <Compass className="h-4 w-4 text-uz-ochre" />
      </div>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl rounded-tl-md bg-uz-cream text-uz-charcoal dark:bg-uz-cream/95 px-4 py-3 shadow-sm border-l-2 border-uz-terracotta",
          streaming && "after:content-['▍'] after:ml-1 after:animate-pulse"
        )}
      >
        <div className="text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
