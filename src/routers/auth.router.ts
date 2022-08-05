import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/auth.schema.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateSchema(userSchema), register);
router.post("/login", validateSchema(userSchema), login);

export default router;