import type { ComponentProps } from "react";
import ProfileManager from "@/components/admin/profile-manager";
import { getAdminProfileQuery } from "@/query/admin/profile.query";

export default async function AdminProfilePage() {
  let initialProfile: ComponentProps<typeof ProfileManager>["initialProfile"];

  try {
    const result = await getAdminProfileQuery();

    initialProfile = result.profile
      ? {
          name: result.profile.name,
          role: result.profile.role,
          bio: result.profile.bio,
          email: result.profile.email,
          phone: result.profile.phone,
          location: result.profile.location,
          githubUrl: result.profile.githubUrl,
          resumeUrl: result.profile.resumeUrl,
          skills: result.skills.map((skill) => ({
            id: skill.id,
            name: skill.name,
            value: skill.value,
            description: skill.description,
            sortOrder: skill.sortOrder,
          })),
        }
      : undefined;
  } catch {
    // Keep the existing component fallback until the database is configured.
  }

  return <ProfileManager initialProfile={initialProfile} />;
}
