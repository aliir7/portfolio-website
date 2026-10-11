import DashboardOverview from "@/components/admin/dashboard-overview";
import { getProjectsQuery } from "@/query/content.query";

export default async function AdminPage() {
  return <DashboardOverview projects={await getProjectsQuery()} />;
}
