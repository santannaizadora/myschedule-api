import { client } from "../config/database.js";
import { CreateAppointmentData, UpdateAppointmentData } from "../services/appointment.service.js";

const findAppointmentByDateAndUser = async (date: Date, user_id: number) => {
  return await client.appointment.findMany({
    where: {
      date,
      user_id,
    },
    orderBy: {
      initial_time: "asc",
    },
  });
}

const findAppointmentByIdAndUser = async (id: number, user_id: number) => {
  return await client.appointment.findFirst({
    where: {
      id,
      user_id,
    },
  });
}

const insert = async (appointment: CreateAppointmentData) => {
  await client.appointment.create({
    data: {
      title: appointment.title,
      date: appointment.date,
      observation: appointment.observation,
      place: appointment.place,
      initial_time: appointment.initial_time,
      final_time: appointment.final_time,
      user_id: appointment.user_id,
    },
  });
}

const update = async (appointment: UpdateAppointmentData) => {
  await client.appointment.update({
    where: {
      id: appointment.id,
    },
    data: {
      title: appointment.title,
      date: appointment.date,
      observation: appointment.observation,
      place: appointment.place,
      initial_time: appointment.initial_time,
      final_time: appointment.final_time,
      user_id: appointment.user_id,
    },
  });
}

const deleteAppointment = async (id: number) => {
  await client.appointment.delete({
    where: {
      id,
    },
  });
}

const deleteUserAppointments = async (user_id: number) => {
  await client.appointment.deleteMany({
    where: {
      user_id,
    },
  });
}

const getMonthAppointments = async (user_id: number, month: number, year: number) => {
  return await client.appointment.findMany({
    where: {
      user_id,
      date: {
        lte: new Date(year, month, 0),
        gte: new Date(year, month-1, 1),
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}


export const appointmentRepository = {
  findAppointmentByDateAndUser,
  findAppointmentByIdAndUser,
  insert,
  update,
  deleteAppointment,
  deleteUserAppointments,
  getMonthAppointments,
};