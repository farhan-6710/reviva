import { AppointmentBookingWeeksTable } from "@/features/admin/appointment-booking/components/AppointmentBookingWeeksTable";
import { AppointmentDialog } from "@/features/admin/appointment-booking/components/AppointmentDialog";
import { SendDailyScheduleDialog } from "@/features/admin/appointment-booking/components/SendDailyScheduleDialog";
import {
  days,
  initialSlots,
  statusColors,
  statusText,
  weeks,
} from "@/features/admin/appointment-booking/constants/AppointmentBooking";
import { useAppointmentBooking } from "@/features/admin/appointment-booking/hooks/useAppointmentBooking";

export function AppointmentBookingPage() {
  const {
    statusOptions,
    isDialogOpen,
    appointmentId,
    patientName,
    appointmentTime,
    appointmentStatus,
    editingIndex,
    setPatientName,
    setAppointmentTime,
    setAppointmentStatus,
    getSlot,
    openAddDialog,
    openEditDialog,
    saveAppointment,
    deleteAppointment,
    handleDialogOpenChange,
  } = useAppointmentBooking(initialSlots);

  const isEditing = editingIndex !== null;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Appointment Booking
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage daily patient appointments by time and status. Click any day
            to add a booking or tap one to update it.
          </p>
        </div>
        <SendDailyScheduleDialog />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {(
          [
            { label: "Upcoming", color: "bg-status-upcoming" },
            { label: "Attended", color: "bg-status-done" },
            { label: "Missed", color: "bg-status-missed" },
          ] as const
        ).map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1"
          >
            <span className={`size-2 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <AppointmentBookingWeeksTable
        days={days}
        weeks={weeks}
        getSlot={getSlot}
        onAdd={openAddDialog}
        onEdit={openEditDialog}
        statusColors={statusColors}
        statusText={statusText}
      />

      <AppointmentDialog
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        isEditing={isEditing}
        appointmentId={appointmentId}
        patientName={patientName}
        appointmentTime={appointmentTime}
        appointmentStatus={appointmentStatus}
        statusOptions={statusOptions}
        onPatientNameChange={setPatientName}
        onAppointmentTimeChange={setAppointmentTime}
        onAppointmentStatusChange={setAppointmentStatus}
        onSave={saveAppointment}
        onDelete={deleteAppointment}
      />
    </section>
  );
}
