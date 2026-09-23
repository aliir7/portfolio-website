import type { ProjectCategory } from "@/types";
import type { Skill } from "@/types";

export type AdminProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  repoUrl: string;
  liveUrl: string;
  status: "published" | "draft";
};

export type ProjectInput = Omit<AdminProject, "id">;

export interface ProjectRepository {
  list(): Promise<AdminProject[]>;
  create(input: ProjectInput): Promise<AdminProject>;
  update(id: string, input: ProjectInput): Promise<AdminProject>;
  delete(id: string): Promise<void>;
}

export type AdminProfile = {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  resumeUrl: string;
  skills: Skill[];
};

export type ProfileInput = Omit<AdminProfile, "skills">;

export interface ProfileRepository {
  get(): Promise<AdminProfile>;
  update(input: AdminProfile): Promise<AdminProfile>;
}
