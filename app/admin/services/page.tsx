import ServicesManager from "@/components/admin/services-manager";
import { getServicesQuery } from "@/query/content.query";

export default async function AdminServicesPage() {
  const rows = await getServicesQuery();
  return <ServicesManager initial={rows.map(({ title, subtitle, description }) => ({ title, subtitle, description }))} />;
}
