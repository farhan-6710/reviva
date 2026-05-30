import { format } from "date-fns";

import {
  APPOINTMENT_AVAILABLE_TIMES,
  DEFAULT_APPOINTMENT_TIME,
} from "../constants/appointmentSchedule";

export function normalizeAppointmentTime(time: string): string {
  const trimmed = time.trim();
  if (!trimmed) {
    return DEFAULT_APPOINTMENT_TIME;
  }

  const match = APPOINTMENT_AVAILABLE_TIMES.find(
    (option) => option.toLowerCase() === trimmed.toLowerCase(),
  );

  return match ?? trimmed;
}

export function formatDateAndTimeLabel(
  year: number,
  month: number,
  date: number,
  time: string,
): string {
  const dateLabel = format(new Date(year, month - 1, date), "MMMM do yyyy");
  return `${dateLabel} · ${time}`;
}

export function isValidAppointmentTime(time: string): boolean {
  return APPOINTMENT_AVAILABLE_TIMES.some(
    (option) => option.toLowerCase() === time.trim().toLowerCase(),
  );
}

export function parseAppointmentDate(
  dateValue: string | null | undefined,
): { year: number; month: number; day: number } | null {
  if (!dateValue) {
    return null;
  }

  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
}

export function toAppointmentDateString(
  year: number,
  month: number,
  day: number,
): string {
  return format(new Date(year, month - 1, day), "yyyy-MM-dd");
}
