import { revalidatePath } from "next/cache";

/** Every admin mutation of public content ends here, so the site is refreshed in one place. */
export function revalidatePublicContent() {
  revalidatePath("/", "layout");
}
