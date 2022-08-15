import joi from "joi";
var emailErrorMessages = {
    "string.base": "O email deve ser uma string",
    "string.empty": "Email não pode ser vazio",
    "string.email": "Email inválido",
    "any.required": "O email é obrigatório"
};
var passwordErrorMessages = {
    "string.base": "A senha deve ser uma string",
    "string.empty": "Senha não pode ser vazia",
    "string.min": "A senha deve ter no mínimo 8 caracteres",
    "string.pattern.base": "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial",
    "any.required": "A senha é obrigatória"
};
export var userSchema = joi.object({
    name: joi.string().min(3).required().messages({
        "string.base": "O nome deve ser uma string",
        "string.empty": "Nome não pode ser vazio",
        "string.min": "O nome deve ter no mínimo 3 caracteres",
        "any.required": "O nome é obrigatório"
    }),
    email: joi.string().email().required().messages(emailErrorMessages),
    password: joi
        .string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
        .messages(passwordErrorMessages)
});
export var loginSchema = joi
    .object({
    email: joi.string().email().required().messages(emailErrorMessages),
    password: joi.string().required().messages(passwordErrorMessages)
})
    .required();
