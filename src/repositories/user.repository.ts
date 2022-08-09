import { client } from "../config/database.js";
import { CreateUserData, UpdateUserData } from "../services/user.service.js";

const findUserByEmail = async (email: string) => {
	return await client.user.findUnique({
		where: {
			email,
		},
	});
};

const findUserById = async (id: number) => {
  return await client.user.findUnique({
    where: {
      id,
    },
  });
}

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
  findUserById,
	insert,
};
