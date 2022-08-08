import joi from "joi";
import { CreateAppointmentData, UpdateAppointmentData } from "../services/appointment.service.js";
import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

export const appointmentSchema = Joi.object<CreateAppointmentData>({
	title: Joi.string().required(),
	date: Joi.date().format("DD-MM-YYYY").required().messages({
		"date.format": "Data deve ser no formato DD-MM-YYYY",
	}),
	observation: Joi.string().allow(null, ''),
	place: Joi.string().required(),
	initial_time: Joi.string()
		.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
		.required()
		.messages({
			"string.pattern.base": "Horário deve ser no formato HH:MM",
		}),
	final_time: Joi.string()
		.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
		.required()
		.messages({
			"string.pattern.base": "Horário deve ser no formato HH:MM",
		}),
});

export const appointmentUpdateSchema = Joi.object<UpdateAppointmentData>({
	title: Joi.string().allow(null, ''),
	date: Joi.date().format("DD-MM-YYYY").allow(null, '').messages({
		"date.format": "Data deve ser no formato DD-MM-YYYY",
	}),
	observation: Joi.string().allow(null, ''),
	place: Joi.string().allow(null, ''),
	initial_time: Joi.string()
		.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
		.allow(null, '')
		.messages({
			"string.pattern.base": "Horário deve ser no formato HH:MM",
		}),
	final_time: Joi.string()
		.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
		.allow(null, '')
		.messages({
			"string.pattern.base": "Horário deve ser no formato HH:MM",
		}),
});

