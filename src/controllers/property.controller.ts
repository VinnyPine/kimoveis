import { Request, Response } from "express";
import {
  iCategoryRequest,
  iProperty,
  iPropertyRequest,
  iScheduleRequest,
} from "../interfaces";
import {
  createCategoryService,
  createPropertyService,
  createScheduleService,
  listCategoriesService,
  listPropertiesInCategoryService,
  listPropertiesService,
  listSchedulesService,
} from "../services";

const createCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: iCategoryRequest = req.body;
  const category = await createCategoryService(categoryData);

  return res.status(201).json(category);
};

const listCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listCategoriesService();

  return res.status(200).json(categories);
};

const listPropertiesInCategory = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const category = await listPropertiesInCategoryService(id);

  return res.status(200).json(category);
};

const createProperty = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const propertyData: iPropertyRequest = req.body;

  const property = await createPropertyService(propertyData);
  return res.status(201).json(property);
};

const listProperties = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const properties = await listPropertiesService();

  return res.status(200).json(properties);
};

const createSchedule = async (req: Request, res: Response) => {
  const scheduleData: iScheduleRequest = req.body;
  const userId: number = Number(req.user.id);

  const message = await createScheduleService(scheduleData, userId);

  return res.status(201).json({ message });
};

const listSchedules = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  const schedules = await listSchedulesService(id);

  return res.status(200).json(schedules);
};

export {
  createCategory,
  listCategories,
  listPropertiesInCategory,
  createProperty,
  listProperties,
  createSchedule,
  listSchedules,
};
