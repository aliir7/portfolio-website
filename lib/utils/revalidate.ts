import { revalidatePath, updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache";

/**
 * Every admin mutation of public content ends here (it runs inside a Server Action):
 * - `updateTag` expires the cached queries immediately, so the next read is fresh;
 * - `revalidatePath` drops the prerendered pages built from them.
 */
export function revalidatePublicContent() {
  for (const tag of cacheTags) updateTag(tag);
  revalidatePath("/", "layout");
}
