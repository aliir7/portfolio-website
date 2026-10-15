"use client";

import { useState } from "react";
import { RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { saveSeoSettingsAction } from "@/lib/actions/settings.actions";
import { uploadFolders } from "@/lib/constants";
import { emptyLocalized } from "@/lib/localize";
import { notifyResult } from "@/lib/utils/notify";
import { seoSettingsSchema } from "@/lib/validations/settings";
import type { SeoSettings } from "@/types";
import UploadField from "./upload-field";
import LocalizedField from "./localized-field";

const emptySeo: SeoSettings = {
  title: emptyLocalized(),
  description: emptyLocalized(),
  keywords: emptyLocalized(),
  ogImage: "",
};

export default function SeoSettingsForm({ initial = emptySeo }: { initial?: SeoSettings }) {
  const [form, setForm] = useState(initial);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">تنظیمات</p>
          <h2 className="text-3xl font-black">سئو</h2>
          <p className="mt-2 text-muted-foreground">عنوان و توضیح صفحه‌ی اصلی در نتایج جستجو و اشتراک‌گذاری. تا وقتی ذخیره نشود، از نام و معرفی پروفایل استفاده می‌شود.</p>
        </div>
        <Button onClick={async () => notifyResult(await saveSeoSettingsAction(form))} disabled={!seoSettingsSchema.safeParse(form).success}>
          <RiSaveLine /> ذخیره تغییرات
        </Button>
      </section>
      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle>متادیتای سایت</CardTitle>
          <CardDescription>عنوان حداکثر ۷۰ و توضیح حداکثر ۱۶۰ کاراکتر؛ کلمات کلیدی را با ویرگول جدا کن.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <LocalizedField id="seo-title" label="عنوان" value={form.title} onChange={(title) => setForm({ ...form, title })} />
          <LocalizedField id="seo-description" label="توضیح" value={form.description} onChange={(description) => setForm({ ...form, description })} multiline />
          <LocalizedField id="seo-keywords" label="کلمات کلیدی" value={form.keywords} onChange={(keywords) => setForm({ ...form, keywords })} />
          <UploadField id="seo-og-image" label="تصویر اشتراک‌گذاری (OpenGraph)" folder={uploadFolders.site} value={form.ogImage ?? ""} onChange={(ogImage) => setForm({ ...form, ogImage })} />
        </CardContent>
      </Card>
    </div>
  );
}
