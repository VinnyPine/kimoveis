import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Category, RealEstate, User } from "../entities";
import { ErrorRequest } from "../errors";

const ensureIdExists =
  (entityName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const id: number = Number(req.params.id);
    const entity =
      entityName === "User"
        ? User
        : entityName === "Category"
        ? Category
        : RealEstate;

    const repo = AppDataSource.getRepository(entity);

    const findItem = await repo.findOneBy({ id });

    if (!findItem) {
      throw new ErrorRequest(`${entityName} not found`, 404);
    }

    return next();
  };

export default ensureIdExists;
