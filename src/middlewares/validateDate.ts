import { NextFunction, Request, Response } from "express";
import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

export const validateDate = (req: Request, res: Response, next: NextFunction) => {
  const { date } = req.params;
  const schema = Joi.object().keys({
    date: Joi.date().format("YYYY-MM-DD").required().messages({
      "date.format": "Data deve ser no formato YYYY-MM-DD",
    }),
  });
  const { error } = schema.validate({ date });
  if (error) return res.status(400).json({ message: error.message });
  next();
}