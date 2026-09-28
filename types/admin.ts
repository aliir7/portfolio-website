import type { AdminProfile, AdminProject, ProjectInput } from "@/types";

export interface ProjectRepository {
  list(): Promise<AdminProject[]>;
  create(input: ProjectInput): Promise<AdminProject>;
  update(id: string, input: ProjectInput): Promise<AdminProject>;
  delete(id: string): Promise<void>;
}

export type ProfileInput = Omit<AdminProfile, "skills">;

export interface ProfileRepository {
  get(): Promise<AdminProfile>;
  update(input: AdminProfile): Promise<AdminProfile>;
}
