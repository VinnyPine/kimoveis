import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureValidData =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validData = schema.parse(req.body);

    req.body = validData;

    return next();
  };

export default ensureValidData;
