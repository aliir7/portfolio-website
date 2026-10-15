"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { saveSeoSettingsAction } from "@/lib/actions/settings.actions";
import { uploadFolders } from "@/lib/constants";
import { emptyLocalized } from "@/lib/localize";
import { notifyResult } from "@/lib/utils/notify";
import { seoSettingsSchema } from "@/lib/validations/settings.validations";
import type { SeoSettings } from "@/types";
import { RiSaveLine } from "@remixicon/react";
import { useState } from "react";
import LocalizedField from "./localized-field";
import UploadField from "./upload-field";
import { useFormValidation } from "./use-form-validation";

const emptySeo: SeoSettings = {
  title: emptyLocalized(),
  description: emptyLocalized(),
  keywords: emptyLocalized(),
  ogImage: "",
};

export default function SeoSettingsForm({
  initial = emptySeo,
}: {
  initial?: SeoSettings;
}) {
  const [form, setForm] = useState(initial);
  const v = useFormValidation(seoSettingsSchema, form);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-primary mb-2 text-sm font-medium">تنظیمات</p>
          <h2 className="text-3xl font-black">سئو</h2>
          <p className="text-muted-foreground mt-2">
            عنوان و توضیح صفحه‌ی اصلی در نتایج جستجو و اشتراک‌گذاری. تا وقتی
            ذخیره نشود، از نام و معرفی پروفایل استفاده می‌شود.
          </p>
        </div>
        <Button
          onClick={() =>
            v.submit(async () =>
              notifyResult(await saveSeoSettingsAction(form)),
            )
          }
          disabled={v.pending}
        >
          {v.pending ? <Spinner /> : <RiSaveLine />} ذخیره تغییرات
        </Button>
      </section>
      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle>متادیتای سایت</CardTitle>
          <CardDescription>
            عنوان حداکثر ۷۰ و توضیح حداکثر ۱۶۰ کاراکتر؛ کلمات کلیدی را با ویرگول
            جدا کن.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <LocalizedField
            id="seo-title"
            label="عنوان"
            value={form.title}
            onChange={(title) => setForm({ ...form, title })}
            {...v.localized("title")}
          />
          <LocalizedField
            id="seo-description"
            label="توضیح"
            value={form.description}
            onChange={(description) => setForm({ ...form, description })}
            multiline
            {...v.localized("description")}
          />
          <LocalizedField
            id="seo-keywords"
            label="کلمات کلیدی"
            value={form.keywords}
            onChange={(keywords) => setForm({ ...form, keywords })}
            {...v.localized("keywords")}
          />
          <UploadField
            id="seo-og-image"
            label="تصویر اشتراک‌گذاری (OpenGraph)"
            folder={uploadFolders.site}
            value={form.ogImage ?? ""}
            onChange={(ogImage) => setForm({ ...form, ogImage })}
            {...v.field("ogImage")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
