export type Skill = {
  name: string;
  value: number;
  description: string;
};

// این تایپ دقیقاً منطبق با schema بک‌اند است
// وقتی API آماده شد، فقط کافی است از این تایپ استفاده شود

export type ProjectCategory = "frontend" | "fullstack" | "dashboard";

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
  createdAt: string; // ISO date از بک‌اند
}

export type FilterCategory = "all" | ProjectCategory;
