"use client";

import { useCallback, useState, useActionState } from "react";
import Link from "next/link";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { requestPasswordResetAction } from "@/lib/actions/auth.actions";
import type { PasswordResetState } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: PasswordResetState = {};

function ForgotPasswordContent() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, initialState);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [captchaError, setCaptchaError] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setCaptchaError(false);

      if (!executeRecaptcha) {
        setCaptchaError(true);
        return;
      }

      const token = await executeRecaptcha("forgot_password");
      const formData = new FormData(event.currentTarget);
      formData.set("recaptchaToken", token);
      action(formData);
    },
    [action, executeRecaptcha],
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="bg-card border-border/60 w-full max-w-md rounded-3xl border p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-primary mb-2 text-sm font-medium">مدیریت سایت</p>
          <h1 className="text-3xl font-black">بازیابی رمز عبور</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            ایمیل حساب مدیریت را وارد کنید تا لینک بازیابی برای شما ارسال شود.
          </p>
        </div>

        {(state.error || captchaError) && (
          <p className="bg-destructive/10 text-destructive mb-5 rounded-xl px-4 py-3 text-sm" role="alert">
            {captchaError ? "اعتبارسنجی امنیتی آماده نیست. دوباره تلاش کنید." : state.error}
          </p>
        )}

        {state.success && (
          <p className="mb-5 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary" role="status">
            {state.success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="reset-email">ایمیل</Label>
            <Input id="reset-email" name="email" type="email" autoComplete="email" dir="ltr" required />
          </div>

          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "در حال ارسال..." : "ارسال لینک بازیابی"}
          </Button>

          <Link href="/login" className="text-muted-foreground text-center text-sm hover:text-foreground">
            بازگشت به صفحه ورود
          </Link>
        </form>
      </section>
    </main>
  );
}

export default function ForgotPasswordForm() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) return <ForgotPasswordContent />;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ForgotPasswordContent />
    </GoogleReCaptchaProvider>
  );
}
