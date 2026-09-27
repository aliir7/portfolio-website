import { createProjectAction, deleteProjectAction, listProjectsAction, updateProjectAction } from "@/actions/admin";
import type { AdminProject, ProjectInput, ProjectRepository } from "./types";

export const localProjectRepository: ProjectRepository = {
  async list() {
    return listProjectsAction() as Promise<AdminProject[]>;
  },
  async create(input: ProjectInput) {
    return createProjectAction(input) as Promise<AdminProject>;
  },
  async update(id: string, input: ProjectInput) {
    return updateProjectAction(id, input) as Promise<AdminProject>;
  },
  async delete(id: string) {
    await deleteProjectAction(id);
  },
};

export function createEmptyProject(): ProjectInput {
  return { title: "", slug: "", description: "", category: "frontend", techStack: [], repoUrl: "", liveUrl: "", status: "draft" };
}

export type { AdminProject };
