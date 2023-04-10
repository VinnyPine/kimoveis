import { Request, Response, NextFunction } from "express";
import { ErrorRequest } from "../errors";

const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { admin } = req.user;

  if (!admin) {
    throw new ErrorRequest("Insufficient permission", 403);
  }

  return next();
};

export default ensureAdmin;
