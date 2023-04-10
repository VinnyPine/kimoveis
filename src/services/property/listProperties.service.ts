import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import {
  iPropertiesResponse,
  iRealEstatesWithoutCategory,
} from "../../interfaces";
import {
  propertiesResponseSchema,
  realEstatesWithoutCategoryResponse,
} from "../../schemas";

const listPropertiesService =
  async (): Promise<iRealEstatesWithoutCategory> => {
    const propertyRepo: Repository<RealEstate> =
      AppDataSource.getRepository(RealEstate);

    const properties = await propertyRepo
      .createQueryBuilder("re")
      .select()
      .leftJoinAndSelect("re.address", "address")
      .getMany();

    const propertiesResponse =
      realEstatesWithoutCategoryResponse.parse(properties);

    return propertiesResponse;
  };

export default listPropertiesService;
