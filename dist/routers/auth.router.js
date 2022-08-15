import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema, loginSchema } from "../schemas/auth.schema.js";
import { login, register } from "../controllers/auth.controller.js";
var router = Router();
router.post("/register", validateSchema(userSchema), register);
router.post("/login", validateSchema(loginSchema), login);
export default router;
