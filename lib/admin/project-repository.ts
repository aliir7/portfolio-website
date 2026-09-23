import { mockProjects } from "./mock-data";
import type { AdminProject, ProjectInput, ProjectRepository } from "./types";

let store = [...mockProjects];

export const localProjectRepository: ProjectRepository = {
  async list() {
    return [...store];
  },
  async create(input: ProjectInput) {
    const project = { ...input, id: crypto.randomUUID() };
    store = [project, ...store];
    return project;
  },
  async update(id: string, input: ProjectInput) {
    const project = { ...input, id };
    store = store.map((item) => (item.id === id ? project : item));
    return project;
  },
  async delete(id: string) {
    store = store.filter((item) => item.id !== id);
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
