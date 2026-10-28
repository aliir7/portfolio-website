"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Red confirm button, for deletions and other irreversible actions. */
  destructive?: boolean;
};

type Confirm = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<Confirm | null>(null);

/**
 * One styled confirmation dialog for the whole admin panel, used like `window.confirm`:
 * `if (!(await confirm({ title, description, destructive: true }))) return;`
 */
export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // Kept after closing so the text does not vanish during the fade-out animation.
  const [options, setOptions] = useState<ConfirmOptions>({ title: "" });
  const resolver = useRef<((confirmed: boolean) => void) | null>(null);

  const settle = useCallback((confirmed: boolean) => {
    resolver.current?.(confirmed);
    resolver.current = null;
    setOpen(false);
  }, []);

  const confirm = useCallback<Confirm>(
    (next) =>
      new Promise<boolean>((resolve) => {
        resolver.current?.(false); // a dialog that is still open counts as cancelled
        resolver.current = resolve;
        setOptions(next);
        setOpen(true);
      }),
    [],
  );

  const value = useMemo(() => confirm, [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <AlertDialog open={open} onOpenChange={(next) => !next && settle(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
            {options.description && <AlertDialogDescription>{options.description}</AlertDialogDescription>}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{options.cancelLabel ?? "انصراف"}</AlertDialogCancel>
            <AlertDialogAction variant={options.destructive ? "destructive" : "default"} onClick={() => settle(true)}>
              {options.confirmLabel ?? "تأیید"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const confirm = useContext(ConfirmContext);
  if (!confirm) throw new Error("useConfirm must be used inside <ConfirmProvider>.");
  return confirm;
}
