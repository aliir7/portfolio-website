"use client";

import { useState } from "react";
import { RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { changePasswordAction } from "@/lib/actions/admin/account.actions";
import { notifyResult } from "@/lib/utils/notify";
import { changePasswordSchema } from "@/lib/validations/auth.validations";
import TextField from "./text-field";

const empty = { currentPassword: "", newPassword: "", confirmPassword: "" };

export default function ChangePasswordForm() {
  const [form, setForm] = useState(empty);

  const save = async () => {
    if (notifyResult(await changePasswordAction(form))) setForm(empty);
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <section>
        <p className="mb-2 text-sm font-medium text-primary">حساب کاربری</p>
        <h2 className="text-3xl font-black">تغییر رمز عبور</h2>
        <p className="mt-2 text-muted-foreground">پس از تغییر، نشست‌های دیگر این حساب بسته می‌شوند.</p>
      </section>
      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle>رمز عبور جدید</CardTitle>
          <CardDescription>حداقل ۸ کاراکتر، شامل حروف و عدد.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <TextField id="current-password" type="password" label="رمز عبور فعلی" value={form.currentPassword} onChange={(currentPassword) => setForm({ ...form, currentPassword })} />
          <TextField id="new-password" type="password" label="رمز عبور جدید" value={form.newPassword} onChange={(newPassword) => setForm({ ...form, newPassword })} />
          <TextField id="confirm-password" type="password" label="تکرار رمز عبور جدید" value={form.confirmPassword} onChange={(confirmPassword) => setForm({ ...form, confirmPassword })} />
          <div className="flex justify-end border-t border-border/60 pt-5">
            <Button onClick={save} disabled={!changePasswordSchema.safeParse(form).success}>
              <RiSaveLine /> تغییر رمز عبور
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
