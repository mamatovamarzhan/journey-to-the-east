"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "./google-button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/";
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: Values) {
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      setSubmitting(false);
      toast.error("Couldn't sign you in", { description: error.message });
      return;
    }
    toast.success("Welcome back");
    // router.refresh() so any Server Component reading the session updates.
    router.refresh();
    router.push(next);
  }

  return (
    <div className="space-y-6">
      <GoogleButton next={next} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-[0.2em]">
          <span className="bg-background px-3 text-muted-foreground">or with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="login-email" className="mb-1.5 block">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="pl-9"
              {...register("email")}
            />
          </div>
          {formState.errors.email && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="login-password" className="mb-1.5 block">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="pl-9"
              {...register("password")}
            />
          </div>
          {formState.errors.password && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.password.message}</p>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
          <LogIn className="h-4 w-4" />
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
