import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserRequest, iUserResponse } from "../../interfaces";
import { userResponseSchema } from "../../schemas";

const createUserService = async (
  userData: iUserRequest
): Promise<iUserResponse> => {
  let { admin, ...data } = userData;

  if (admin === undefined) {
    admin = false;
  }

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepo.create({ admin, ...data });

  await userRepo.save(user);

  const newUser = userResponseSchema.parse(user);

  return newUser;
};

export default createUserService;
