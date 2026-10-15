import { RiLoader4Line } from "@remixicon/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** shadcn/ui Spinner, using the project's Remix icon set. */
function Spinner({ className, ...props }: ComponentProps<typeof RiLoader4Line>) {
  return <RiLoader4Line role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />;
}

export { Spinner };
