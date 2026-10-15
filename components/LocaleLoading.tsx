import { getTranslations } from "next-intl/server";
import PageLoading from "@/components/PageLoading";

/** Body of every public `loading.tsx` (translated label + shadcn Spinner). */
export default async function LocaleLoading() {
  const t = await getTranslations("errorPage");
  return <PageLoading label={t("loading")} />;
}
