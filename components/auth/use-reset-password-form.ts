"use client";

import { useActionState } from "react";
import { useForm } from "@tanstack/react-form";
import { resetPasswordAction } from "@/lib/actions/auth.actions";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/validations";
import { ResetPasswordState } from "@/types/auth";
import { zodIssuesToFieldErrors } from "@/lib/utils";

const initialState: ResetPasswordState = {};

export function useResetPasswordForm(token: string) {
  const [state, action, pending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  const defaultValues: ResetPasswordInput = {
    password: "",
    confirmPassword: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: ({ value }) => {
        const result = resetPasswordSchema.safeParse(value);
        if (result.success) return undefined;
        return zodIssuesToFieldErrors(result.error.issues);
      },
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.set("password", value.password);
      formData.set("confirmPassword", value.confirmPassword);
      formData.set("token", token);
      action(formData);
    },
  });

  return { form, state, isSubmitting: pending };
}
