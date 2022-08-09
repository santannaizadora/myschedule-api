import { Request, Response } from "express";
import { userService, UpdateUserData } from "../services/user.service.js";

export const update = async (req: Request, res: Response) => {
  const { name, email, password }: UpdateUserData = req.body;
  const id = res.locals.user.id;
  await userService.updateUser( id, { name, email, password });
  res.sendStatus(200);
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = res.locals.user.id;
  await userService.deleteUser(id);
  res.sendStatus(200);
}

