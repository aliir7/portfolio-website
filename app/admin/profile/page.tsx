import ProfileManager from "@/components/admin/profile-manager";
import { getProfileQuery, getSkillsQuery } from "@/query/content.query";

export default async function AdminProfilePage() {
  const [profile, skills] = await Promise.all([getProfileQuery(), getSkillsQuery()]);

  // Before the first save/seed there is no profile row: the form starts empty.
  return (
    <ProfileManager
      initial={
        profile
          ? {
              profile: {
                name: profile.name,
                role: profile.role,
                bio: profile.bio,
                location: profile.location,
                email: profile.email,
                phone: profile.phone,
                resumeUrl: profile.resumeUrl,
              },
              skills: skills.map(({ name, value, description }) => ({ name, value, description })),
            }
          : undefined
      }
    />
  );
}
