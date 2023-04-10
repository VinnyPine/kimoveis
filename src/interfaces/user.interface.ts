import { DeepPartial } from "typeorm";
import { z } from "zod";
import { userRequestSchema, userResponseSchema, userSchema } from "../schemas";

type iUserRequest = z.infer<typeof userRequestSchema>;
type iUserUpdate = DeepPartial<Omit<iUserRequest, "admin">>;
type iUser = z.infer<typeof userSchema>;
type iUserResponse = z.infer<typeof userResponseSchema>;
type iUsersResponse = Array<iUserResponse>;

export { iUserRequest, iUserUpdate, iUser, iUserResponse, iUsersResponse };
