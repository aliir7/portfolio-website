"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useConfirm } from "./confirm-provider";

/**
 * Warns before the user loses unsaved changes on a full-page form:
 * - reload, tab close and external links use the browser's own prompt (`beforeunload`);
 * - clicks on in-app links ask through the styled confirm dialog before navigating.
 * The browser back button is not intercepted (the App Router has no supported way to block it).
 */
export function useUnsavedChangesGuard(isDirty: boolean) {
  const router = useRouter();
  const confirm = useConfirm();

  useEffect(() => {
    if (!isDirty) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    // Capture phase on `document`: runs before Next's <Link> handlers, so we can cancel the navigation.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (url.origin !== window.location.origin || samePage) return;

      event.preventDefault();
      event.stopPropagation();
      void confirm({
        title: "تغییرات ذخیره‌نشده",
        description: "تغییراتی که ذخیره نکرده‌ای از بین می‌رود. صفحه را ترک می‌کنی؟",
        confirmLabel: "ترک صفحه",
        cancelLabel: "ماندن",
        destructive: true,
      }).then((leave) => {
        if (leave) router.push(`${url.pathname}${url.search}${url.hash}`);
      });
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, [isDirty, confirm, router]);
}
