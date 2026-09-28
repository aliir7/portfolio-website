"use client";

import { useActionState } from "react";
import { signInAction, type LoginState } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(signInAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="bg-card border-border/60 w-full max-w-md rounded-3xl border p-8 shadow-sm">
        <div className="mb-8">
          <p className="text-primary mb-2 text-sm font-medium">مدیریت سایت</p>
          <h1 className="text-3xl font-black">ورود به پنل</h1>
          <p className="text-muted-foreground mt-2 text-sm">برای ورود به پنل مدیریت اطلاعات حساب خود را وارد کنید.</p>
        </div>
        {state.error && <p className="bg-destructive/10 text-destructive mb-5 rounded-xl px-4 py-3 text-sm" role="alert">{state.error}</p>}
        <form action={action} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="login-email">ایمیل</Label>
            <Input id="login-email" name="email" type="email" autoComplete="email" dir="ltr" aria-invalid={Boolean(state.fieldErrors?.email)} />
            {state.fieldErrors?.email?.[0] && <p className="text-destructive text-sm">{state.fieldErrors.email[0]}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="login-password">رمز عبور</Label>
            <Input id="login-password" name="password" type="password" autoComplete="current-password" dir="ltr" aria-invalid={Boolean(state.fieldErrors?.password)} />
            {state.fieldErrors?.password?.[0] && <p className="text-destructive text-sm">{state.fieldErrors.password[0]}</p>}
          </div>
          <Button type="submit" size="lg" disabled={pending}>{pending ? "در حال ورود..." : "ورود"}</Button>
        </form>
      </section>
    </main>
  );
}
