import { projects } from "@/lib/constants";
import type { AdminProject } from "./types";

export const mockProjects: AdminProject[] = projects.map((project) => ({
  id: project.id,
  title: project.title,
  slug: project.slug,
  description: project.description,
  category: project.category,
  techStack: project.techStack,
  repoUrl: project.repoUrl ?? "",
  liveUrl: project.liveUrl ?? "",
  status: "published",
}));
