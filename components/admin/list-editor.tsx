"use client";

import type { ReactNode } from "react";
import { RiAddLine, RiArrowDownLine, RiArrowUpLine, RiDeleteBinLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PageProps = {
  eyebrow: string;
  title: string;
  description: string;
  onSave: () => void;
  saving?: boolean;
  addLabel: string;
  onAdd: () => void;
  addDisabled?: boolean;
  isEmpty: boolean;
  children: ReactNode;
};

/** Page frame shared by every ordered-list editor: heading, save, item list, add button. */
export function ListEditorPage({ eyebrow, title, description, onSave, saving, addLabel, onAdd, addDisabled, isEmpty, children }: PageProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">{eyebrow}</p>
          <h2 className="text-3xl font-black">{title}</h2>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        <Button onClick={onSave} disabled={saving}>{saving ? <Spinner /> : <RiSaveLine />} ذخیره تغییرات</Button>
      </section>
      <div className="grid gap-4">
        {isEmpty && <p className="text-muted-foreground rounded-2xl border border-dashed p-8 text-center">موردی ثبت نشده است.</p>}
        {children}
      </div>
      <Button variant="outline" onClick={onAdd} disabled={addDisabled}><RiAddLine /> {addLabel}</Button>
    </div>
  );
}

type ItemProps = {
  title: string;
  index: number;
  count: number;
  onMove: (offset: -1 | 1) => void;
  onRemove: () => void;
  children: ReactNode;
};

/** One editable row with move up/down and delete controls. */
export function ListItemCard({ title, index, count, onMove, onRemove, children }: ItemProps) {
  return (
    <Card className="glass-panel border-0">
      <CardHeader className="flex-row items-center justify-between gap-3">
        <CardTitle className="text-base">{title} {index + 1}</CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" aria-label="انتقال به بالا" disabled={index === 0} onClick={() => onMove(-1)}><RiArrowUpLine /></Button>
          <Button variant="ghost" size="icon" aria-label="انتقال به پایین" disabled={index === count - 1} onClick={() => onMove(1)}><RiArrowDownLine /></Button>
          <Button variant="ghost" size="icon" aria-label="حذف" onClick={onRemove}><RiDeleteBinLine /></Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5">{children}</CardContent>
    </Card>
  );
}
