"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Defaults to "ltr" (emails, URLs, slugs); use "auto" for free text in any language. */
  dir?: "ltr" | "rtl" | "auto";
  /** Setting `rows` renders a textarea instead of a single-line input. */
  rows?: number;
  type?: "text" | "password";
};

/** Single-language field for values that are not translated. */
export default function TextField({ id, label, value, onChange, placeholder, dir = "ltr", rows, type = "text" }: Props) {
  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      {rows ? (
        <Textarea id={id} dir={dir} rows={rows} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <Input id={id} type={type} dir={dir} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      )}
    </div>
  );
}
