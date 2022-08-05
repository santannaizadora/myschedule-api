import joi from "joi";
import { CreateUserData } from "../services/user.service.js";

export const userSchema = joi.object<CreateUserData>({
	name: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
});
