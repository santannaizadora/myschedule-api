import { Appointment } from "@prisma/client";
import { appointmentRepository } from "../repositories/appointment.repository.js";
import dayjs from "dayjs";

export type CreateAppointmentData = Omit<Appointment, "id">;
export type UpdateAppointmentData = Partial<Appointment>;

const validateTime = (initial_time: Date, final_time: Date) => {
  console.log(initial_time, final_time);
  if ( dayjs(initial_time).isAfter(dayjs(final_time))) {
    throw {
      type: "bad_request",
      message: "A hora inicial deve ser antes da hora final",
    };
  }
  if ( dayjs(initial_time).isSame(dayjs(final_time))) {
    throw {
      type: "bad_request",
      message: "A hora inicial e final não podem ser iguais",
    };
  }
}

const validateDate = (date: Date) => {
  const today = dayjs().format("YYYY-MM-DD");
  if(date < new Date(today)) {
    throw {
      type: "bad_request",
      message: "A data não pode ser anterior a data atual",
    };
  }
}

const createAppointment = async (appointment: CreateAppointmentData) => {
  const { initial_time, final_time, date } = appointment;
  appointment.date = new Date(date);
  const initial = new Date(`${date} ${initial_time}`);
  const final = new Date(`${date} ${final_time}`);
  validateTime(initial, final);
  validateDate(date);

  appointment.initial_time = new Date(initial.getTime() - initial.getTimezoneOffset() * 60000);
  appointment.final_time = new Date(final.getTime() - final.getTimezoneOffset() * 60000);
  return await appointmentRepository.insert(appointment);
}

const getTodayAppointments = async (user_id: number) => {
  const today = new Date();
  return await appointmentRepository.findAppointmentByDateAndUser(today, user_id);
}

const getDayAppointments = async (date: string, user_id: number) => {
  const day = new Date(date);
  return await appointmentRepository.findAppointmentByDateAndUser(day, user_id);
}

const updateAppointment = async (id: number, appointment: UpdateAppointmentData) => {
  const { initial_time, final_time, date } = appointment;
  validateTime(initial_time, final_time);
  validateDate(date);
  appointment.id = id;
  appointment.date = new Date(date);
  const initial = new Date(`${date} ${initial_time}`);
  const final = new Date(`${date} ${final_time}`);
  appointment.initial_time = new Date(initial.getTime() - initial.getTimezoneOffset() * 60000);
  appointment.final_time = new Date(final.getTime() - final.getTimezoneOffset() * 60000);

  return await appointmentRepository.update( appointment);
}

const getAppointment = async (id: number, user_id: number) => {
  const appointment = await appointmentRepository.findAppointmentByIdAndUser(id, user_id);
  if (!appointment) {
    throw {
      type: "not_found",
      message: "Agendamento não encontrado",
    };
  }
  return appointment;
}

const deleteAppointment = async (id: number, user_id: number) => {
  const appointment = await getAppointment(id, user_id);
  await appointmentRepository.deleteAppointment(appointment.id);
}

const getByMonth = async (month: number, year: number, user_id: number) => {
  return await appointmentRepository.getMonthAppointments(user_id, month, year);
}

export const appointmentService = {
  createAppointment,
  getTodayAppointments,
  getDayAppointments,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getByMonth,
};