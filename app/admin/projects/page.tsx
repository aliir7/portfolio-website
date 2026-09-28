import ProjectsManager from "@/components/admin/projects-manager";
import { getAdminProjectsQuery } from "@/query/admin/projects.query";
import { mockProjects } from "@/lib/admin/mock-data";

export default async function AdminProjectsPage() {
  let initialItems = mockProjects;

  try {
    const projects = await getAdminProjectsQuery();
    if (projects.length) initialItems = projects;
  } catch {
    // Keep the existing mock data as a safe UI fallback until the database is configured.
  }

  return <ProjectsManager initialItems={initialItems} />;
}
