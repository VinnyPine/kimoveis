import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { ErrorRequest } from "../../errors";
import { iPropertyRequest, iPropertyResponse } from "../../interfaces";
import {
  propertyResponseSchema,
  realEstateResponseSchema,
} from "../../schemas";

const createPropertyService = async (
  propertyData: iPropertyRequest
): Promise<iPropertyResponse> => {
  const {
    address: addressData,
    categoryId,
    ...propertyDataBasic
  } = propertyData;

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoryRepo.findOneBy({
    id: categoryId,
  });

  if (!category) {
    throw new ErrorRequest("Category not found", 404);
  }

  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const findAddress = await addressRepo.findOneBy({
    street: addressData.street,
    zipCode: addressData.zipCode,
  });

  if (findAddress) {
    throw new ErrorRequest("Address already exists", 409);
  }

  const address: Address = addressRepo.create(addressData);

  await addressRepo.save(address);

  const propertyRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const property: RealEstate = propertyRepo.create({
    ...propertyDataBasic,
    address,
    category,
  });

  await propertyRepo.save(property);

  const newProperty = realEstateResponseSchema.parse(property);

  return newProperty;
};

export default createPropertyService;
