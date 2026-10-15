import DashboardOverview from "@/components/admin/dashboard-overview";
import { getDashboardQuery } from "@/query/dashboard.query";

export default async function AdminPage() {
  return <DashboardOverview data={await getDashboardQuery()} />;
}
