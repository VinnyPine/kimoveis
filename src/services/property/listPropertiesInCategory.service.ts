import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategoryResponse } from "../../interfaces";
import { categoryResponseSchema } from "../../schemas";

const listPropertiesInCategoryService = async (
  categoryId: number
): Promise<iCategoryResponse> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoryRepo
    .createQueryBuilder("category")
    .select()
    .innerJoinAndSelect("category.realEstate", "real_estates")
    .where("category.id = :id", { id: categoryId })
    .getOne();

  const categoryResponse = categoryResponseSchema.parse(category);

  return categoryResponse;
};

export default listPropertiesInCategoryService;
