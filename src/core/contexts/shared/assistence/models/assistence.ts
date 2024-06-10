import { ASSISTENCE_VALUES } from "@/core/constants/assistance";
import { Student } from "@/core/types";
export type StudentForAssistence = Pick<
  Student,
  "dni" | "first_names" | "last_names"
>;

export interface Assistence {
  id: number;
  type: ASSISTENCE_VALUES;
  entry_time: Date;
  student: StudentForAssistence;
  day: string;
}
