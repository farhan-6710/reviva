import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Clock3 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";

import { APPOINTMENT_AVAILABLE_TIMES } from "../constants/appointmentSchedule";
import type { DateAndTimeValue } from "../types/types";
import { formatDateAndTimeLabel } from "../utils/appointmentScheduleUtils";

type AppointmentDateTimePickerProps = {
  label: string;
  value: DateAndTimeValue | null;
  onChange: (value: DateAndTimeValue | null) => void;
  disabled?: boolean;
};

export function AppointmentDateTimePicker({
  label,
  value,
  onChange,
  disabled = false,
}: AppointmentDateTimePickerProps) {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const timeContainerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value
    ? new Date(value.year, value.month - 1, value.day)
    : undefined;

  useEffect(() => {
    if (!timeOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        timeContainerRef.current &&
        !timeContainerRef.current.contains(event.target as Node)
      ) {
        setTimeOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [timeOpen]);

  const displayLabel = value
    ? formatDateAndTimeLabel(value.year, value.month, value.day, value.time)
    : "Not set";

  return (
    <div className="space-y-2">
      <span className="block text-xs font-semibold text-muted-foreground">
        {label}
      </span>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              className="h-auto w-full justify-start gap-2 rounded-lg border border-ring/60 bg-card px-3 py-2 text-sm font-medium text-foreground shadow-xs hover:bg-muted/50 dark:border-input dark:bg-muted/40"
            >
              <CalendarIcon className="size-3.5 opacity-70" aria-hidden="true" />
              {value
                ? format(
                    new Date(value.year, value.month - 1, value.day),
                    "MMMM do yyyy",
                  )
                : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto border-muted-foreground/10 p-0 shadow-2xl"
            align="start"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              defaultMonth={selectedDate}
              onSelect={(date) => {
                if (!date) {
                  return;
                }

                onChange({
                  year: date.getFullYear(),
                  month: date.getMonth() + 1,
                  day: date.getDate(),
                  time: value?.time ?? "",
                });
                setDateOpen(false);
              }}
              className="rounded-md border-none"
            />
          </PopoverContent>
        </Popover>

        <div ref={timeContainerRef} className="relative">
          <Button
            type="button"
            variant="outline"
            disabled={disabled || !value}
            aria-expanded={timeOpen}
            aria-haspopup="listbox"
            onClick={() => setTimeOpen((current) => !current)}
            className={cn(
              "h-auto w-full justify-between gap-2 rounded-lg border border-ring/60 bg-card px-3 py-2 text-sm font-medium text-foreground shadow-xs hover:bg-muted/50 dark:border-input dark:bg-muted/40",
            )}
          >
            <span className="flex items-center gap-2">
              <Clock3 className="size-3.5 opacity-70" aria-hidden="true" />
              {value?.time?.trim() ? value.time : "Select time"}
            </span>
            <ChevronDown
              className={cn(
                "size-3.5 opacity-50 transition-transform",
                timeOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </Button>

          {timeOpen && value ? (
            <div
              role="listbox"
              aria-label={`${label} times`}
              className="absolute bottom-[calc(100%+0.5rem)] left-0 z-50 w-full overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10"
            >
              <div className="border-b border-border px-4 py-3">
                <p className="text-center text-sm font-medium">Select time</p>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  {displayLabel}
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto overscroll-contain p-4">
                <div className="grid grid-cols-1 gap-2">
                  {APPOINTMENT_AVAILABLE_TIMES.map((time) => {
                    const isSelected =
                      time.toLowerCase() === value.time.trim().toLowerCase();

                    return (
                      <Button
                        key={time}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        className="w-full shrink-0 justify-center"
                        onClick={() => {
                          onChange({ ...value, time });
                          setTimeOpen(false);
                        }}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
