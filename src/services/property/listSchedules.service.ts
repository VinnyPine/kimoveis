import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { irealEstateWithSchedules } from "../../interfaces";
import { realEstateWithSchedulesSchema } from "../../schemas";

const listSchedulesService = async (
  propertyId: number
): Promise<irealEstateWithSchedules> => {
  const propertyRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const property = await propertyRepo
    .createQueryBuilder("real_estate")
    .select()
    .leftJoinAndSelect("real_estate.address", "address")
    .leftJoinAndSelect("real_estate.schedules", "schedules")
    .leftJoinAndSelect("real_estate.category", "category")
    .leftJoinAndSelect("schedules.user", "user")
    .where("real_estate.id = :id", { id: propertyId })
    .getOne();

  const propertyResponse = realEstateWithSchedulesSchema.parse(property);

  return propertyResponse;
};

export default listSchedulesService;
