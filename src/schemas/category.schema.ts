import { z } from "zod";
import { propertyResponseSchema } from "./property.schema";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(45),
});

const categoryRequestSchema = categorySchema.omit({
  id: true,
});

const categoryUpdateSchema = categoryRequestSchema.partial();

const categoryResponseSchema = categorySchema.extend({
  realEstate: propertyResponseSchema.array(),
});

const categoriesResponseSchema = categorySchema.array();

export {
  categorySchema,
  categoryRequestSchema,
  categoryUpdateSchema,
  categoryResponseSchema,
  categoriesResponseSchema,
};
