"use client";

import { motion } from "framer-motion";
import {
  RiErrorWarningLine,
  RiLoader4Line,
  RiLock2Line,
  RiShieldKeyholeLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  confirmPasswordFieldSchema,
  passwordFieldSchema,
} from "@/lib/validations";
import { FormFieldUI } from "./form-field-ui";
import { useResetPasswordForm } from "./use-reset-password-form";
import { resolveFieldError } from "@/lib/utils/format-error";

interface ResetPasswordFormProps {
  token: string | null;
  linkError: string | null;
}

function InvalidLinkState() {
  const t = useTranslations();
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <section className="glass-panel w-full max-w-md rounded-3xl p-8 text-center">
        <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl">
          <RiErrorWarningLine className="size-7" />
        </div>
        <h1 className="text-2xl font-black">{t("auth.resetTitle")}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t("auth.invalidLink")}
        </p>
        <Separator className="my-6" />
        <Link
          href="/login"
          className="text-primary block text-center text-sm font-medium hover:underline"
        >
          {t("auth.backToLogin")}
        </Link>
      </section>
    </main>
  );
}

function ResetPasswordContent({ token }: { token: string }) {
  const t = useTranslations();
  const { form, state, isSubmitting } = useResetPasswordForm(token);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass-panel w-full max-w-md rounded-3xl p-8"
      >
        <div className="mb-8 text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl">
            <RiShieldKeyholeLine className="size-7" />
          </div>
          <p className="text-primary mb-1 text-sm font-medium">
            {t("auth.siteAdmin")}
          </p>
          <h1 className="text-3xl font-black">{t("auth.resetTitle")}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {t("auth.resetSubtitle")}
          </p>
        </div>

        {state.error && (
          <Alert variant="destructive" className="mb-5">
            <RiErrorWarningLine />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid gap-5"
        >
          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => {
                const result = passwordFieldSchema.safeParse(value);
                if (result.success) return undefined;
                return result.error.issues.map((i) => ({ message: i.message }));
              },
            }}
          >
            {(field) => (
              <FormFieldUI
                id="reset-password"
                label={t("auth.newPassword")}
                type="password"
                autoComplete="new-password"
                icon={<RiLock2Line />}
                showPasswordLabel={t("auth.showPassword")}
                hidePasswordLabel={t("auth.hidePassword")}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={resolveFieldError(
                  field.state.meta.isTouched,
                  field.state.meta.errors,
                  state.fieldErrors?.password,
                  t,
                )}
              />
            )}
          </form.Field>

          <form.Field
            name="confirmPassword"
            validators={{
              onBlur: ({ value }) => {
                const result = confirmPasswordFieldSchema.safeParse(value);
                if (result.success) return undefined;
                return result.error.issues.map((i) => ({ message: i.message }));
              },
            }}
          >
            {(field) => (
              <FormFieldUI
                id="reset-confirm"
                label={t("auth.confirmPassword")}
                type="password"
                autoComplete="new-password"
                icon={<RiLock2Line />}
                showPasswordLabel={t("auth.showPassword")}
                hidePasswordLabel={t("auth.hidePassword")}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={resolveFieldError(
                  field.state.meta.isTouched,
                  field.state.meta.errors,
                  state.fieldErrors?.confirmPassword,
                  t,
                )}
              />
            )}
          </form.Field>

          <Button
            type="submit"
            variant="cta"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RiLoader4Line className="animate-spin" />
                {t("auth.resetSubmitting")}
              </>
            ) : (
              t("auth.resetSubmit")
            )}
          </Button>
        </form>

        <Separator className="my-6" />

        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground block text-center text-sm font-medium"
        >
          {t("auth.backToLogin")}
        </Link>
      </motion.section>
    </main>
  );
}

export default function ResetPasswordForm({
  token,
  linkError,
}: ResetPasswordFormProps) {
  const t = useTranslations();
  if (!token || linkError) return <InvalidLinkState />;
  return <ResetPasswordContent token={token} />;
}
