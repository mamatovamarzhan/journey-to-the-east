"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  AtSign,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Send,
  User as UserIcon,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/lib/tour-types";
import type { AccountInfo } from "./chat-ui";

const schema = z.object({
  full_name: z.string().min(1, "Required").max(120),
  phone: z.string().max(40).optional(),
  channel: z.enum(["email", "telegram", "both"]),
  telegram_username: z.string().max(40).optional(),
}).superRefine((val, ctx) => {
  if ((val.channel === "telegram" || val.channel === "both") && !val.telegram_username?.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["telegram_username"],
      message: "Telegram username is required for that channel.",
    });
  }
});
type Values = z.infer<typeof schema>;

/**
 * Booking confirmation modal. Three states:
 *   • Signed-out → mini sign-in panel
 *   • Form     → collect contact info + channel
 *   • Success  → show reference + next-steps
 */
export function BookingDialog({
  open,
  tour,
  account,
  onClose,
}: {
  open: boolean;
  tour: Tour | null;
  account: AccountInfo | null;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    reference: string;
    notifications: { channel: string; ok: boolean; error?: string }[];
  } | null>(null);

  const { register, handleSubmit, watch, formState, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: account?.name ?? "",
      phone: "",
      channel: "email",
      telegram_username: account?.telegram_username ?? "",
    },
  });

  // Reset state every time the dialog opens so re-bookings start clean.
  useEffect(() => {
    if (open) {
      setResult(null);
      reset({
        full_name: account?.name ?? "",
        phone: "",
        channel: "email",
        telegram_username: account?.telegram_username ?? "",
      });
    }
  }, [open, account, reset]);

  const channel = watch("channel");
  const usesTelegram = channel === "telegram" || channel === "both";

  async function onSubmit(values: Values) {
    if (!tour) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: values.full_name,
          phone: values.phone || null,
          notification_channel: values.channel,
          telegram_username: values.telegram_username ?? null,
          tour,
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error ?? `HTTP ${res.status}`);
      setResult(j);
      // Some notification channels may have failed even when the booking
      // saved — surface those as toasts so the user knows.
      for (const n of j.notifications ?? []) {
        if (!n.ok) toast.error(`${n.channel}: ${n.error}`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        {/* ─── Success state ─── */}
        {result ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-uz-terracotta" />
                Booking confirmed
              </DialogTitle>
              <DialogDescription>
                Your reference is{" "}
                <span className="font-mono font-medium text-foreground tracking-wider">
                  {result.reference}
                </span>
                . We'll follow up within one business day to confirm flights
                and hotels.
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-uz-cream-deep/50 dark:bg-uz-ultramarine-soft/40 p-4 text-sm">
              <p className="text-muted-foreground mb-2">Notifications sent:</p>
              <ul className="space-y-1">
                {(result.notifications ?? []).map((n) => (
                  <li
                    key={n.channel}
                    className={n.ok ? "text-foreground/85" : "text-uz-terracotta"}
                  >
                    {n.ok ? "✓" : "✗"} {n.channel}
                    {n.error ? ` — ${n.error}` : ""}
                  </li>
                ))}
              </ul>
            </div>
            <DialogFooter>
              <Button asChild variant="outline">
                <Link href="/my-bookings">View all bookings</Link>
              </Button>
              <Button variant="terracotta" onClick={onClose}>
                Done
              </Button>
            </DialogFooter>
          </>
        ) : !account ? (
          /* ─── Signed-out state ─── */
          <>
            <DialogHeader>
              <DialogTitle>Sign in to confirm</DialogTitle>
              <DialogDescription>
                Create an account or sign in — it takes 20 seconds, and lets
                us send you the confirmation and find this booking later.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button asChild variant="outline">
                <Link href="/auth/register?next=/chat">Create account</Link>
              </Button>
              <Button asChild variant="terracotta">
                <Link href="/auth/login?next=/chat">Sign in</Link>
              </Button>
            </DialogFooter>
          </>
        ) : (
          /* ─── Form state ─── */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <DialogHeader>
              <DialogTitle>Confirm your booking</DialogTitle>
              <DialogDescription>
                A couple of details so we can reach you.
              </DialogDescription>
            </DialogHeader>

            <div>
              <Label htmlFor="bk-name" className="mb-1.5 block">Full name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="bk-name" placeholder="Marzhan Mamatova" className="pl-9" {...register("full_name")} />
              </div>
              {formState.errors.full_name && (
                <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.full_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="bk-phone" className="mb-1.5 block">
                Phone <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="bk-phone" placeholder="+7 ..." className="pl-9" {...register("phone")} />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">How should we notify you?</Label>
              <RadioGroup defaultValue="email" className="grid grid-cols-1 gap-2">
                <ChannelOption value="email" label="Email" hint={account.email} icon={Mail} register={register} />
                <ChannelOption
                  value="telegram"
                  label="Telegram"
                  hint="Instant message from our bot"
                  icon={AtSign}
                  register={register}
                />
                <ChannelOption
                  value="both"
                  label="Email + Telegram"
                  hint="Belt and braces"
                  icon={Send}
                  register={register}
                />
              </RadioGroup>
            </div>

            {usesTelegram && (
              <div className="rounded-xl bg-uz-ochre/10 border border-uz-ochre/30 p-4">
                <Label htmlFor="bk-tg" className="mb-1.5 block">
                  Telegram username
                  <span className="ml-2 text-xs text-muted-foreground font-normal">(without @)</span>
                </Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="bk-tg" placeholder="silkroadtraveler" className="pl-9 bg-card" {...register("telegram_username")} />
                </div>
                {formState.errors.telegram_username && (
                  <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.telegram_username.message}</p>
                )}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">First:</strong> open Telegram and send <code className="px-1 rounded bg-uz-cream-deep/60 text-foreground">/start</code> to{" "}
                  <a
                    href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "JourneyEastTravel_bot"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-uz-terracotta font-medium hover:underline"
                  >
                    @{process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "JourneyEastTravel_bot"}
                  </a>
                  . Then enter your username here and submit.
                </p>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="terracotta" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                {submitting ? "Confirming…" : "Confirm booking"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Custom radio-card so the channel choice is a click target with a label
// and a short description (more delightful than a bare radio dot).
function ChannelOption({
  value,
  label,
  hint,
  icon: Icon,
  register,
}: {
  value: string;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  register: ReturnType<typeof useForm<Values>>["register"];
}) {
  return (
    <Label
      htmlFor={`ch-${value}`}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer hover:border-uz-terracotta/40 transition-colors has-[input:checked]:border-uz-terracotta has-[input:checked]:bg-uz-terracotta/5"
    >
      <RadioGroupItem id={`ch-${value}`} value={value} {...register("channel")} />
      <Icon className="h-4 w-4 text-uz-terracotta" />
      <span className="flex-1">
        <span className="block font-medium text-sm">{label}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
    </Label>
  );
}
