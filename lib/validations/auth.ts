import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().trim().email("ایمیل معتبر نیست."),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد."),
});
