import { Request, Response } from "express";
import { appointmentService, CreateAppointmentData, UpdateAppointmentData } from "../services/appointment.service.js";

export const insert = async (req: Request, res: Response) => {
    const { title, date, observation, place, initial_time, final_time }: CreateAppointmentData = req.body;
    const user_id = res.locals.user.id;
    await appointmentService.createAppointment({title, date, observation, place, initial_time, final_time, user_id});
    res.sendStatus(201);
}

export const getTodayAppointments = async (req: Request, res: Response) => {
    const user_id = res.locals.user.id;
    const appointments = await appointmentService.getTodayAppointments(user_id);
    res.json(appointments);
}

export const getDayAppointments = async (req: Request, res: Response) => {
    const date = req.params.date;
    const user_id = res.locals.user.id;
    const appointments = await appointmentService.getDayAppointments(date, user_id);
    res.json(appointments);
}

export const updateAppointment = async (req: Request, res: Response) => {
    const { title, date, observation, place, initial_time, final_time }: UpdateAppointmentData = req.body;
    const user_id = res.locals.user.id;
    const id = req.params.id;
    await appointmentService.updateAppointment(Number(id), {title, date, observation, place, initial_time, final_time, user_id});
    res.sendStatus(200);
}

export const deleteAppointment = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user_id = res.locals.user.id;
    await appointmentService.deleteAppointment(Number(id), user_id);
    res.sendStatus(200);
}

export const getAppointmentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user_id = res.locals.user.id;
    const appointment = await appointmentService.getAppointment(Number(id), user_id);
    res.json(appointment);
}

export const getByMonthAndYear = async (req: Request, res: Response) => {
    const { month, year } = req.params;
    const user_id = res.locals.user.id;
    const appointments = await appointmentService.getByMonth(Number(month), Number(year), user_id);
    res.json(appointments);
}
