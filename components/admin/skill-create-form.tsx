"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowRightLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { localProfileRepository } from "@/lib/admin/profile-repository";
import type { Skill } from "@/types";

export default function SkillCreateForm() {
  const router = useRouter();
  const [skill, setSkill] = useState<Skill>({ name: "", value: 50, description: "" });
  const update = (field: keyof Skill, value: string) => setSkill((current) => ({ ...current, [field]: field === "value" ? Math.min(100, Math.max(0, Number(value) || 0)) : value }));
  const save = async () => {
    const profile = await localProfileRepository.get();
    await localProfileRepository.update({ ...profile, skills: [...profile.skills, skill] });
    router.push("/admin/profile");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">پروفایل</p>
          <h2 className="text-3xl font-black">افزودن مهارت</h2>
          <p className="mt-2 text-muted-foreground">یک مهارت جدید به پروفایل و بخش مهارت‌های سایت اضافه کن.</p>
        </div>
        <Button variant="ghost" onClick={() => router.push("/admin/profile")}><RiArrowRightLine /> بازگشت به پروفایل</Button>
      </div>
      <Card className="glass-panel border-0">
        <CardHeader><CardTitle>اطلاعات مهارت</CardTitle><CardDescription>درصد تسلط بین صفر تا صد ثبت می‌شود.</CardDescription></CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
            <div className="grid gap-2"><Label htmlFor="new-skill-name">نام مهارت</Label><Input id="new-skill-name" value={skill.name} onChange={(event) => update("name", event.target.value)} placeholder="مثلاً React" /></div>
            <div className="grid gap-2"><Label htmlFor="new-skill-value">درصد تسلط</Label><Input id="new-skill-value" type="number" min={0} max={100} value={skill.value} onChange={(event) => update("value", event.target.value)} /></div>
          </div>
          <div className="grid gap-2"><Label htmlFor="new-skill-description">توضیح</Label><Textarea id="new-skill-description" value={skill.description} onChange={(event) => update("description", event.target.value)} placeholder="توضیح کوتاه درباره تجربه و کاربرد این مهارت" rows={5} /></div>
          <div className="flex justify-end border-t border-border/60 pt-5"><Button onClick={save} disabled={!skill.name.trim()}><RiSaveLine /> ذخیره مهارت</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}
