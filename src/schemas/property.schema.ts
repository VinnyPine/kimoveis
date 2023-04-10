import { z } from "zod";
import { scheduleWithoutRealEstateResponseSchema } from "./schedule.schema";

const addressRequest = z.object({
  street: z
    .string({
      required_error: "key 'street' is required",
    })
    .max(45),
  zipCode: z
    .string({
      required_error: "key 'zipCode' is required",
    })
    .max(8),
  number: z.string().max(7).nullish(),
  city: z
    .string({
      required_error: "key 'city' is required",
    })
    .max(20),
  state: z
    .string({
      required_error: "key 'state' is required",
    })
    .max(2),
});

const addressResponse = addressRequest.extend({
  id: z.number(),
  zipCode: z.string().max(9),
});

const propertySchema = z.object({
  id: z.number(),
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  address: addressRequest,
  categoryId: z.number().int(),
  sold: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const propertyRequestSchema = propertySchema.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});

const propertyResponseSchema = propertySchema
  .omit({
    categoryId: true,
    address: true,
  })
  .extend({
    value: z.coerce.number(),
  });

const realEstateResponseSchema = propertySchema
  .omit({
    categoryId: true,
  })
  .extend({
    address: addressResponse,
    value: z.coerce.number(),
    category: z.object({
      id: z.number(),
      name: z.string(),
    }),
  });

const realEstateWithoutCategoryResponse = realEstateResponseSchema.omit({
  category: true,
});

const realEstatesWithoutCategoryResponse =
  realEstateWithoutCategoryResponse.array();

const propertiesResponseSchema = propertyResponseSchema.array();

const realEstateWithSchedulesSchema = realEstateResponseSchema.extend({
  schedules: scheduleWithoutRealEstateResponseSchema.array(),
});

export {
  propertySchema,
  propertyRequestSchema,
  propertyResponseSchema,
  propertiesResponseSchema,
  realEstateResponseSchema,
  realEstateWithoutCategoryResponse,
  realEstatesWithoutCategoryResponse,
  realEstateWithSchedulesSchema,
};
