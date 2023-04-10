import { Router } from "express";
import {
  createUser,
  listUsers,
  updateUser,
  deactiveUser,
} from "../controllers";
import {
  ensureAdmin,
  ensureEmailExists,
  ensureIdExists,
  ensurePermission,
  ensureValidData,
  ensureValidToken,
} from "../middlewares";
import { userRequestSchema, userUpdateSchema } from "../schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureValidData(userRequestSchema),
  ensureEmailExists,
  createUser
);
usersRoutes.get("", ensureValidToken, ensureAdmin, listUsers);
usersRoutes.patch(
  "/:id",
  ensureValidData(userUpdateSchema),
  ensureValidToken,
  ensureIdExists("User"),
  ensurePermission,
  ensureEmailExists,
  updateUser
);
usersRoutes.delete(
  "/:id",
  ensureIdExists("User"),
  ensureValidToken,
  ensureAdmin,
  deactiveUser
);

export default usersRoutes;
