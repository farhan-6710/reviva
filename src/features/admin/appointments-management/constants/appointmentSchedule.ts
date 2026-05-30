export const DEFAULT_APPOINTMENT_TIME = "9:00 AM";

function formatHourLabel(hour24: number, minute: number): string {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minuteLabel = minute.toString().padStart(2, "0");

  return `${hour12}:${minuteLabel} ${period}`;
}

function buildAppointmentAvailableTimes(): string[] {
  const times: string[] = [];

  for (let hour = 9; hour <= 18; hour += 1) {
    times.push(formatHourLabel(hour, 0));

    if (hour < 18) {
      times.push(formatHourLabel(hour, 30));
    }
  }

  return times;
}

export const APPOINTMENT_AVAILABLE_TIMES = buildAppointmentAvailableTimes();
