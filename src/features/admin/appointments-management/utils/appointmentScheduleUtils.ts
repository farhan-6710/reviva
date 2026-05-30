import { format, isValid, parse } from "date-fns";

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

function appointmentTimeSortKey(time: string): number {
  const normalized = normalizeAppointmentTime(time);
  const slotIndex = APPOINTMENT_AVAILABLE_TIMES.indexOf(normalized);

  if (slotIndex >= 0) {
    return slotIndex;
  }

  const parsed = parse(normalized, "h:mm a", new Date(2000, 0, 1));

  if (isValid(parsed)) {
    return parsed.getHours() * 60 + parsed.getMinutes();
  }

  return Number.MAX_SAFE_INTEGER;
}

export function compareAppointmentTimes(a: string, b: string): number {
  return appointmentTimeSortKey(a) - appointmentTimeSortKey(b);
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
