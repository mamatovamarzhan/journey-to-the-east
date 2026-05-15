"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, Save, AtSign, User as UserIcon } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/db-types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().max(60).optional().or(z.literal("")),
  bio: z.string().max(280).optional().or(z.literal("")),
  telegram_username: z
    .string()
    .max(32)
    .regex(/^[a-zA-Z0-9_]*$/, "Letters, numbers, and underscores only")
    .optional()
    .or(z.literal("")),
});
type Values = z.infer<typeof schema>;

/**
 * Profile editor. Avatar upload writes to the `avatars/` bucket
 * (created in 0002_avatars_bucket.sql) under the user's UUID, then
 * updates profiles.avatar_url with the public URL.
 */
export function ProfileEditor({
  user,
  profile,
}: {
  user: { id: string; email: string };
  profile: Profile | null;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? null);
  const [uploading, setUploading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function onSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setSigningOut(false);
      toast.error("Sign-out failed", { description: error.message });
      return;
    }
    // Hard navigate so the layout re-renders without our session.
    window.location.href = "/";
  }

  const { register, handleSubmit, formState } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile?.name ?? "",
      bio: profile?.bio ?? "",
      telegram_username: profile?.telegram_username ?? "",
    },
  });

  async function onSubmit(values: Values) {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        name: values.name || null,
        bio: values.bio || null,
        telegram_username: values.telegram_username || null,
      })
      .eq("user_id", user.id);
    if (error) {
      toast.error("Couldn't save profile", { description: error.message });
      return;
    }
    toast.success("Profile saved");
    startTransition(() => router.refresh());
  }

  async function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please pick an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Avatar must be under 4 MB");
      return;
    }

    setUploading(true);
    const supabase = createClient();
    // One folder per user; allows overwriting via upsert.
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, cacheControl: "3600" });
    if (upErr) {
      setUploading(false);
      toast.error("Upload failed", { description: upErr.message });
      return;
    }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const newUrl = pub.publicUrl;

    const { error: profileErr } = await supabase
      .from("profiles")
      .update({ avatar_url: newUrl })
      .eq("user_id", user.id);
    setUploading(false);
    if (profileErr) {
      toast.error("Saved the file but couldn't update profile", { description: profileErr.message });
      return;
    }
    setAvatarUrl(newUrl);
    toast.success("Avatar updated");
    startTransition(() => router.refresh());
  }

  const initials =
    (profile?.name ?? user.email)
      .split(/[\s@]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "JE";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
      {/* Avatar */}
      <div className="flex flex-col items-center text-center">
        <div className="relative group">
          <Avatar className="h-40 w-40">
            {avatarUrl && <AvatarImage src={avatarUrl} alt="Your avatar" />}
            <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
          </Avatar>
          <label className="absolute inset-0 cursor-pointer flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="h-7 w-7 text-uz-cream" />
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onAvatarChange}
              disabled={uploading}
            />
          </label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{user.email}</p>
        {uploading && (
          <p className="mt-2 text-xs text-uz-terracotta">Uploading…</p>
        )}
        <p className="mt-3 text-xs text-muted-foreground max-w-[200px]">
          Click your avatar to upload a new one. JPG / PNG, up to 4 MB.
        </p>
      </div>

      {/* Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl" noValidate>
        <div>
          <Label htmlFor="prof-name" className="mb-1.5 block">Display name</Label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="prof-name" placeholder="Marzhan" className="pl-9" {...register("name")} />
          </div>
          {formState.errors.name && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="prof-bio" className="mb-1.5 block">
            Bio
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              (shows up on the stories you publish)
            </span>
          </Label>
          <textarea
            id="prof-bio"
            rows={3}
            placeholder="Tea-drinker, slow traveler, occasional photographer."
            className="flex w-full rounded-lg border border-input bg-card px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent transition-colors"
            {...register("bio")}
          />
          {formState.errors.bio && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.bio.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="prof-tg" className="mb-1.5 block">
            Telegram username
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              (for booking confirmations — without the @)
            </span>
          </Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="prof-tg" placeholder="silkroadtraveler" className="pl-9" {...register("telegram_username")} />
          </div>
          {formState.errors.telegram_username && (
            <p className="mt-1 text-xs text-uz-terracotta">{formState.errors.telegram_username.message}</p>
          )}
        </div>

        <div className="pt-4 border-t border-border flex items-center gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={formState.isSubmitting}>
            <Save className="h-4 w-4" />
            {formState.isSubmitting ? "Saving…" : "Save changes"}
          </Button>
          {/* type="button" so it doesn't submit the parent form; calls
              supabase.auth.signOut() in JS and then hard-navigates so the
              server picks up the cleared session cookie. */}
          <Button type="button" variant="ghost" size="lg" onClick={onSignOut}>
            Sign out
          </Button>
        </div>
      </form>
    </div>
  );
}
