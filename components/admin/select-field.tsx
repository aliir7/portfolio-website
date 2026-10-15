"use client";

import { Label } from "@/components/ui/label";
import FieldError from "./field-error";

type Option<T extends string> = { value: T; label: string; disabled?: boolean };

type Props<T extends string> = {
  id: string;
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  error?: string;
  onBlur?: () => void;
};

export default function SelectField<T extends string>({ id, label, value, options, onChange, error, onBlur }: Props<T>) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value as T)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="border-input bg-background/60 focus:ring-ring h-9 rounded-lg border px-3 text-sm outline-none focus:ring-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={id} error={error} />
    </div>
  );
}
