import { z } from "zod";
import { propertyResponseSchema } from "./property.schema";
import { userResponseSchema } from "./user.schema";

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int(),
  userId: z.number().int(),
});

const scheduleRequestSchema = scheduleSchema.omit({
  id: true,
  userId: true,
});

const scheduleResponseSchema = scheduleSchema
  .extend({
    realEstate: propertyResponseSchema,
    user: userResponseSchema,
    date: z.string().or(z.date()),
    hour: z.string().or(z.date()),
  })
  .omit({
    realEstateId: true,
    userId: true,
  });

const scheduleWithoutRealEstateResponseSchema = scheduleResponseSchema
  .omit({
    realEstate: true,
  })
  .extend({
    user: userResponseSchema.extend({
      password: z.string(),
    }),
  });

const schedulesResponseSchema = scheduleResponseSchema.array();

export {
  scheduleSchema,
  scheduleRequestSchema,
  scheduleResponseSchema,
  scheduleWithoutRealEstateResponseSchema,
  schedulesResponseSchema,
};
