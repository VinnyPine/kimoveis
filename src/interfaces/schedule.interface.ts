import { z } from "zod";
import {
  scheduleSchema,
  scheduleRequestSchema,
  scheduleResponseSchema,
  schedulesResponseSchema,
} from "../schemas";

type iSchedule = z.infer<typeof scheduleSchema>;
type iScheduleRequest = z.infer<typeof scheduleRequestSchema>;
type iScheduleResponse = z.infer<typeof scheduleResponseSchema>;
type iSchedulesResponse = z.infer<typeof schedulesResponseSchema>;

export { iSchedule, iScheduleRequest, iScheduleResponse, iSchedulesResponse };
