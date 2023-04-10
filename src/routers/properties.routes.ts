import { Router } from "express";
import {
  createCategory,
  createProperty,
  createSchedule,
  listCategories,
  listProperties,
  listPropertiesInCategory,
  listSchedules,
} from "../controllers";
import {
  ensureAdmin,
  ensureIdExists,
  ensurePermission,
  ensureValidData,
  ensureValidToken,
} from "../middlewares";
import {
  categoryRequestSchema,
  propertyRequestSchema,
  scheduleRequestSchema,
} from "../schemas";

const propertiesRoutes: Router = Router();

propertiesRoutes.post(
  "/categories",
  ensureValidData(categoryRequestSchema),
  ensureValidToken,
  ensureAdmin,
  createCategory
);
propertiesRoutes.get("/categories", listCategories);
propertiesRoutes.get(
  "/categories/:id/realEstate",
  ensureIdExists("Category"),
  listPropertiesInCategory
);
propertiesRoutes.post(
  "/realEstate",
  ensureValidData(propertyRequestSchema),
  ensureValidToken,
  ensureAdmin,
  createProperty
);
propertiesRoutes.get("/realEstate", listProperties);
propertiesRoutes.post(
  "/schedules",
  ensureValidToken,
  ensureValidData(scheduleRequestSchema),
  createSchedule
);
propertiesRoutes.get(
  "/schedules/realEstate/:id",
  ensureIdExists("RealEstate"),
  ensureValidToken,
  ensureAdmin,
  listSchedules
);

export default propertiesRoutes;
