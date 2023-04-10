import { Router } from "express";
import { createLogin } from "../controllers";
import { ensureValidData } from "../middlewares";
import { loginSchema } from "../schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", ensureValidData(loginSchema), createLogin);

export default loginRoutes;
