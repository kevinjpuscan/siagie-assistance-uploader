import { ASSISTENCE_VALUES } from "@/core/constants/assistance";

export interface Student {
  dni: string;
  first_names: string;
  last_names: string;
}
export interface Assistence {
  id: number;
  type: ASSISTENCE_VALUES;
  entry_time: Date;
  student: Student;
}
