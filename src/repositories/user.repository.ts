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

const update = async (user: UpdateUserData) => {
  await client.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
}

const deleteUser = async (id: number) => {
  await client.user.delete({
    where: {
      id,
    },
  });
}

export const userRepository = {
	findUserByEmail,
  findUserById,
	insert,
  update,
  deleteUser,
};
