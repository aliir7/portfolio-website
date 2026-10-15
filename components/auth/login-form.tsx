"use client";

import { motion } from "framer-motion";
import {
  RiErrorWarningLine,
  RiLoader4Line,
  RiLock2Line,
  RiMailLine,
  RiShieldKeyholeLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  emailFieldSchema,
  passwordFieldSchema,
} from "@/lib/validations";
import { FormFieldUI } from "./form-field-ui";
import { RecaptchaProvider } from "./recaptcha-provider";
import { useLoginForm } from "./use-login-form";

type Translator = ReturnType<typeof useTranslations>;

/** اولین پیام خطا را از هر شکلی (string | {message} | undefined) بیرون می‌کشد */
function firstErrorKey(errors: unknown): string {
  if (!Array.isArray(errors) || errors.length === 0) return "";
  const first = errors[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "message" in first) {
    return String((first as { message?: unknown }).message ?? "");
  }
  return "";
}

/** خطای کلاینت = کلید ترجمه؛ خطای سرور = متن ازپیش‌ترجمه‌شده */
function resolveFieldError(
  isTouched: boolean,
  clientErrors: unknown,
  serverErrors: string[] | undefined,
  t: Translator,
): string | null {
  if (isTouched) {
    const key = firstErrorKey(clientErrors);
    if (key) return t(key as Parameters<typeof t>[0]);
  }
  return serverErrors?.[0] ?? null;
}

function LoginFormContent() {
  const t = useTranslations();
  const { form, state, isSubmitting } = useLoginForm();

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="glass-panel w-full max-w-md rounded-3xl p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl">
            <RiShieldKeyholeLine className="size-7" />
          </div>
          <p className="text-primary mb-1 text-sm font-medium">
            {t("auth.siteAdmin")}
          </p>
          <h1 className="text-3xl font-black">{t("auth.loginTitle")}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {t("auth.loginSubtitle")}
          </p>
        </div>

        {/* Global Error */}
        {state.error && (
          <Alert variant="destructive" className="mb-5">
            <RiErrorWarningLine />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="grid gap-5"
        >
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => {
                const result = emailFieldSchema.safeParse(value);
                if (result.success) return undefined;
                return result.error.issues.map((i) => ({ message: i.message }));
              },
            }}
          >
            {(field) => (
              <FormFieldUI
                id="login-email"
                label={t("auth.email")}
                type="email"
                autoComplete="email"
                icon={<RiMailLine />}
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={resolveFieldError(
                  field.state.meta.isTouched,
                  field.state.meta.errors,
                  state.fieldErrors?.email,
                  t,
                )}
              />
            )}
          </form.Field>

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
                id="login-password"
                label={t("auth.password")}
                type="password"
                autoComplete="current-password"
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

          <form.Field name="rememberMe">
            {(field) => (
              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="login-remember"
                  checked={field.state.value}
                  onCheckedChange={(v) => field.handleChange(v === true)}
                  onBlur={field.handleBlur}
                />
                <Label
                  htmlFor="login-remember"
                  className="cursor-pointer justify-start font-normal"
                >
                  {t("auth.rememberMe")}
                </Label>
              </div>
            )}
          </form.Field>

          <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <RiLoader4Line className="animate-spin" />
                {t("auth.submitting")}
              </>
            ) : (
              t("auth.submit")
            )}
          </Button>
        </form>

        <Separator className="my-6" />

        <Link
          href="/forgot-password"
          className="text-primary block text-center text-sm font-medium hover:underline"
        >
          {t("auth.forgotPassword")}
        </Link>
      </motion.section>
    </main>
  );
}

export default function LoginForm() {
  return (
    <RecaptchaProvider showBadge>
      <LoginFormContent />
    </RecaptchaProvider>
  );
}