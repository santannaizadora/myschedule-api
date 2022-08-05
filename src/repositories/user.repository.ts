import { client } from "../config/database.js";
import { CreateUserData } from "../services/user.service.js";

const findUserByEmail = async (email: string) => {
	return await client.user.findUnique({
		where: {
			email,
		},
	});
};

const insert = async (user: CreateUserData) => {
	await client.user.create({
		data: {
			name: user.name,
			email: user.email,
			password: user.password,
		},
	});
};

export const userRepository = {
	findUserByEmail,
	insert,
};
