"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: () => void;
  /** Unsaved changes: closing (X, Esc, outside click, Cancel) asks for confirmation first. */
  dirty?: boolean;
  pending?: boolean;
  children: ReactNode;
};

/**
 * Modal for editing one record from a list. Full screen on phones, a centered 3xl dialog from `sm` up;
 * the header and the footer stay visible while the body scrolls. Cmd/Ctrl+Enter submits, saving cannot be
 * interrupted, and unsaved changes are protected by a confirmation.
 */
export default function FormDialog({ open, onOpenChange, title, description, submitLabel, onSubmit, dirty, pending, children }: Props) {
  const requestOpenChange = (next: boolean) => {
    if (!next) {
      if (pending) return;
      if (dirty && !window.confirm("تغییرات ذخیره‌نشده از بین می‌رود. فرم بسته شود؟")) return;
    }
    onOpenChange(next);
  };

  const submitOnShortcut = (event: KeyboardEvent) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={requestOpenChange}>
      <DialogContent
        onKeyDown={submitOnShortcut}
        className="flex max-h-dvh flex-col gap-0 overflow-hidden p-0 max-sm:h-dvh max-sm:max-w-none max-sm:rounded-none sm:max-h-[90dvh] sm:max-w-3xl"
      >
        <DialogHeader className="border-b px-5 py-4 pe-14 sm:px-6">
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 content-start gap-5 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
        <DialogFooter className="border-t px-5 py-4 sm:px-6">
          <Button variant="ghost" onClick={() => requestOpenChange(false)} disabled={pending}>
            انصراف
          </Button>
          <Button onClick={onSubmit} disabled={pending}>
            {pending ? <Spinner /> : <RiSaveLine />} {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
