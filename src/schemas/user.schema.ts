import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(45),
  email: z.string().email().min(3).max(45),
  password: z.string().min(0).max(120),
  admin: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userRequestSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userUpdateSchema = userRequestSchema
  .omit({
    admin: true,
  })
  .partial();

const userResponseSchema = userSchema.omit({
  password: true,
});

const usersResponseSchema = userResponseSchema.array();

export {
  userRequestSchema,
  userUpdateSchema,
  userSchema,
  userResponseSchema,
  usersResponseSchema,
};
