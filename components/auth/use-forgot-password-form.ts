"use client";

import { useState, useActionState } from "react";
import { useForm } from "@tanstack/react-form";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { requestPasswordResetAction } from "@/lib/actions/auth.actions";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations";
import { PasswordResetState } from "@/types/auth";
import { zodIssuesToFieldErrors } from "@/lib/utils";

export const initialState: PasswordResetState = {};

export function useForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    requestPasswordResetAction,
    initialState,
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaMissing, setCaptchaMissing] = useState(false);

  const defaultValues: ForgotPasswordInput = { email: "" };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: ({ value }) => {
        const result = forgotPasswordSchema.safeParse(value);
        if (result.success) return undefined;
        return zodIssuesToFieldErrors(result.error.issues);
      },
    },
    onSubmit: async ({ value }) => {
      if (!executeRecaptcha) {
        setCaptchaMissing(true);
        return;
      }
      setCaptchaMissing(false);
      setCaptchaLoading(true);
      try {
        const token = await executeRecaptcha("forgot_password");
        const formData = new FormData();
        formData.set("email", value.email);
        formData.set("recaptchaToken", token);
        action(formData);
      } finally {
        setCaptchaLoading(false);
      }
    },
  });

  return {
    form,
    state,
    isSubmitting: pending || captchaLoading,
    captchaMissing,
  };
}
