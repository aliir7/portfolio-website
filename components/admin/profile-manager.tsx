"use client";

import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfileAction } from "@/lib/actions/admin/profile.actions";
import { uploadFolders } from "@/lib/constants";
import { emptyLocalized } from "@/lib/localize";
import { notifyResult } from "@/lib/utils/notify";
import type { ProfileInput, SkillInput } from "@/types";
import LocalizedField from "./localized-field";
import NumberField from "./number-field";
import TextField from "./text-field";
import UploadField from "./upload-field";
import { useListEditor } from "./use-list-editor";

export type ProfileForm = { profile: ProfileInput; skills: SkillInput[] };

export const emptyProfileForm: ProfileForm = {
  profile: {
    name: emptyLocalized(),
    role: emptyLocalized(),
    bio: emptyLocalized(),
    location: emptyLocalized(),
    email: "",
    phone: "",
    avatarUrl: "",
    resumeUrl: "",
    experienceYears: 0,
    completedProjects: 0,
  },
  skills: [],
};

export default function ProfileManager({ initial = emptyProfileForm }: { initial?: ProfileForm }) {
  const [profile, setProfile] = useState(initial.profile);
  const skills = useListEditor(initial.skills);
  const [saved, setSaved] = useState(false);

  const updateProfile = <K extends keyof ProfileInput>(field: K, value: ProfileInput[K]) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updateSkill = (uid: string, patch: Partial<SkillInput>) => {
    setSaved(false);
    skills.update(uid, patch);
  };

  const save = async () => {
    setSaved(notifyResult(await updateProfileAction({ profile, skills: skills.values })));
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
            <CardDescription>متن‌های دوزبانه باید هم فارسی و هم انگلیسی پر شوند.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <LocalizedField id="profile-name" label="نام" value={profile.name} onChange={(value) => updateProfile("name", value)} />
            <LocalizedField id="profile-role" label="عنوان شغلی" value={profile.role} onChange={(value) => updateProfile("role", value)} />
            <LocalizedField id="profile-bio" label="معرفی کوتاه" value={profile.bio} onChange={(value) => updateProfile("bio", value)} multiline rows={4} />
            <LocalizedField id="profile-location" label="موقعیت" value={profile.location} onChange={(value) => updateProfile("location", value)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField id="profile-email" label="ایمیل" value={profile.email} onChange={(value) => updateProfile("email", value)} />
              <TextField id="profile-phone" label="تلفن" value={profile.phone} onChange={(value) => updateProfile("phone", value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField id="profile-years" label="سال‌های تجربه" min={0} max={99} value={profile.experienceYears} onChange={(value) => updateProfile("experienceYears", value)} />
              <NumberField id="profile-projects" label="تعداد پروژه‌های انجام‌شده" value={profile.completedProjects} max={100000} onChange={(value) => updateProfile("completedProjects", value)} />
            </div>
            <UploadField id="profile-avatar" label="عکس پروفایل" folder={uploadFolders.profile} value={profile.avatarUrl ?? ""} onChange={(value) => updateProfile("avatarUrl", value)} />
            <UploadField id="profile-resume" kind="pdf" label="فایل رزومه (PDF)" folder={uploadFolders.profile} value={profile.resumeUrl ?? ""} onChange={(value) => updateProfile("resumeUrl", value)} />
          </CardContent>
        </Card>
        <Card className="glass-panel border-0">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>مهارت‌ها</CardTitle>
              <CardDescription>نام، درصد تسلط و توضیح مهارت‌ها را ویرایش کن.</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm"><Link href="/admin/profile/skills/new"><RiAddLine /> افزودن</Link></Button>
          </CardHeader>
          <CardContent className="grid gap-4">
            {skills.rows.map((skill, index) => (
              <div key={skill.uid} className="bg-background/45 border-border/60 grid gap-3 rounded-2xl border p-4">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor={`${skill.uid}-name`}>مهارت {index + 1}</Label>
                  <Button variant="ghost" size="icon" aria-label={`حذف ${skill.name}`} onClick={() => { setSaved(false); skills.remove(skill.uid); }}>
                    <RiDeleteBinLine />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
                  <Input id={`${skill.uid}-name`} dir="ltr" value={skill.name} onChange={(event) => updateSkill(skill.uid, { name: event.target.value })} />
                  <NumberField id={`${skill.uid}-value`} ariaLabel="درصد تسلط" min={0} max={100} suffix="٪" value={skill.value} onChange={(value) => updateSkill(skill.uid, { value })} />
                </div>
                <LocalizedField id={`${skill.uid}-description`} label="توضیح" value={skill.description} onChange={(value) => updateSkill(skill.uid, { description: value })} multiline rows={2} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
