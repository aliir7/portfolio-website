import { skillsData } from "@/lib/constants";
import type { AdminProfile, ProfileRepository } from "./types";

let profile: AdminProfile = {
  name: "علی رضایی",
  role: "برنامه‌نویس React و Next.js",
  bio: "توسعه‌دهنده وب ساکن تهران با تمرکز بر ساخت رابط‌های کاربری مدرن، سریع و قابل نگهداری.",
  email: "alirezaeii.dev@gmail.com",
  phone: "0902 925 3481",
  location: "تهران، ایران",
  githubUrl: "https://github.com/aliir7",
  resumeUrl: "/resume.pdf",
  skills: skillsData.map((skill) => ({ ...skill })),
};

export const localProfileRepository: ProfileRepository = {
  async get() {
    return { ...profile, skills: profile.skills.map((skill) => ({ ...skill })) };
  },
  async update(input) {
    profile = { ...input, skills: input.skills.map((skill) => ({ ...skill })) };
    return profile;
  },
};
