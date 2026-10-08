"use client";

import { motion } from "framer-motion";
import {
  RiErrorWarningLine,
  RiLoader4Line,
  RiMailLine,
  RiSendPlane2Line,
} from "@remixicon/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { emailFieldSchema } from "@/lib/validations";
import { FormFieldUI } from "./form-field-ui";
import { RecaptchaProvider } from "./recaptcha-provider";
import { useForgotPasswordForm } from "./use-forgot-password-form";

type Translator = ReturnType<typeof useTranslations>;

function firstErrorKey(errors: unknown): string {
  if (!Array.isArray(errors) || errors.length === 0) return "";
  const first = errors[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "message" in first) {
    return String((first as { message?: unknown }).message ?? "");
  }
  return "";
}

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

function ForgotPasswordContent() {
  const t = useTranslations();
  const { form, state, isSubmitting, captchaMissing } = useForgotPasswordForm();

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
            <RiSendPlane2Line className="size-7" />
          </div>
          <p className="text-primary mb-1 text-sm font-medium">
            {t("auth.siteAdmin")}
          </p>
          <h1 className="text-3xl font-black">{t("auth.forgotTitle")}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {t("auth.forgotSubtitle")}
          </p>
        </div>

        {state.success && (
          <Alert className="border-primary/30 bg-primary/10 text-primary mb-5">
            <RiMailLine />
            <AlertDescription className="text-primary">
              {state.success}
            </AlertDescription>
          </Alert>
        )}

        {(state.error || captchaMissing) && (
          <Alert variant="destructive" className="mb-5">
            <RiErrorWarningLine />
            <AlertDescription>
              {captchaMissing ? t("auth.captchaNotReady") : state.error}
            </AlertDescription>
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
                id="forgot-email"
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

          <Button
            type="submit"
            variant="cta"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RiLoader4Line className="animate-spin" />
                {t("auth.forgotSubmitting")}
              </>
            ) : (
              t("auth.forgotSubmit")
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

export default function ForgotPasswordForm() {
  return (
    <RecaptchaProvider>
      <ForgotPasswordContent />
    </RecaptchaProvider>
  );
}
