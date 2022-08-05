import joi from "joi";
import { CreateUserData } from "../services/user.service.js";

const emailErrorMessages = {
	"string.base": "O email deve ser uma string",
	"string.empty": "Email não pode ser vazio",
	"string.email": "Email inválido",
	"any.required": "O email é obrigatório",
};

const passwordErrorMessages = {
	"string.base": "A senha deve ser uma string",
	"string.empty": "Senha não pode ser vazia",
	"string.min": "A senha deve ter no mínimo 8 caracteres",
	"string.pattern.base":
		"A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial",
	"any.required": "A senha é obrigatória",
};

export const userSchema = joi.object<CreateUserData>({
	name: joi.string().min(3).required().messages({
		"string.base": "O nome deve ser uma string",
		"string.empty": "Nome não pode ser vazio",
		"string.min": "O nome deve ter no mínimo 3 caracteres",
		"any.required": "O nome é obrigatório",
	}),
	email: joi.string().email().required().messages(emailErrorMessages),
	password: joi
		.string()
		.min(8)
		.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
		.required()
		.messages(passwordErrorMessages),
});

export const loginSchema = joi
	.object<CreateUserData>({
		email: joi.string().email().required().messages(emailErrorMessages),
		password: joi.string().required().messages(passwordErrorMessages),
	})
	.required();
