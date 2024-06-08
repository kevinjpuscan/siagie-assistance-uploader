import { Student } from "@/core/types";

export type ClassroomInfo = {
  grade: string;
  section: string;
  institutionId?: string;
  students: Student[];
};
