import { Request, Response } from "express";
import { userService, CreateUserData } from "../services/user.service.js";

export const logon = async (req: Request, res: Response) => {
    const { name, email, password }: CreateUserData = req.body;
    await userService.createUser({name, email, password});
    res.sendStatus(201);
}

export const login = async (req: Request, res: Response) => {
    const { email, password }: CreateUserData = req.body;
    const token = await userService.login(email, password);
    res.send(token).status(200);
}