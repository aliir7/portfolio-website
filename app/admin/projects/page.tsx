import ProjectsManager from "@/components/admin/projects-manager";
import { getProjectsQuery } from "@/query/content.query";

export default async function AdminProjectsPage() {
  return <ProjectsManager initialItems={await getProjectsQuery()} />;
}
