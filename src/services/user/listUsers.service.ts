import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUsersResponse } from "../../interfaces";
import { usersResponseSchema } from "../../schemas";

const listUsersService = async (): Promise<iUsersResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const users = await userRepo.find();

  const usersResponse = usersResponseSchema.parse(users);

  return usersResponse;
};

export default listUsersService;
