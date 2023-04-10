import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategoriesResponse } from "../../interfaces";
import { categoriesResponseSchema } from "../../schemas";

const listCategoriesService = async (): Promise<iCategoriesResponse> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories = await categoryRepo.find();

  const categoriesResponse = categoriesResponseSchema.parse(categories);

  return categoriesResponse;
};

export default listCategoriesService;
