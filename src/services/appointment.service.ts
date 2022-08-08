import { Appointment } from "@prisma/client";
import { appointmentRepository } from "../repositories/appointment.repository.js";
import dayjs from "dayjs";

export type CreateAppointmentData = Omit<Appointment, "id">;
export type UpdateAppointmentData = Partial<Appointment>;

const validateTime = (initial_time: string, final_time: string) => {
  const initial = `01/01/1970 ${initial_time}`;
  const final = `01/01/1970 ${final_time}`;
  if ( dayjs(initial).isAfter(dayjs(final))) {
    throw {
      type: "bad_request",
      message: "A hora inicial deve ser antes da hora final",
    };
  }
  if ( dayjs(initial).isSame(dayjs(final))) {
    throw {
      type: "bad_request",
      message: "A hora inicial e final não podem ser iguais",
    };
  }
}

const validateDate = (date: string) => {
  if ( dayjs(date).isBefore(dayjs().format('DD-MM-YYYY')) ) {
    throw {
      type: "bad_request",
      message: "A data não pode ser anterior a data atual",
    };
  }
}

const createAppointment = async (appointment: CreateAppointmentData) => {
  validateTime(appointment.initial_time, appointment.final_time);
  validateDate(appointment.date);
  appointment.date = dayjs(appointment.date).format("YYYY-MM-DD");
  return await appointmentRepository.insert(appointment);
}

export const appointmentService = {
  createAppointment,
};