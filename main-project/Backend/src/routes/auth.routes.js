import { Router } from "express";
import { loginValidation, registerValidation } from "../validators/auth.validator.js";
import { getMe, login, refresh, register } from "../controllers/auth.controller.js";
import identifyUser from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.post("/register", registerValidation, register)
authRouter.post("/login", loginValidation, login)
authRouter.get("/refresh", refresh)
authRouter.get("/get-me", identifyUser, getMe)

export default authRouter;