"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Lock, User, UserPlus } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "./google-button";

const schema = z.object({
  name: z.string().min(1, "Your name, please").max(60),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
type Values = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/";
  const [submitting, setSubmitting] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: Values) {
    setSubmitting(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        // Stored in auth.users.raw_user_meta_data; the handle_new_user
        // trigger reads it to seed the profiles.name field.
        data: { name: values.name },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setSubmitting(false);

    if (error) {
      toast.error("Couldn't create your account", { description: error.message });
      return;
    }

    // If the project has email confirmation enabled, the user must click
    // a verification link before they can sign in. data.session is null
    // in that case — show a "check your inbox" state.
    if (!data.session) {
      setEmailToVerify(values.email);
      return;
    }

    toast.success("Welcome to Journey to the East");
    router.refresh();
    router.push(next);
  }

  if (emailToVerify) {
    return (
      <div className="rounded-2xl border border-uz-ochre/30 bg-uz-ochre/10 p-6">
        <h3 className="font-serif text-2xl mb-2">Check your inbox</h3>
        <p className="text-muted-foreground leading-relaxed">
          We sent a verification link to{" "}
          <span className="font-medium text-foreground">{emailToVerify}</span>.
          Open the email and click the link to finish creating your account.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          (If you don't see it in 30 seconds, check your spam folder.)
        </p>
      </div>
    );
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
          <Label htmlFor="reg-name" className="mb-1.5 block">Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="reg-name" autoComplete="name" placeholder="Marzhan" className="pl-9" {...register("name")} />
          </div>
          {formState.errors.name && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="reg-email" className="mb-1.5 block">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="reg-email" type="email" autoComplete="email" placeholder="you@example.com" className="pl-9" {...register("email")} />
          </div>
          {formState.errors.email && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="reg-password" className="mb-1.5 block">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="reg-password" type="password" autoComplete="new-password" placeholder="At least 6 characters" className="pl-9" {...register("password")} />
          </div>
          {formState.errors.password && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.password.message}</p>
          )}
        </div>

        <Button type="submit" variant="terracotta" size="lg" className="w-full" disabled={submitting}>
          <UserPlus className="h-4 w-4" />
          {submitting ? "Creating your account…" : "Create account"}
        </Button>
      </form>
    </div>
  );
}
