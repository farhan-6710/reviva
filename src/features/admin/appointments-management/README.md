# Appointments Management

Portable calendar module for managing patient appointments. Copy this entire folder into another project.

## Host app requirements

- React 19, React Router, Tailwind v4, shadcn/ui
- Supabase client at `@/shared/lib/supabase`
- UI primitives at `@/shared/ui/*`
- `cn()` at `@/shared/lib/utils`
- CSS tokens: `--status-upcoming`, `--status-done`, `--status-missed`

## Usage

```tsx
import { AppointmentsManagementPage } from "@/features/admin/appointments-management/pages/AppointmentsManagementPage";

// Add to your router:
{ path: "appointments-management", element: <AppointmentsManagementPage /> }
```

## Supabase setup

1. Open your project → **SQL Editor** → **New query**
2. Paste the script below → **Run**
3. Users must be **signed in** (Supabase Auth) to load or save appointments

```sql
-- Table
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null,
  appointment_date date not null,
  appointment_time text not null,
  status text not null check (status in ('Upcoming', 'Attended', 'Missed')),
  created_at timestamptz default now()
);

-- Only signed-in users can use this table
alter table public.appointments enable row level security;

create policy "authenticated access"
  on public.appointments
  for all
  to authenticated
  using (true)
  with check (true);
```

## Statuses

| Status | Meaning |
|--------|---------|
| Upcoming | Scheduled, not yet attended |
| Attended | Patient attended the appointment |
| Missed | Patient did not attend |

## Folder layout

```
appointments-management/
  constants/     calendar weeks, time slots, status colors
  types/         Appointment, Slot, StatusKey
  utils/         calendar helpers, repository (Supabase CRUD)
  hooks/         calendar selection + management state
  components/    table, dialog, date/time pickers
  pages/         AppointmentsManagementPage
```
