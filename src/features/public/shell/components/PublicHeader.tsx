import { Link, NavLink } from "react-router";
import { Sun, Moon } from "lucide-react";
import { publicNavLinks } from "@/features/public/constants";
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { useThemePreference } from "@/shared/providers/admin/ThemePreferenceProvider";
import { useAuth } from "@/shared/providers/AuthProvider";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
} from "@/shared/utils/admin/authUserDisplay";

export function PublicHeader() {
  const { isDarkMode, setDarkMode } = useThemePreference();
  const { user } = useAuth();

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);
  const avatarUrl = getUserAvatarUrl(user);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-primary dark:text-foreground flex items-center gap-2"
        >
          <img
            src={
              isDarkMode
                ? "/Gemini_Generated_Image_73qdnh73qdnh73qd-removebg-preview.png"
                : "/logo-light-removebg-preview.png"
            }
            alt="Reviva Logo"
            className="size-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicNavLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <Sun className="size-4 text-muted-foreground" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setDarkMode}
              aria-label="Toggle dark mode"
            />
            <Moon className="size-4 text-muted-foreground" />
          </div>

          {/* User Profile / Login Action */}
          {user ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
              title="Go to Staff Portal"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="size-8 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {initials}
                </div>
              )}
            </Link>
          ) : (
            <Button asChild className="rounded-full">
              <Link to="/auth">Team login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
