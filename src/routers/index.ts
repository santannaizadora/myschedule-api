import { Router } from "express";
import authRoute from "./auth.router.js";
import appointmentRoute from "./appointment.router.js";
import userRoute from "./user.router.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/appointment", appointmentRoute);
router.use("/user", userRoute);

export default router;