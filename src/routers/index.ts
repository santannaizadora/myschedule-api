import { Router } from "express";
import authRoute from "./auth.router.js";

const router = Router();

router.use("/auth", authRoute);

export default router;