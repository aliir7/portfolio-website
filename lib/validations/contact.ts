import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2, "نام را وارد کنید.").max(100),
  email: z.string().trim().email("ایمیل معتبر نیست.").max(320),
  message: z.string().trim().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد.").max(5000),
});
