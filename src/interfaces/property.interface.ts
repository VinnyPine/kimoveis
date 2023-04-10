import { z } from "zod";
import {
  propertiesResponseSchema,
  propertyRequestSchema,
  propertyResponseSchema,
  propertySchema,
  realEstatesWithoutCategoryResponse,
  realEstateWithSchedulesSchema,
  realEstateWithoutCategoryResponse,
} from "../schemas";

type iProperty = z.infer<typeof propertySchema>;
type iPropertyRequest = z.infer<typeof propertyRequestSchema>;
type iPropertyResponse = z.infer<typeof propertyResponseSchema>;
type iPropertiesResponse = z.infer<typeof propertiesResponseSchema>;
type iRealEstateWithoutCategory = z.infer<
  typeof realEstateWithoutCategoryResponse
>;
type iRealEstatesWithoutCategory = z.infer<
  typeof realEstatesWithoutCategoryResponse
>;
type irealEstateWithSchedules = z.infer<typeof realEstateWithSchedulesSchema>;

export {
  iProperty,
  iPropertyRequest,
  iPropertyResponse,
  iPropertiesResponse,
  iRealEstateWithoutCategory,
  iRealEstatesWithoutCategory,
  irealEstateWithSchedules,
};
