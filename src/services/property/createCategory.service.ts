import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ErrorRequest } from "../../errors";
import { iCategory, iCategoryRequest } from "../../interfaces";
import { categorySchema } from "../../schemas";

const createCategoryService = async (
  categoryData: iCategoryRequest
): Promise<iCategory> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepo.findOneBy({
    name: categoryData.name,
  });

  if (findCategory) {
    throw new ErrorRequest("Category already exists", 409);
  }

  const category: Category = categoryRepo.create(categoryData);

  await categoryRepo.save(category);

  const newCategory = categorySchema.parse(category);

  return newCategory;
};

export default createCategoryService;
