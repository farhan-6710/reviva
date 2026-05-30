import { Loader2 } from "lucide-react";

import {
  statusColors,
  statusOptions,
  statusText,
} from "../constants/appointmentsManagement";
import { useAppointmentsCalendarSelection } from "../hooks/useAppointmentsCalendarSelection";
import { useAppointmentsManagement } from "../hooks/useAppointmentsManagement";
import { AppointmentDialog } from "../components/AppointmentDialog";
import { AppointmentsManagementWeeksTable } from "../components/AppointmentsManagementWeeksTable";
import { DateSelector } from "../components/DateSelector";

export function AppointmentsManagementPage() {
  const { selectedDate, calendarWeeks, year, month, selectDate } =
    useAppointmentsCalendarSelection();

  const {
    isLoading,
    error,
    isSaving,
    isDialogOpen,
    appointmentId,
    patientName,
    dateAndTime,
    appointmentStatus,
    editingAppointmentId,
    statusOptions: dialogStatusOptions,
    setPatientName,
    setDateAndTime,
    setAppointmentStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveAppointment,
    deleteAppointmentEntry,
    handleDialogOpenChange,
  } = useAppointmentsManagement(year, month);

  const isEditing = editingAppointmentId !== null;

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Appointments Management
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage daily patient appointments by time and status. Click any day
          to add an appointment or tap one to update it.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {statusOptions.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1"
            >
              <span className={`size-2 rounded-full ${statusColors[label]}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <DateSelector selectedDate={selectedDate} onSelect={selectDate} />
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-border bg-card">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <AppointmentsManagementWeeksTable
          year={year}
          month={month}
          weeks={calendarWeeks}
          selectedDate={selectedDate}
          getSlot={getSlot}
          onAdd={openAddDialog}
          onEdit={openEditDialog}
          statusColors={statusColors}
          statusText={statusText}
        />
      )}

      <AppointmentDialog
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        isEditing={isEditing}
        appointmentId={appointmentId}
        patientName={patientName}
        dateAndTime={dateAndTime}
        appointmentStatus={appointmentStatus}
        statusOptions={dialogStatusOptions}
        onPatientNameChange={setPatientName}
        onDateAndTimeChange={setDateAndTime}
        onAppointmentStatusChange={setAppointmentStatus}
        onSave={() => void saveAppointment()}
        onDelete={() => void deleteAppointmentEntry()}
        isSaving={isSaving}
      />
    </section>
  );
}
