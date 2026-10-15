"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LocalizedText } from "@/types";
import FieldError from "./field-error";

const locales = [
  { code: "fa", label: "فارسی", dir: "rtl" },
  { code: "en", label: "English", dir: "ltr" },
] as const;

type Props = {
  id: string;
  label: string;
  value: LocalizedText;
  onChange: (value: LocalizedText) => void;
  multiline?: boolean;
  rows?: number;
  error?: Partial<Record<"fa" | "en", string>>;
  onBlur?: (locale: "fa" | "en") => void;
};

/** One text input per language for a `{ fa, en }` field. Used by every admin form. */
export default function LocalizedField({ id, label, value, onChange, multiline, rows = 3, error, onBlur }: Props) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1 text-sm font-medium">{label}</legend>
      {locales.map(({ code, label: localeLabel, dir }) => {
        const fieldId = `${id}-${code}`;
        const shared = {
          id: fieldId,
          dir,
          value: value[code],
          onBlur: () => onBlur?.(code),
          "aria-invalid": error?.[code] ? true : undefined,
          "aria-describedby": error?.[code] ? `${fieldId}-error` : undefined,
        } as const;
        const update = (text: string) => onChange({ ...value, [code]: text });
        return (
          <div key={code} className="grid gap-1">
            <Label htmlFor={fieldId} className="text-muted-foreground text-xs">
              {localeLabel}
            </Label>
            {multiline ? (
              <Textarea {...shared} rows={rows} onChange={(event) => update(event.target.value)} />
            ) : (
              <Input {...shared} onChange={(event) => update(event.target.value)} />
            )}
            <FieldError id={fieldId} error={error?.[code]} />
          </div>
        );
      })}
    </fieldset>
  );
}
