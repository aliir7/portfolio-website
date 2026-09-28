import { createProjectAction, deleteProjectAction, updateProjectAction } from "@/lib/actions/admin/projects.actions";
import { getAdminProjectsQuery } from "@/query/admin/projects.query";
import type { AdminProject, ProjectInput, ProjectRepository } from "@/types";

function unwrap<T>(result: { success: true; data?: T } | { success: false; error: { message: string } }): T {
  if (!result.success) throw new Error(result.error.message);
  return result.data as T;
}

export const localProjectRepository: ProjectRepository = {
  async list() {
    return getAdminProjectsQuery() as Promise<AdminProject[]>;
  },
  async create(input: ProjectInput) {
    return unwrap(await createProjectAction(input));
  },
  async update(id: string, input: ProjectInput) {
    return unwrap(await updateProjectAction(id, input));
  },
  async delete(id: string) {
    unwrap(await deleteProjectAction(id));
  },
};

export function createEmptyProject(): ProjectInput {
  return {
    title: "",
    slug: "",
    description: "",
    category: "frontend",
    techStack: [],
    repoUrl: "",
    liveUrl: "",
    status: "draft",
  };
}

export type { AdminProject };
