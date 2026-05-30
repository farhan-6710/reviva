import type { StaffProfile } from "@/types/admin/profile/types";

export const staffProfile: StaffProfile = {
  name: "Clinician",
  role: "Senior Physiotherapist",
  department: "Musculoskeletal & Sports Rehabilitation",
  email: "staff@revivaclinic.com",
  phone: "+1 (555) 014-2840",
  licenseNumber: "PT-48291-REG",
  joinedDate: "March 2022",
  location: "Reviva Physio & Rehab Clinic",
  bio: "Leads assessment, manual therapy, and progressive exercise programmes for sports injuries, post-operative recovery, and chronic pain — with clear milestones from first visit through discharge.",
  specializations: [
    "Sports injury rehabilitation",
    "Post-operative recovery",
    "Manual therapy",
    "Exercise prescription",
  ],
  stats: [
    { label: "Sessions this month", value: "186" },
    { label: "Patients seen", value: "134" },
    { label: "On-time appointments", value: "94%" },
    { label: "Patient satisfaction", value: "96%" },
  ],
  credentials: [
    {
      title: "Licensed Physiotherapist",
      issuer: "State Board of Physical Therapy",
      year: "2019",
    },
    {
      title: "Sports Rehabilitation Specialist",
      issuer: "American Physical Therapy Association",
      year: "2021",
    },
    {
      title: "Orthopaedic Manual Therapy",
      issuer: "Orthopaedic Section APTA",
      year: "2023",
    },
  ],
};
