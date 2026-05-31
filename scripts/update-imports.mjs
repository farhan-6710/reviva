import { readFileSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import path from "node:path";

const root = path.resolve("src");

const replacements = [
  ["@/components/ui/", "@/shared/ui/"],
  ["@/lib/utils", "@/shared/lib/utils"],
  ["@/lib/supabase", "@/shared/lib/supabase"],
  ["@/lib/admin/", "@/shared/lib/admin/"],
  ["@/components/admin/Sidebar", "@/features/admin/shell/components/Sidebar"],
  ["@/constants/admin/navigation", "@/features/admin/shell/constants/navigation"],
  ["@/components/admin/dashboard/", "@/features/admin/dashboard/components/"],
  ["@/constants/admin/dashboard", "@/features/admin/dashboard/constants/dashboard"],
  ["@/pages/admin/DashboardPage", "@/features/admin/dashboard/pages/DashboardPage"],
  ["@/components/admin/analytics/", "@/features/admin/analytics/components/"],
  ["@/constants/admin/analytics/sessionActivity", "@/features/admin/analytics/constants/sessionActivity"],
  ["@/lib/admin/analytics/contributionLevels", "@/features/admin/analytics/lib/contributionLevels"],
  ["@/types/admin/analytics/types", "@/features/admin/analytics/types/types"],
  ["@/utils/admin/analytics/postActivityLevels", "@/features/admin/analytics/utils/postActivityLevels"],
  ["@/pages/admin/AnalyticsPage", "@/features/admin/analytics/pages/AnalyticsPage"],
  ["@/components/admin/profile/", "@/features/admin/profile/components/"],
  ["@/constants/admin/profile/profile", "@/features/admin/profile/constants/profile"],
  ["@/types/admin/profile/types", "@/features/admin/profile/types/types"],
  ["@/pages/admin/ProfilePage", "@/features/admin/profile/pages/ProfilePage"],
  ["@/components/admin/reports/", "@/features/admin/reports/components/"],
  ["@/constants/admin/reports/reports", "@/features/admin/reports/constants/reports"],
  ["@/types/admin/reports/types", "@/features/admin/reports/types/types"],
  ["@/pages/admin/ReportsPage", "@/features/admin/reports/pages/ReportsPage"],
  ["@/components/admin/settings/", "@/features/admin/settings/components/"],
  ["@/constants/admin/settings/settings", "@/features/admin/settings/constants/settings"],
  ["@/types/admin/settings/types", "@/features/admin/settings/types/types"],
  ["@/hooks/admin/useSettingsPreferences", "@/features/admin/settings/hooks/useSettingsPreferences"],
  ["@/pages/admin/SettingsPage", "@/features/admin/settings/pages/SettingsPage"],
  ["@/components/auth/ProtectedRoute", "@/features/admin/auth/components/ProtectedRoute"],
  ["@/components/admin/appointment-booking/", "@/features/admin/appointment-booking/components/"],
  ["@/constants/admin/appointment-booking/AppointmentBooking", "@/features/admin/appointment-booking/constants/AppointmentBooking"],
  ["@/types/admin/appointment-booking/types", "@/features/admin/appointment-booking/types/types"],
  ["@/hooks/admin/useAppointmentBooking", "@/features/admin/appointment-booking/hooks/useAppointmentBooking"],
  ["@/pages/admin/AppointmentBookingPage", "@/features/admin/appointment-booking/pages/AppointmentBookingPage"],
  ["@/constants/admin/posts-management/postSchedule", "@/features/admin/posts-management/constants/postSchedule"],
  ["@/types/admin/posts-management/types", "@/features/admin/posts-management/types/types"],
  ["@/utils/admin/posts-management/", "@/features/admin/posts-management/utils/"],
  ["@/hooks/admin/usePostsManagement", "@/features/admin/posts-management/hooks/usePostsManagement"],
  ["@/types/admin/tasks-management/types", "@/features/admin/tasks-management/types/types"],
  ["@/hooks/admin/useTasksManagement", "@/features/admin/tasks-management/hooks/useTasksManagement"],
  ["@/components/public/PublicHeader", "@/features/public/shell/components/PublicHeader"],
  ["@/components/public/PublicFooter", "@/features/public/shell/components/PublicFooter"],
  ["@/components/public/auth/", "@/features/public/auth/components/"],
  ["@/constants/public/auth/auth", "@/features/public/auth/constants/auth"],
  ["@/constants/public", "@/features/public/constants"],
  ["@/pages/auth/AuthPage", "@/features/public/auth/pages/AuthPage"],
  ["@/pages/public/HomePage", "@/features/public/home/pages/HomePage"],
  ["@/pages/public/AboutPage", "@/features/public/about/pages/AboutPage"],
  ["@/pages/NotFoundPage", "@/features/not-found/pages/NotFoundPage"],
  ["@/providers/AuthProvider", "@/shared/providers/AuthProvider"],
  ["@/providers/admin/ThemePreferenceProvider", "@/shared/providers/admin/ThemePreferenceProvider"],
  ["@/layouts/admin/AdminLayout", "@/shared/layouts/admin/AdminLayout"],
  ["@/layouts/public/PublicLayout", "@/shared/layouts/public/PublicLayout"],
  ["@/utils/admin/authUserDisplay", "@/shared/utils/admin/authUserDisplay"],
  ["from \"./providers/AuthProvider\"", "from \"@/shared/providers/AuthProvider\""],
  ["from \"./providers/admin/ThemePreferenceProvider\"", "from \"@/shared/providers/admin/ThemePreferenceProvider\""],
  ["from \"./router\"", "from \"@/app/router\""],
  ["from \"./lib/admin/themePreferenceStorage.ts\"", "from \"@/shared/lib/admin/themePreferenceStorage\""],
  ["from \"./lib/admin/themePreferenceStorage\"", "from \"@/shared/lib/admin/themePreferenceStorage\""],
];

const files = globSync("**/*.{ts,tsx}", { cwd: root, recursive: true });

for (const file of files) {
  const filePath = path.join(root, file);
  let content = readFileSync(filePath, "utf8");
  let changed = false;

  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(filePath, content);
  }
}

console.log(`Updated imports in ${files.length} files under src/`);
