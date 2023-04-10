import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { ErrorRequest } from "../errors";
import jwt from "jsonwebtoken";

const ensureValidToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new ErrorRequest("Missing bearer token", 401);
  }

  const token = auth.split(" ")[1];

  const { SECRET_KEY } = process.env;

  const secretKey = SECRET_KEY || "test";

  jwt.verify(token, secretKey, (err, decoded: any) => {
    if (err) {
      throw new ErrorRequest(err.message, 401);
    }

    req.user = {
      id: Number(decoded.sub),
      admin: decoded.admin,
    };

    return next();
  });
};

export default ensureValidToken;
