"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  /** Accessible name when there is no visible label. */
  ariaLabel?: string;
  min?: number;
  max?: number;
  suffix?: string;
};

/** Integer input that keeps the value inside [min, max] (empty or invalid input becomes `min`). */
export default function NumberField({ id, value, onChange, label, ariaLabel, min = 0, max = Number.MAX_SAFE_INTEGER, suffix }: Props) {
  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          type="number"
          min={min}
          max={max}
          value={value}
          aria-label={label ? undefined : ariaLabel}
          className={suffix ? "pe-8" : undefined}
          onChange={(event) => onChange(Math.min(max, Math.max(min, Math.trunc(Number(event.target.value)) || min)))}
        />
        {suffix && <span className="text-muted-foreground absolute end-3 top-1/2 -translate-y-1/2 text-sm">{suffix}</span>}
      </div>
    </div>
  );
}
