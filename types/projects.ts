import type { z } from "zod";
import type { projectSchema } from "@/lib/validations/projects";

export type ProjectCategory = "frontend" | "fullstack" | "dashboard";
export type ProjectStatus = "published" | "draft";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  createdAt: string;
}

export type ResumeItemType = {
  id: string;
  category: "education" | "experience" | string;
  organization: string;
  title: string;
  date: string;
  content: string;
};

export type FilterCategory = "all" | ProjectCategory;

export type AdminProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  image: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectInput = z.infer<typeof projectSchema>;
