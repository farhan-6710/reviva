import { format, lastDayOfMonth, startOfMonth } from "date-fns";

import { supabase } from "@/lib/supabase";

import type {
  Appointment,
  Slot,
  SlotPatient,
  StatusKey,
} from "../types/types";
import { getDayLabel } from "./calendarUtils";

function getMonthDateRange(year: number, month: number) {
  const monthStart = startOfMonth(new Date(year, month - 1, 1));
  const monthEnd = lastDayOfMonth(monthStart);

  return {
    start: format(monthStart, "yyyy-MM-dd"),
    end: format(monthEnd, "yyyy-MM-dd"),
  };
}

export function appointmentToSlotPatient(
  appointment: Appointment,
): SlotPatient {
  return {
    id: appointment.id,
    name: appointment.patient_name,
    appointmentDate: appointment.appointment_date,
    appointmentTime: appointment.appointment_time,
    status: appointment.status,
  };
}

export function appointmentsToSlots(
  appointments: Appointment[],
  year: number,
  month: number,
): Slot[] {
  const patientsByDate = new Map<number, SlotPatient[]>();

  for (const appointment of appointments) {
    const [appointmentYear, appointmentMonth, appointmentDay] =
      appointment.appointment_date.split("-").map(Number);

    if (appointmentYear !== year || appointmentMonth !== month) {
      continue;
    }

    const dayPatients = patientsByDate.get(appointmentDay) ?? [];
    dayPatients.push(appointmentToSlotPatient(appointment));
    patientsByDate.set(appointmentDay, dayPatients);
  }

  return Array.from(patientsByDate.entries())
    .sort(([dayA], [dayB]) => dayA - dayB)
    .map(([date, patients]) => ({
      year,
      month,
      date,
      day: getDayLabel(year, month, date),
      patients: patients.sort((a, b) =>
        a.appointmentTime.localeCompare(b.appointmentTime),
      ),
    }));
}

export async function fetchAppointmentsForMonth(
  year: number,
  month: number,
): Promise<Appointment[]> {
  const { start, end } = getMonthDateRange(year, month);

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .gte("appointment_date", start)
    .lte("appointment_date", end)
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Appointment[];
}

type DateAndTimeInput = {
  date: string;
  time: string;
};

type CreateAppointmentInput = {
  patientName: string;
  dateAndTime: DateAndTimeInput;
  status: StatusKey;
};

type UpdateAppointmentInput = {
  patientName: string;
  dateAndTime: DateAndTimeInput;
  status: StatusKey;
};

export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      patient_name: input.patientName,
      appointment_date: input.dateAndTime.date,
      appointment_time: input.dateAndTime.time,
      status: input.status,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Appointment;
}

export async function updateAppointment(
  appointmentId: string,
  input: UpdateAppointmentInput,
): Promise<Appointment> {
  const { data, error } = await supabase
    .from("appointments")
    .update({
      patient_name: input.patientName,
      appointment_date: input.dateAndTime.date,
      appointment_time: input.dateAndTime.time,
      status: input.status,
    })
    .eq("id", appointmentId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Appointment;
}

export async function deleteAppointment(appointmentId: string): Promise<void> {
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", appointmentId);

  if (error) {
    throw error;
  }
}
