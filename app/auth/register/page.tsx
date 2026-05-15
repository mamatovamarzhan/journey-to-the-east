import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create your account — Journey to the East",
};

export default function RegisterPage() {
  return (
    <AuthShell
      subtitle="Start here"
      title="Create your account"
      side="Bukhara"
      cta={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-uz-terracotta font-medium hover:underline">
            Sign in →
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
