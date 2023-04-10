import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserResponse, iUserUpdate } from "../../interfaces";
import { userResponseSchema } from "../../schemas";

const updateUserService = async (
  userData: iUserUpdate,
  userId: number
): Promise<iUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepo.findOneBy({
    id: userId,
  });

  const user: User = userRepo.create({ ...findUser, ...userData });

  await userRepo.save(user);

  const updatedUser = userResponseSchema.parse(user);

  return updatedUser;
};

export default updateUserService;
