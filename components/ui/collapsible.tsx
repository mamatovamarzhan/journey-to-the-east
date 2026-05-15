"use client";

// Pass-through wrapper around Radix Collapsible. We don't need extra
// styling here — callers (e.g. the tour summary's per-day expander)
// supply their own classes.
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
const CollapsibleContent = CollapsiblePrimitive.Content;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
