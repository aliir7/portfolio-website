"use server";

import { z } from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const contactSchema = z.object({
  name: z.string().trim().min(2, "نام را وارد کنید.").max(100),
  email: z.string().trim().email("ایمیل معتبر نیست.").max(320),
  message: z.string().trim().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد.").max(5000),
});

export async function submitContactAction(input: unknown) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "اطلاعات فرم تماس معتبر نیست." };
  await db.insert(contactMessages).values({ id: crypto.randomUUID(), ...parsed.data });
  return { success: true };
}
