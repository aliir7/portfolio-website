"use client";

import { useState, useActionState } from "react";
import { useForm } from "@tanstack/react-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { signInAction, type LoginState } from "@/lib/actions/auth.actions";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { zodIssuesToFieldErrors } from "@/lib/utils";

const initialState: LoginState = {};

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
        action(formData);
      } finally {
        setCaptchaLoading(false);
      }
    },
  });

  return { form, state, isSubmitting: pending || captchaLoading };
}
