import { createSkillAction, getProfileAction, updateProfileAction } from "@/actions/admin";
import type { AdminProfile, ProfileRepository } from "./types";

export const localProfileRepository: ProfileRepository = {
  async get() {
    const result = await getProfileAction();
    if (!result.profile) throw new Error("پروفایل هنوز در دیتابیس ایجاد نشده است.");
    return {
      name: result.profile.name,
      role: result.profile.role,
      bio: result.profile.bio,
      email: result.profile.email,
      phone: result.profile.phone,
      location: result.profile.location,
      githubUrl: result.profile.githubUrl,
      resumeUrl: result.profile.resumeUrl,
      skills: result.skills.map((skill) => ({ name: skill.name, value: skill.value, description: skill.description })),
    };
  },
  async update(input: AdminProfile) {
    await updateProfileAction(
      {
        name: input.name,
        role: input.role,
        bio: input.bio,
        email: input.email,
        phone: input.phone,
        location: input.location,
        githubUrl: input.githubUrl,
        resumeUrl: input.resumeUrl,
      },
      input.skills,
    );
    return input;
  },
};

export { createSkillAction };
