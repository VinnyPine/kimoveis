import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { ErrorRequest } from "../errors";

const ensureEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) {
    return next();
  }

  const userRepo = AppDataSource.getRepository(User);

  const findEmail = await userRepo.findOneBy({
    email,
  });

  if (findEmail) {
    throw new ErrorRequest("Email already exists", 409);
  }

  return next();
};

export default ensureEmailExists;
