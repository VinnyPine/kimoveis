import { Request, Response, NextFunction } from "express";
import { ErrorRequest } from "../errors";

const ensurePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { admin, id } = req.user;
  const idParams: number = Number(req.params.id);

  if (!admin && id !== idParams) {
    throw new ErrorRequest("Insufficient permission", 403);
  }

  return next();
};

export default ensurePermission;
