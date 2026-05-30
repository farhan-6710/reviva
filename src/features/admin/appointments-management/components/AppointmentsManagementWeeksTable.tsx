import { cn } from "@/lib/utils";

import { CALENDAR_DAY_LABELS } from "../constants/calendar";
import type { Slot, StatusKey, Week } from "../types/types";
import {
  formatMonthDayLabel,
  getDayLabel,
  isSameCalendarDay,
} from "../utils/calendarUtils";

type AppointmentsManagementWeeksTableProps = {
  year: number;
  month: number;
  weeks: Week[];
  selectedDate: Date;
  getSlot: (year: number, month: number, date: number) => Slot | undefined;
  onAdd: (year: number, month: number, date: number) => void;
  onEdit: (
    year: number,
    month: number,
    date: number,
    appointmentId: string,
  ) => void;
  statusColors: Record<StatusKey, string>;
  statusText: Record<StatusKey, string>;
};

export function AppointmentsManagementWeeksTable({
  year,
  month,
  weeks,
  selectedDate,
  getSlot,
  onAdd,
  onEdit,
  statusColors,
  statusText,
}: AppointmentsManagementWeeksTableProps) {
  const weekCount = weeks.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        className="grid border-b border-border bg-muted text-xs font-semibold tracking-wider text-muted-foreground"
        style={{
          gridTemplateColumns: `140px repeat(${weekCount}, minmax(0, 1fr))`,
        }}
      >
        <div className="px-4 py-3">Day</div>
        {weeks.map((week) => (
          <div key={week.label} className="px-4 py-3 text-center">
            <div>{week.label}</div>
            <div className="text-[11px] text-muted-foreground">{week.range}</div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-border">
        {CALENDAR_DAY_LABELS.map((dayLabel, dayIndex) => (
          <div
            key={dayLabel}
            className="grid"
            style={{
              gridTemplateColumns: `140px repeat(${weekCount}, minmax(0, 1fr))`,
            }}
          >
            <div className="flex items-center border-r border-border bg-muted/40 px-4 py-6 text-sm font-semibold">
              {dayLabel}
            </div>
            {weeks.map((week) => {
              const dateNumber = week.dates[dayIndex];

              if (!dateNumber) {
                return (
                  <div
                    key={`${dayLabel}-${week.label}-empty`}
                    className="min-h-[140px] border-r border-border/70 bg-muted/20"
                  />
                );
              }

              const slot = getSlot(year, month, dateNumber);
              const hasPatients = Boolean(slot?.patients.length);
              const isSelected = isSameCalendarDay(
                selectedDate,
                year,
                month,
                dateNumber,
              );
              const dayName = getDayLabel(year, month, dateNumber);

              return (
                <div
                  key={`${dayLabel}-${week.label}-${dateNumber}`}
                  role="button"
                  tabIndex={0}
                  className={cn(
                    "group flex min-h-[140px] cursor-pointer flex-col border-r p-4 text-left transition hover:bg-muted/40",
                    isSelected
                      ? "border-2 border-primary"
                      : "border-border/70",
                  )}
                  aria-label={`Add appointment for ${dayName} ${formatMonthDayLabel(year, month, dateNumber)}`}
                  aria-current={isSelected ? "date" : undefined}
                  onClick={() => onAdd(year, month, dateNumber)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onAdd(year, month, dateNumber);
                    }
                  }}
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Date</span>
                    <span className="font-mono">
                      {formatMonthDayLabel(year, month, dateNumber)}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-1 flex-col gap-1.5">
                    {hasPatients ? (
                      slot?.patients.map((patient) => (
                        <button
                          key={patient.id}
                          type="button"
                          className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-background/70 px-3 py-1.5 text-left transition hover:border-ring/50"
                          onClick={(event) => {
                            event.stopPropagation();
                            onEdit(year, month, dateNumber, patient.id);
                          }}
                          aria-label={`Edit ${patient.name}`}
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className={`size-2 shrink-0 rounded-full ${statusColors[patient.status]}`}
                            />
                            <span className="truncate text-sm font-medium">
                              {patient.name}
                            </span>
                          </div>
                          <div className="flex shrink-0 flex-col items-end gap-0.5">
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {patient.appointmentTime}
                            </span>
                            <span
                              className={`text-[11px] font-semibold ${statusText[patient.status]}`}
                            >
                              {patient.status}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        Click to add appointments
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
