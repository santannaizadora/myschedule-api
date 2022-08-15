import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";
var Joi = JoiBase.extend(JoiDate);
export var appointmentSchema = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Título é um campo obrigatório",
        "string.empty": "Título é um campo obrigatório"
    }),
    date: Joi.date().format("YYYY-MM-DD").required().messages({
        "date.format": "Data deve ser no formato YYYY-MM-DD"
    }),
    observation: Joi.string().allow(null, ''),
    place: Joi.string().required().messages({
        "string.empty": "O campo 'lugar' não pode estar vazio"
    }),
    initial_time: Joi.string()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
        "string.pattern.base": "Horário deve ser no formato HH:MM",
        "string.empty": "O campo 'horario inicial' não pode estar vazio"
    }),
    final_time: Joi.string()
        .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
        "string.pattern.base": "Horário deve ser no formato HH:MM",
        "string.empty": "O campo 'horario final' não pode estar vazio"
    })
});
