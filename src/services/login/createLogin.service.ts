import "dotenv/config";
import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { ErrorRequest } from "../../errors";
import { iLogin } from "../../interfaces";
import jwt from "jsonwebtoken";

const createLoginService = async (loginData: iLogin): Promise<string> => {
  const userRepo = AppDataSource.getRepository(User);

  const findUser = await userRepo.findOneBy({ email: loginData.email });

  if (!findUser) {
    throw new ErrorRequest("Invalid credentials", 401);
  }

  const matchPassword = await compare(loginData.password, findUser.password);

  if (!matchPassword) {
    throw new ErrorRequest("Invalid credentials", 401);
  }

  const { SECRET_KEY, EXPIRES_IN } = process.env;

  const secretKey = SECRET_KEY || "test";
  const expiresIn = EXPIRES_IN || "1h";

  const token = jwt.sign(
    {
      admin: findUser.admin,
    },
    secretKey,
    {
      expiresIn,
      subject: findUser.id.toString(),
    }
  );

  return token;
};

export default createLoginService;
