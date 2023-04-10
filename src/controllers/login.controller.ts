import { Request, Response } from "express";
import { iLogin } from "../interfaces";
import { createLoginService } from "../services";

const createLogin = async (req: Request, res: Response): Promise<Response> => {
  const loginData: iLogin = req.body;

  const token = await createLoginService(loginData);

  return res.status(200).json({ token });
};

export { createLogin };
