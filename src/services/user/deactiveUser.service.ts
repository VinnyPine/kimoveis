import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

const deactiveUserService = async (userId: number): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepo.findOneBy({
    id: userId,
  });

  await userRepo.softRemove(findUser!);
};

export default deactiveUserService;
