import { DeepPartial } from "typeorm";
import { z } from "zod";
import { categoryRequestSchema, categorySchema } from "../schemas";

type iCategory = z.infer<typeof categorySchema>;
type iCategoryRequest = z.infer<typeof categoryRequestSchema>;
type iCategoryUpdate = DeepPartial<iCategoryRequest>;
type iCategoryResponse = iCategory;
type iCategoriesResponse = Array<iCategory>;

export {
  iCategory,
  iCategoryRequest,
  iCategoryUpdate,
  iCategoryResponse,
  iCategoriesResponse,
};
