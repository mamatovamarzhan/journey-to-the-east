import type { Metadata } from "next";

import { requireUser, getMyProfile } from "@/lib/auth";
import { ProfileEditor } from "@/components/auth/profile-editor";

export const metadata: Metadata = {
  title: "Profile — Journey to the East",
};

export default async function ProfilePage() {
  const user = await requireUser("/auth/profile");
  const profile = await getMyProfile();

  return (
    <section className="container-editorial pt-32 pb-24 md:pt-40">
      <p className="font-script text-2xl text-uz-terracotta mb-3">Your account</p>
      <h1 className="font-serif text-5xl md:text-6xl tracking-tight mb-10">
        Profile
      </h1>

      <ProfileEditor
        user={{ id: user.id, email: user.email ?? "" }}
        profile={profile}
      />
    </section>
  );
}
