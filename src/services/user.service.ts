import { User } from "@prisma/client";
import Cryptr from "cryptr";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import "../setup.js";

export type CreateUserData = Omit<User, "id">;
export type UpdateUserData = Partial<User>;

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY || "secret");

const createUser = async (data: CreateUserData) => {
	const { name, email, password } = data;
	const user = await userRepository.findUserByEmail(email);
	if (user) {
		throw {
			type: "conflict",
			message: "Email já cadastrado",
		};
	}

	const hashedPassword = cryptr.encrypt(password);
	await userRepository.insert({
		name,
		email,
		password: hashedPassword,
	});
};

const login = async (email: string, password: string) => {
	const user = await userRepository.findUserByEmail(email);
	if (!user) {
		throw {
			type: "not_found",
			message: "E-mail ou senha inválidos",
		};
	}

	const isValid = cryptr.decrypt(password) === user.password;
	if (!isValid) {
		throw {
			type: "not_found",
			message: "E-mail ou senha inválidos",
		};
	}

	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
      name: user.name,
		},
		process.env.JWT_SECRET || "secret"
	);
	
  return { token };
};

export const authService = {
	createUser,
	login,
};
