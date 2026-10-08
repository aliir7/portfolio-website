import { z } from "zod";

export const emailFieldSchema = z.email({
  error: (issue) =>
    issue.input == null || issue.input === ""
      ? "errors.validation.email.required"
      : "errors.validation.email.invalid",
});

export const passwordFieldSchema = z
  .string()
  .min(8, { message: "errors.validation.password.minLength" })
  .regex(/[A-Za-z]/, { message: "errors.validation.password.letter" })
  .regex(/[0-9]/, { message: "errors.validation.password.number" });

/* سطح‌فیلد: فقط required (mismatch سطح‌فرم است، نه اینجا) */
export const confirmPasswordFieldSchema = z
  .string()
  .min(1, { message: "errors.validation.confirmPassword.required" });

export const loginSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
  rememberMe: z.boolean(),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailFieldSchema,
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordFieldSchema,
    confirmPassword: confirmPasswordFieldSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "errors.validation.confirmPassword.mismatch",
    path: ["confirmPassword"],
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
