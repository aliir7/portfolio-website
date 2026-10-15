import SeoSettingsForm from "@/components/admin/seo-settings-form";
import { getSeoSettingsQuery } from "@/query/settings.query";

export default async function AdminSettingsPage() {
  return <SeoSettingsForm initial={(await getSeoSettingsQuery()) ?? undefined} />;
}
