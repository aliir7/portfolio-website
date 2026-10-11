"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LocalizedText } from "@/types";

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
};

/** One text input per language for a `{ fa, en }` field. Used by every admin form. */
export default function LocalizedField({ id, label, value, onChange, multiline, rows = 3 }: Props) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1 text-sm font-medium">{label}</legend>
      {locales.map(({ code, label: localeLabel, dir }) => {
        const fieldId = `${id}-${code}`;
        const update = (text: string) => onChange({ ...value, [code]: text });
        return (
          <div key={code} className="grid gap-1">
            <Label htmlFor={fieldId} className="text-muted-foreground text-xs">
              {localeLabel}
            </Label>
            {multiline ? (
              <Textarea
                id={fieldId}
                dir={dir}
                rows={rows}
                value={value[code]}
                onChange={(event) => update(event.target.value)}
              />
            ) : (
              <Input
                id={fieldId}
                dir={dir}
                value={value[code]}
                onChange={(event) => update(event.target.value)}
              />
            )}
          </div>
        );
      })}
    </fieldset>
  );
}
