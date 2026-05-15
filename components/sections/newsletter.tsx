"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});
type FormValues = z.infer<typeof schema>;

/**
 * Newsletter signup. Right now this just shows a success toast and resets —
 * once we have a real list (or hook into Resend Audiences), we'll swap the
 * onSubmit body.
 */
export function Newsletter() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    // Simulate a network round-trip so the loading state feels real.
    await new Promise((r) => setTimeout(r, 600));
    toast.success("You're on the list", {
      description: `We'll send the next dispatch to ${values.email} — likely once a month.`,
    });
    reset();
    setSubmitting(false);
  }

  return (
    <section className="container-editorial pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl overflow-hidden bg-uz-turquoise text-uz-cream relative"
      >
        {/* Soft ochre flourish */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-uz-ochre/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-uz-terracotta/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-8 md:px-14 py-14 md:py-20 items-center">
          <div>
            <p className="font-script text-2xl text-uz-ochre mb-2">Stay in touch</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
              A monthly dispatch from the Silk Road.
            </h2>
            <p className="text-uz-cream/85 max-w-lg leading-relaxed">
              Curated reading, photo essays, and quietly excellent restaurant
              tips. One email a month, never spam, unsubscribe in a click.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
            noValidate
          >
            <Label htmlFor="newsletter-email" className="text-uz-cream/90">
              Your email
            </Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-uz-charcoal/50" />
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="pl-9 h-12 bg-uz-cream text-uz-charcoal"
                  {...register("email")}
                />
              </div>
              <Button
                type="submit"
                variant="terracotta"
                size="lg"
                disabled={submitting}
              >
                <Send className="h-4 w-4" />
                {submitting ? "Sending…" : "Subscribe"}
              </Button>
            </div>
            {formState.errors.email && (
              <p className="text-sm text-uz-ochre-soft">
                {formState.errors.email.message}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
}
