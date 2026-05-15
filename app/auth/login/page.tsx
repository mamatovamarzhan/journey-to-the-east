import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in — Journey to the East",
};

export default function LoginPage() {
  return (
    <AuthShell
      subtitle="Welcome back"
      title="Sign in to your account"
      side="Registan"
      cta={
        <>
          New here?{" "}
          <Link href="/auth/register" className="text-uz-terracotta font-medium hover:underline">
            Create an account →
          </Link>
        </>
      }
    >
      {/* LoginForm uses useSearchParams; Next requires a Suspense boundary. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
