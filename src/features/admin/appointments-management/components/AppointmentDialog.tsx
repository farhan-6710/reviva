import { useState } from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { cn } from "@/shared/lib/utils";

import type { DateAndTimeValue, StatusKey } from "../types/types";
import { AppointmentDateTimePicker } from "./AppointmentDateTimePicker";

const fieldClassName = cn(
  "mt-2 w-full rounded-lg border border-ring/60 bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-colors",
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
  "dark:border-input dark:bg-muted/40",
);

type AppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  appointmentId: string;
  patientName: string;
  dateAndTime: DateAndTimeValue | null;
  appointmentStatus: StatusKey;
  statusOptions: StatusKey[];
  onPatientNameChange: (value: string) => void;
  onDateAndTimeChange: (value: DateAndTimeValue | null) => void;
  onAppointmentStatusChange: (value: StatusKey) => void;
  onSave: () => void;
  onDelete?: () => void;
  isSaving?: boolean;
};

export function AppointmentDialog({
  open,
  onOpenChange,
  isEditing,
  appointmentId,
  patientName,
  dateAndTime,
  appointmentStatus,
  statusOptions,
  onPatientNameChange,
  onDateAndTimeChange,
  onAppointmentStatusChange,
  onSave,
  onDelete,
  isSaving = false,
}: AppointmentDialogProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const canSave =
    patientName.trim() &&
    dateAndTime?.time.trim() &&
    dateAndTime.day &&
    dateAndTime.month &&
    dateAndTime.year;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="overflow-visible">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Appointment" : "Add Appointment"}
            </DialogTitle>
            <DialogDescription>
              Set the patient name, appointment date and time, and status.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isEditing ? (
              <label className="block text-xs font-semibold text-muted-foreground">
                Appointment ID
                <input
                  value={appointmentId}
                  readOnly
                  className={cn(fieldClassName, "bg-muted/40 dark:bg-muted/50")}
                />
              </label>
            ) : null}

            <label className="block text-xs font-semibold text-muted-foreground">
              Patient name
              <input
                value={patientName}
                onChange={(event) => onPatientNameChange(event.target.value)}
                placeholder="e.g. Jane Doe"
                className={fieldClassName}
              />
            </label>

            <AppointmentDateTimePicker
              label="Date & time"
              value={dateAndTime}
              onChange={onDateAndTimeChange}
              disabled={isSaving}
            />

            <label className="block text-xs font-semibold text-muted-foreground">
              Status
              <select
                value={appointmentStatus}
                onChange={(event) =>
                  onAppointmentStatusChange(event.target.value as StatusKey)
                }
                className={fieldClassName}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <DialogFooter>
            {isEditing && onDelete ? (
              <Button
                variant="destructive"
                onClick={() => setIsConfirmOpen(true)}
                className="mr-auto"
                disabled={isSaving}
              >
                Remove Appointment
              </Button>
            ) : null}
            <DialogClose asChild>
              <Button variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={onSave}
              disabled={!canSave || isSaving}
              className="rounded-full"
            >
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Add Appointment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove appointment?</DialogTitle>
            <DialogDescription>
              This removes the appointment from the current day. This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete?.();
                setIsConfirmOpen(false);
              }}
              disabled={isSaving}
            >
              Remove Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
