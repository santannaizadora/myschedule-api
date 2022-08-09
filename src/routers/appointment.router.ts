import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateDate } from "../middlewares/validateDate.js";
import { appointmentSchema} from "../schemas/appointment.schema.js";
import { getDayAppointments, getTodayAppointments, insert, updateAppointment, deleteAppointment, getAppointmentById, getByMonthAndYear } from "../controllers/appointment.controller.js";

const router = Router();

router.use(validateToken);
router.post("/new", validateSchema(appointmentSchema), insert);
router.get("/today", getTodayAppointments);
router.get("/day/:date", validateDate, getDayAppointments);
router.put("/:id", validateSchema(appointmentSchema), updateAppointment);
router.delete("/:id", deleteAppointment);
router.get("/:id", getAppointmentById);
router.get("/month/:month/:year", getByMonthAndYear);

export default router;