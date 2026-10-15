import { getTranslations } from "next-intl/server";
import PageLoading from "@/components/PageLoading";

export default async function BlogLoading() {
  const t = await getTranslations("errorPage");
  return <PageLoading label={t("loading")} />;
}
