import { createSkillAction, updateProfileAction } from "@/lib/actions/admin/profile.actions";
import { getAdminProfileQuery } from "@/query/admin/profile.query";
import type { AdminProfile, ProfileRepository } from "./types";

export const localProfileRepository: ProfileRepository = {
  async get() {
    const result = await getAdminProfileQuery();
    if (!result.profile) throw new Error("Profile has not been created yet.");
    return {
      name: result.profile.name,
      role: result.profile.role,
      bio: result.profile.bio,
      email: result.profile.email,
      phone: result.profile.phone,
      location: result.profile.location,
      githubUrl: result.profile.githubUrl,
      resumeUrl: result.profile.resumeUrl,
      skills: result.skills.map((skill) => ({
        name: skill.name,
        value: skill.value,
        description: skill.description,
      })),
    };
  },
  async update(input: AdminProfile) {
    const result = await updateProfileAction(
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
    if (!result.success) throw new Error(result.error.message);
    return input;
  },
};

export { createSkillAction };
