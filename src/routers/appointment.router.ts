import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { appointmentSchema } from "../schemas/appointment.schema.js";
import { insert } from "../controllers/appointment.controller.js";

const router = Router();

router.use(validateToken);
router.post("/new", validateSchema(appointmentSchema), insert);

export default router;