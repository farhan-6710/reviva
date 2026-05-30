import type { StatusKey } from "../types/types";

export const statusOptions: StatusKey[] = ["Upcoming", "Attended", "Missed"];

export const DEFAULT_APPOINTMENT_STATUS: StatusKey = "Upcoming";

export const statusColors: Record<StatusKey, string> = {
  Upcoming: "bg-status-upcoming",
  Attended: "bg-status-done",
  Missed: "bg-status-missed",
};

export const statusText: Record<StatusKey, string> = {
  Upcoming: "text-status-upcoming",
  Attended: "text-status-done",
  Missed: "text-status-missed",
};
