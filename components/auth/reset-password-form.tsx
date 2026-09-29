"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
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
      setError("تکرار رمز عبور با رمز جدید یکسان نیست.");
      return;
    }

    setPending(true);
    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setPending(false);

    if (resetError) {
      setError(resetError.message || "تغییر رمز عبور انجام نشد.");
      return;
    }

    setSuccess(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="bg-card border-border/60 w-full max-w-md rounded-3xl border p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-primary mb-2 text-sm font-medium">مدیریت سایت</p>
          <h1 className="text-3xl font-black">تغییر رمز عبور</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            یک رمز عبور جدید برای حساب مدیریت انتخاب کنید.
          </p>
        </div>

        {error && (
          <p className="bg-destructive/10 text-destructive mb-5 rounded-xl px-4 py-3 text-sm" role="alert">
            {error}
          </p>
        )}

        {success ? (
          <>
            <p className="bg-primary/10 text-primary rounded-xl px-4 py-3 text-sm" role="status">
              رمز عبور با موفقیت تغییر کرد.
            </p>
            <a className="text-primary mt-5 block text-center text-sm hover:underline" href="/login">
              ورود به پنل
            </a>
          </>
        ) : (
          <form onSubmit={submit} className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="new-password">رمز عبور جدید</Label>
              <Input id="new-password" type="password" autoComplete="new-password" dir="ltr" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
              <Input id="confirm-password" type="password" autoComplete="new-password" dir="ltr" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? "در حال تغییر..." : "تغییر رمز عبور"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
