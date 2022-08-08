import { Appointment } from "@prisma/client";

export type CreateAppointmentData = Omit<Appointment, "id">;
export type UpdateAppointmentData = Partial<Appointment>;