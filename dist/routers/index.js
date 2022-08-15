import { Router } from "express";
import authRoute from "./auth.router.js";
import appointmentRoute from "./appointment.router.js";
var router = Router();
router.use("/auth", authRoute);
router.use("/appointment", appointmentRoute);
export default router;
