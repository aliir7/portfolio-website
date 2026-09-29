"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const errorParam = searchParams.get("error");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(
    errorParam ? "لینک بازیابی نامعتبر یا منقضی شده است." : "",
  );
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("لینک بازیابی نامعتبر یا منقضی شده است.");
      return;
    }

    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }

    if (password !== confirmPassword) {
      setError("تکرار رمز عبور با رمز عبور یکسان نیست.");
      return;
    }

    setPending(true);

    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    setPending(false);

    if (resetError) {
      setError(resetError.message || "بازیابی رمز عبور انجام نشد.");
      return;
    }

    router.push("/login?reset=success");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="bg-card border-border/60 w-full max-w-md rounded-3xl border p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-primary mb-2 text-sm font-medium">مدیریت سایت</p>
          <h1 className="text-3xl font-black">تغییر رمز عبور</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            رمز عبور جدید خود را وارد کنید.
          </p>
        </div>

        {error && (
          <p className="bg-destructive/10 text-destructive mb-5 rounded-xl px-4 py-3 text-sm" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="new-password">رمز عبور جدید</Label>
            <Input id="new-password" type="password" autoComplete="new-password" dir="ltr" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
            <Input id="confirm-password" type="password" autoComplete="new-password" dir="ltr" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
          </div>

          <Button type="submit" size="lg" disabled={pending || !token}>
            {pending ? "در حال ذخیره..." : "تغییر رمز عبور"}
          </Button>

          <Link href="/login" className="text-muted-foreground text-center text-sm hover:text-foreground">
            بازگشت به صفحه ورود
          </Link>
        </form>
      </section>
    </main>
  );
}
