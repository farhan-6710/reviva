import { ProfileCredentialsList } from "@/features/admin/profile/components/ProfileCredentialsList";
import { ProfileDetailsCard } from "@/features/admin/profile/components/ProfileDetailsCard";
import { ProfileHeader } from "@/features/admin/profile/components/ProfileHeader";
import { ProfileStatsGrid } from "@/features/admin/profile/components/ProfileStatsGrid";
import { staffProfile } from "@/features/admin/profile/constants/profile";
import { useAuth } from "@/shared/providers/AuthProvider";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your Reviva clinician profile, professional credentials, and current
          practice performance snapshot.
        </p>
      </div>

      <ProfileHeader user={user} profile={staffProfile} />

      <ProfileStatsGrid stats={staffProfile.stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileDetailsCard user={user} profile={staffProfile} />
        <ProfileCredentialsList
          credentials={staffProfile.credentials}
          specializations={staffProfile.specializations}
        />
      </div>
    </section>
  );
}
