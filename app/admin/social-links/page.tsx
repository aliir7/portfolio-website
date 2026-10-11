import SocialLinksManager from "@/components/admin/social-links-manager";
import { getSocialLinksQuery } from "@/query/content.query";

export default async function AdminSocialLinksPage() {
  const rows = await getSocialLinksQuery();
  return <SocialLinksManager initial={rows.map(({ platform, href }) => ({ platform, href }))} />;
}
