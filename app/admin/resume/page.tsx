import ResumeManager from "@/components/admin/resume-manager";
import { getResumeItemsQuery } from "@/query/content.query";

export default async function AdminResumePage() {
  const rows = await getResumeItemsQuery();
  return (
    <ResumeManager
      initial={rows.map(({ category, organization, title, period, content }) => ({ category, organization, title, period, content }))}
    />
  );
}
