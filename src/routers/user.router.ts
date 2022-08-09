import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { update, deleteUser } from "../controllers/user.controller.js";

const router = Router();

router.use(validateToken);
router.put("/:id", update);
router.delete("/:id", deleteUser);

export default router;