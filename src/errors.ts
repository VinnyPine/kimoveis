import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class ErrorRequest extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
): Response => {

  if (err instanceof ErrorRequest) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { ErrorRequest, handleErrors };
