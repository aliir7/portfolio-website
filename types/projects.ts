export type ProjectCategory = "frontend" | "fullstack" | "dashboard";
export type ProjectStatus = "published" | "draft";

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

export type ProjectInput = Omit<AdminProject, "id" | "image" | "createdAt" | "updatedAt"> & {
  image?: string | null;
  repoUrl: string;
  liveUrl: string;
};
