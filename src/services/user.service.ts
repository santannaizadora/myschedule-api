import { User } from "@prisma/client";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import "../setup.js";

export type CreateUserData = Omit<User, "id">;
export type UpdateUserData = Partial<User>;

const cryptr = new Cryptr(process.env.SECRET_KEY);

const validateLogin = async (email: string, password: string) => {
	const user = await userRepository.findUserByEmail(email);
	const isPasswordValid = cryptr.decrypt(user.password) === password;
	if (!user || !isPasswordValid) {
		throw {
			type: "forbidden",
			message: "E-mail ou senha inválidos",
		};
	}
	return user;
};

const createUser = async (data: CreateUserData) => {
	const { email, password } = data;
	const user = await userRepository.findUserByEmail(email);
	if (user) {
		throw {
			type: "conflict",
			message: "Email já cadastrado",
		};
	}
	data.password = cryptr.encrypt(password);
	await userRepository.insert(data);
};

const login = async (email: string, password: string) => {
	const user = await validateLogin(email, password);
	const { id, name } = user;
	const token = jwt.sign({ id, name }, process.env.JWT_SECRET);
	return { token };
};

export const userService = {
	createUser,
	login,
};
