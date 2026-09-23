"use client";

import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { localProfileRepository } from "@/lib/admin/profile-repository";
import type { AdminProfile } from "@/lib/admin/types";
import { skillsData } from "@/lib/constants";

const initialProfile: AdminProfile = {
  name: "علی رضایی",
  role: "برنامه‌نویس React و Next.js",
  bio: "توسعه‌دهنده وب ساکن تهران با تمرکز بر ساخت رابط‌های کاربری مدرن، سریع و قابل نگهداری.",
  email: "alirezaeii.dev@gmail.com",
  phone: "0902 925 3481",
  location: "تهران، ایران",
  githubUrl: "https://github.com/aliir7",
  resumeUrl: "/resume.pdf",
  skills: skillsData.map((skill) => ({ ...skill })),
};

export default function ProfileManager() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const update = (field: Exclude<keyof AdminProfile, "skills">, value: string) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updateSkill = (index: number, field: "name" | "description" | "value", value: string) => {
    setSaved(false);
    setProfile((current) => ({
      ...current,
      skills: current.skills.map((skill, skillIndex) =>
        skillIndex === index ? { ...skill, [field]: field === "value" ? Math.min(100, Math.max(0, Number(value) || 0)) : value } : skill,
      ),
    }));
  };

  const save = async () => {
    await localProfileRepository.update(profile);
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">محتوا</p>
          <h2 className="text-3xl font-black">پروفایل و مهارت‌ها</h2>
          <p className="mt-2 text-muted-foreground">اطلاعاتی که در معرفی و بخش مهارت‌های سایت نمایش داده می‌شوند.</p>
        </div>
        <Button onClick={save}><RiSaveLine /> {saved ? "ذخیره شد" : "ذخیره تغییرات"}</Button>
      </section>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="glass-panel border-0">
          <CardHeader>
            <CardTitle>اطلاعات شخصی</CardTitle>
            <CardDescription>این بخش بعداً به endpoint پروفایل متصل می‌شود.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <ProfileField id="profile-name" label="نام" value={profile.name} onChange={(value) => update("name", value)} />
            <ProfileField id="profile-role" label="عنوان شغلی" value={profile.role} onChange={(value) => update("role", value)} />
            <div className="grid gap-2"><Label htmlFor="profile-bio">معرفی کوتاه</Label><Textarea id="profile-bio" value={profile.bio} onChange={(event) => update("bio", event.target.value)} rows={4} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ProfileField id="profile-email" label="ایمیل" value={profile.email} onChange={(value) => update("email", value)} dir="ltr" />
              <ProfileField id="profile-phone" label="تلفن" value={profile.phone} onChange={(value) => update("phone", value)} dir="ltr" />
            </div>
            <ProfileField id="profile-location" label="موقعیت" value={profile.location} onChange={(value) => update("location", value)} />
            <ProfileField id="profile-github" label="GitHub" value={profile.githubUrl} onChange={(value) => update("githubUrl", value)} dir="ltr" />
            <ProfileField id="profile-resume" label="آدرس رزومه" value={profile.resumeUrl} onChange={(value) => update("resumeUrl", value)} dir="ltr" />
          </CardContent>
        </Card>
        <Card className="glass-panel border-0">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div><CardTitle>مهارت‌ها</CardTitle><CardDescription>نام، درصد تسلط و توضیح مهارت‌ها را ویرایش کن.</CardDescription></div>
            <Button asChild variant="outline" size="sm"><Link href="/admin/profile/skills/new"><RiAddLine /> افزودن</Link></Button>
          </CardHeader>
          <CardContent className="grid gap-4">
            {profile.skills.map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="bg-background/45 border-border/60 grid gap-3 rounded-2xl border p-4">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor={`skill-name-${index}`}>مهارت {index + 1}</Label>
                  <Button variant="ghost" size="icon" onClick={() => setProfile((current) => ({ ...current, skills: current.skills.filter((_, skillIndex) => skillIndex !== index) }))} aria-label={`حذف ${skill.name}`}><RiDeleteBinLine /></Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
                  <Input id={`skill-name-${index}`} value={skill.name} onChange={(event) => updateSkill(index, "name", event.target.value)} />
                  <div className="relative"><Input type="number" min={0} max={100} value={skill.value} onChange={(event) => updateSkill(index, "value", event.target.value)} className="pe-8" /><span className="text-muted-foreground absolute end-3 top-1/2 -translate-y-1/2 text-sm">٪</span></div>
                </div>
                <Textarea value={skill.description} onChange={(event) => updateSkill(index, "description", event.target.value)} rows={2} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileField({ id, label, value, onChange, dir }: { id: string; label: string; value: string; onChange: (value: string) => void; dir?: "ltr" | "rtl" }) {
  return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Input id={id} value={value} dir={dir} onChange={(event) => onChange(event.target.value)} /></div>;
}
