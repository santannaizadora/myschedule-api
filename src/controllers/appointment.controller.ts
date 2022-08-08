import { Request, Response } from "express";
import { appointmentService, CreateAppointmentData } from "../services/appointment.service.js";

export const insert = async (req: Request, res: Response) => {
    const { title, date, observation, place, initial_time, final_time }: CreateAppointmentData = req.body;
    const user_id = res.locals.user.id;
    await appointmentService.createAppointment({title, date, observation, place, initial_time, final_time, user_id});
    res.sendStatus(201);
}