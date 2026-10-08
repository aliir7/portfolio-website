"use client";

import { useState, type ReactNode } from "react";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldUIProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type: "email" | "password" | "text";
  autoComplete: string;
  error?: string | null;
  icon?: ReactNode;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export function FormFieldUI({
  id,
  label,
  value,
  onChange,
  onBlur,
  type,
  autoComplete,
  error,
  icon,
  showPasswordLabel,
  hidePasswordLabel,
}: FormFieldUIProps) {
  const [show, setShow] = useState(false);
  const locale = useLocale();
  const isRtl = locale === "fa";

  const isPassword = type === "password";
  const isLatin = type === "email" || type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  /* جای آیکون‌ها و padding به‌صورت فیزیکیِ شرطی → در فارسی آینه می‌شوند،
     ولی dir="ltr" روی input می‌ماند تا تایپ ایمیل/رمز درست باشد */
  const prefixPos = isRtl ? "right-0 pr-3.5" : "left-0 pl-3.5";
  const suffixPos = isRtl ? "left-0 pl-3.5" : "right-0 pr-3.5";
  const prefixPad = isRtl ? "pr-10" : "pl-10";
  const suffixPad = isRtl ? "pl-10" : "pr-10";

  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="justify-start">
        {label}
      </Label>

      <div className="relative">
        {icon && (
          <span
            className={cn(
              "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center [&_svg]:size-4.5",
              prefixPos,
            )}
          >
            {icon}
          </span>
        )}

        <Input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          dir={isLatin ? "ltr" : undefined}
          className={cn(
            "h-11 text-base",
            icon && prefixPad,
            isPassword && suffixPad,
            // دات‌های پسورد درشت‌تر + فاصله‌دار (فقط وقتی مخفی است)
            isPassword && !show && "tracking-[0.2em]",
            error && "border-destructive focus-visible:ring-destructive/30",
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((s) => !s)}
            aria-label={show ? hidePasswordLabel : showPasswordLabel}
            className={cn(
              "text-muted-foreground hover:text-foreground absolute inset-y-0 flex items-center transition-colors",
              suffixPos,
            )}
          >
            {show ? (
              <RiEyeOffLine className="size-4.5" />
            ) : (
              <RiEyeLine className="size-4.5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="text-destructive text-start text-xs"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}