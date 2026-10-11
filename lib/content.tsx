"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PublicContent } from "@/types";

const ContentContext = createContext<PublicContent | null>(null);

/** Receives content already resolved to one locale by `getPublicContent` on the server. */
export function ContentProvider({ value, children }: { value: PublicContent; children: ReactNode }) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error("useContent must be used inside <ContentProvider>.");
  return content;
}
