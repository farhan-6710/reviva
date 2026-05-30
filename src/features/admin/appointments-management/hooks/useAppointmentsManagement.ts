import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_APPOINTMENT_STATUS,
  statusOptions,
} from "../constants/appointmentsManagement";
import { DEFAULT_APPOINTMENT_TIME } from "../constants/appointmentSchedule";
import type {
  ActiveSlot,
  DateAndTimeValue,
  StatusKey,
} from "../types/types";
import { getDayLabel } from "../utils/calendarUtils";
import {
  isValidAppointmentTime,
  normalizeAppointmentTime,
  parseAppointmentDate,
  toAppointmentDateString,
} from "../utils/appointmentScheduleUtils";
import {
  appointmentsToSlots,
  createAppointment,
  deleteAppointment,
  fetchAppointmentsForMonth,
  updateAppointment,
} from "../utils/appointmentsRepository";

function toDateAndTimeValue(
  dateValue: string | null | undefined,
  timeValue: string | null | undefined,
): DateAndTimeValue | null {
  const dateParts = parseAppointmentDate(dateValue);
  const time = timeValue?.trim();

  if (!dateParts || !time || !isValidAppointmentTime(time)) {
    return null;
  }

  return {
    year: dateParts.year,
    month: dateParts.month,
    day: dateParts.day,
    time: normalizeAppointmentTime(time),
  };
}

function toRepositoryDateAndTime(
  value: DateAndTimeValue | null,
): { date: string; time: string } | null {
  if (!value?.time.trim() || !isValidAppointmentTime(value.time)) {
    return null;
  }

  return {
    date: toAppointmentDateString(value.year, value.month, value.day),
    time: normalizeAppointmentTime(value.time),
  };
}

export function useAppointmentsManagement(year: number, month: number) {
  const [slots, setSlots] = useState(() => appointmentsToSlots([], year, month));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<ActiveSlot | null>(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(
    null,
  );
  const [appointmentId, setAppointmentId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [dateAndTime, setDateAndTime] = useState<DateAndTimeValue | null>(null);
  const [appointmentStatus, setAppointmentStatus] = useState<StatusKey>(
    DEFAULT_APPOINTMENT_STATUS,
  );

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const appointments = await fetchAppointmentsForMonth(year, month);
      setSlots(appointmentsToSlots(appointments, year, month));
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load appointments for this month.";
      setError(message);
      setSlots(appointmentsToSlots([], year, month));
    } finally {
      setIsLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  const getSlot = useCallback(
    (slotYear: number, slotMonth: number, date: number) =>
      slots.find(
        (slot) =>
          slot.year === slotYear &&
          slot.month === slotMonth &&
          slot.date === date,
      ),
    [slots],
  );

  const resetDialogState = useCallback(() => {
    setActiveSlot(null);
    setEditingAppointmentId(null);
    setAppointmentId("");
    setPatientName("");
    setDateAndTime(null);
    setAppointmentStatus(DEFAULT_APPOINTMENT_STATUS);
  }, []);

  const handleDialogOpenChange = useCallback(
    (open: boolean) => {
      setIsDialogOpen(open);
      if (!open) {
        resetDialogState();
      }
    },
    [resetDialogState],
  );

  const openAddDialog = useCallback(
    (slotYear: number, slotMonth: number, date: number) => {
      setActiveSlot({
        year: slotYear,
        month: slotMonth,
        date,
        day: getDayLabel(slotYear, slotMonth, date),
      });
      setEditingAppointmentId(null);
      setAppointmentId("");
      setPatientName("");
      setDateAndTime({
        year: slotYear,
        month: slotMonth,
        day: date,
        time: DEFAULT_APPOINTMENT_TIME,
      });
      setAppointmentStatus(DEFAULT_APPOINTMENT_STATUS);
      setIsDialogOpen(true);
    },
    [],
  );

  const openEditDialog = useCallback(
    (
      slotYear: number,
      slotMonth: number,
      date: number,
      selectedAppointmentId: string,
    ) => {
      const slot = slots.find(
        (entry) =>
          entry.year === slotYear &&
          entry.month === slotMonth &&
          entry.date === date,
      );
      const patient = slot?.patients.find(
        (entry) => entry.id === selectedAppointmentId,
      );

      if (!patient) {
        return;
      }

      setActiveSlot({
        year: slotYear,
        month: slotMonth,
        date,
        day: slot?.day ?? getDayLabel(slotYear, slotMonth, date),
      });
      setEditingAppointmentId(selectedAppointmentId);
      setAppointmentId(selectedAppointmentId);
      setPatientName(patient.name);
      setDateAndTime(
        toDateAndTimeValue(patient.appointmentDate, patient.appointmentTime) ?? {
          year: slotYear,
          month: slotMonth,
          day: date,
          time: normalizeAppointmentTime(patient.appointmentTime),
        },
      );
      setAppointmentStatus(patient.status);
      setIsDialogOpen(true);
    },
    [slots],
  );

  const saveAppointment = useCallback(async () => {
    if (!activeSlot || isSaving) {
      return;
    }

    const trimmedName = patientName.trim();
    const dateAndTimeValue = toRepositoryDateAndTime(dateAndTime);

    if (!trimmedName || !dateAndTimeValue) {
      setError("Date & time requires both date and time.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      if (editingAppointmentId) {
        await updateAppointment(editingAppointmentId, {
          patientName: trimmedName,
          dateAndTime: dateAndTimeValue,
          status: appointmentStatus,
        });
      } else {
        await createAppointment({
          patientName: trimmedName,
          dateAndTime: dateAndTimeValue,
          status: appointmentStatus,
        });
      }

      await loadAppointments();
      handleDialogOpenChange(false);
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Failed to save this appointment.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  }, [
    activeSlot,
    appointmentStatus,
    dateAndTime,
    editingAppointmentId,
    handleDialogOpenChange,
    isSaving,
    loadAppointments,
    patientName,
  ]);

  const deleteAppointmentEntry = useCallback(async () => {
    if (!editingAppointmentId || isSaving) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await deleteAppointment(editingAppointmentId);
      await loadAppointments();
      handleDialogOpenChange(false);
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete this appointment.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  }, [editingAppointmentId, handleDialogOpenChange, isSaving, loadAppointments]);

  return {
    statusOptions,
    isLoading,
    error,
    isSaving,
    isDialogOpen,
    activeSlot,
    appointmentId,
    patientName,
    dateAndTime,
    appointmentStatus,
    editingAppointmentId,
    setPatientName,
    setDateAndTime,
    setAppointmentStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveAppointment,
    deleteAppointmentEntry,
    handleDialogOpenChange,
    reloadAppointments: loadAppointments,
  };
}
