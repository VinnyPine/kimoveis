import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { ErrorRequest } from "../../errors";
import { iScheduleRequest } from "../../interfaces";

const createScheduleService = async (
  scheduleData: iScheduleRequest,
  userId: number
): Promise<string> => {
  const { realEstateId, date, hour } = scheduleData;

  const h = hour.split(":");

  if (
    Number(h[0]) < 8 ||
    Number(h[0]) > 18 ||
    (Number(h[0]) === 18 && Number(h[1]) > 0)
  ) {
    throw new ErrorRequest("Invalid hour, available times are 8AM to 18PM");
  }

  const verifyDate = new Date(date).getDay();

  if (verifyDate <= 0 || verifyDate >= 6) {
    throw new ErrorRequest("Invalid date, work days are monday to friday");
  }

  const propertyRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const property = await propertyRepo.findOneBy({
    id: realEstateId,
  });

  if (!property) {
    throw new ErrorRequest("RealEstate not found", 404);
  }

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new ErrorRequest("User not found", 404);
  }

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const findSchedule = await scheduleRepo
    .createQueryBuilder("sc")
    .leftJoinAndSelect("sc.realEstate", "re")
    .leftJoinAndSelect("sc.user", "us")
    .where("sc.date = :date", { date })
    .andWhere("sc.hour = :hour", { hour })
    .andWhere("sc.realEstateId = :realEstateId OR sc.userId = :userId", {
      realEstateId,
      userId,
    })
    .getOne();

  if (findSchedule && findSchedule.realEstate.id === realEstateId) {
    throw new ErrorRequest(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (findSchedule && findSchedule.user.id === userId) {
    throw new ErrorRequest(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedule: Schedule = scheduleRepo.create({
    date,
    hour,
    realEstate: property,
    user,
  });

  await scheduleRepo.save(schedule);

  return "Schedule created";
};

export default createScheduleService;
