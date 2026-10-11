"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiArrowRightLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSkillAction } from "@/lib/actions/admin/profile.actions";
import { emptyLocalized } from "@/lib/localize";
import { notifyResult } from "@/lib/utils/notify";
import { skillSchema } from "@/lib/validations/profile";
import type { SkillInput } from "@/types";
import LocalizedField from "./localized-field";

export default function SkillCreateForm() {
  const router = useRouter();
  const [skill, setSkill] = useState<SkillInput>({ name: "", value: 50, description: emptyLocalized() });

  const save = async () => {
    if (notifyResult(await createSkillAction(skill))) router.push("/admin/profile");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">پروفایل</p>
          <h2 className="text-3xl font-black">افزودن مهارت</h2>
          <p className="mt-2 text-muted-foreground">یک مهارت جدید به پروفایل اضافه کن.</p>
        </div>
        <Button variant="ghost" onClick={() => router.push("/admin/profile")}><RiArrowRightLine /> بازگشت</Button>
      </div>
      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle>اطلاعات مهارت</CardTitle>
          <CardDescription>درصد تسلط بین صفر تا صد ثبت می‌شود.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
            <div className="grid gap-2">
              <Label htmlFor="new-skill-name">نام مهارت</Label>
              <Input id="new-skill-name" dir="ltr" value={skill.name} onChange={(event) => setSkill({ ...skill, name: event.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-skill-value">درصد تسلط</Label>
              <Input id="new-skill-value" type="number" min={0} max={100} value={skill.value} onChange={(event) => setSkill({ ...skill, value: Math.min(100, Math.max(0, Number(event.target.value) || 0)) })} />
            </div>
          </div>
          <LocalizedField id="new-skill-description" label="توضیح" value={skill.description} onChange={(value) => setSkill({ ...skill, description: value })} multiline rows={4} />
          <div className="flex justify-end border-t border-border/60 pt-5">
            <Button onClick={save} disabled={!skillSchema.safeParse(skill).success}><RiSaveLine /> ذخیره مهارت</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
