export type Skill = {
  id?: string;
  name: string;
  value: number;
  description: string;
  sortOrder?: number;
};

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

export type ProfileData = Omit<AdminProfile, "skills"> & { skills: Skill[] };
