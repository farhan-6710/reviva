export type StatusKey = "Upcoming" | "Attended" | "Missed";

export type Appointment = {
  id: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string;
  status: StatusKey;
  created_at: string;
};

export type SlotPatient = {
  id: string;
  name: string;
  appointmentDate: string;
  appointmentTime: string;
  status: StatusKey;
};

export type Slot = {
  year: number;
  month: number;
  date: number;
  day: string;
  patients: SlotPatient[];
};

export type ActiveSlot = {
  year: number;
  month: number;
  date: number;
  day: string;
};

export type Week = {
  label: string;
  range: string;
  dates: number[];
};

export type DateAndTimeValue = {
  year: number;
  month: number;
  day: number;
  time: string;
};
