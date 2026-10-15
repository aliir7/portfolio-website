"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FieldError from "./field-error";

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
  error?: string;
  onBlur?: () => void;
};

/** Single-language field for values that are not translated. */
export default function TextField({ id, label, value, onChange, placeholder, dir = "ltr", rows, type = "text", error, onBlur }: Props) {
  const shared = {
    id,
    dir,
    value,
    placeholder,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;

  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      {rows ? (
        <Textarea {...shared} rows={rows} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <Input {...shared} type={type} onChange={(event) => onChange(event.target.value)} />
      )}
      <FieldError id={id} error={error} />
    </div>
  );
}
