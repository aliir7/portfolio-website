import { projects } from "@/lib/constants";
import type { AdminProject } from "@/types";

export const mockProjects: AdminProject[] = projects.map((project) => ({
  id: project.id,
  title: project.title,
  slug: project.slug,
  description: project.description,
  category: project.category,
  techStack: project.techStack,
  image: project.image ?? null,
  repoUrl: project.repoUrl ?? null,
  liveUrl: project.liveUrl ?? null,
  status: "published",
  createdAt: new Date(project.createdAt),
  updatedAt: new Date(project.createdAt),
}));
