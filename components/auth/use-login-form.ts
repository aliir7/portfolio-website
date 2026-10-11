"use client";

import { useState, useActionState, startTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { signInAction, type LoginState } from "@/lib/actions/auth.actions";
import { loginSchema, type LoginInput } from "@/lib/validations";

const initialState: LoginState = {};

function zodIssuesToFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, { message: string }[]> {
  return issues.reduce<Record<string, { message: string }[]>>((acc, issue) => {
    const key = String(issue.path[0] ?? "form");
    if (!acc[key]) acc[key] = [];
    acc[key].push({ message: issue.message });
    return acc;
  }, {});
}

export function useLoginForm() {
  const [state, action, pending] = useActionState(signInAction, initialState);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const defaultValues: LoginInput = {
    email: "",
    password: "",
    rememberMe: true,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: ({ value }) => {
        const result = loginSchema.safeParse(value);
        if (result.success) return undefined;
        return zodIssuesToFieldErrors(result.error.issues);
      },
    },
    onSubmit: async ({ value }) => {
      if (!executeRecaptcha) {
        console.error("reCAPTCHA not ready");
        return;
      }

      setCaptchaLoading(true);
      try {
        const token = await executeRecaptcha("login");
        const formData = new FormData();
        formData.set("email", value.email);
        formData.set("password", value.password);
        formData.set("rememberMe", String(value.rememberMe));
        formData.set("recaptchaToken", token);

        // ✅ فراخوانی امپراتیو server action باید داخل transition باشد
        startTransition(() => {
          action(formData);
        });
      } finally {
        setCaptchaLoading(false);
      }
    },
  });

  return { form, state, isSubmitting: pending || captchaLoading };
}
