import { Request, Response } from "express";
import {
  iUserRequest,
  iUserResponse,
  iUsersResponse,
  iUserUpdate,
} from "../interfaces";
import {
  createUserService,
  deactiveUserService,
  listUsersService,
  updateUserService,
} from "../services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const userData: iUserRequest = req.body;

  const user = await createUserService(userData);

  return res.status(201).json(user);
};

const listUsers = async (req: Request, res: Response) => {
  const users: iUsersResponse = await listUsersService();

  return res.status(200).json(users);
};

const updateUser = async (req: Request, res: Response) => {
  const userData: iUserUpdate = req.body;
  const userId: number = Number(req.params.id);

  const user: iUserResponse = await updateUserService(userData, userId);

  return res.status(200).json(user);
};

const deactiveUser = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);

  await deactiveUserService(userId);

  return res.status(204).json();
};

export { createUser, listUsers, updateUser, deactiveUser };
