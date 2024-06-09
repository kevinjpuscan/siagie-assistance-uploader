import { Classroom } from "@/core/types";
import { Assistence } from "./assistence";
import { ClassroomFilters } from "./classroom";

export interface AsssitenceRepository {
  getAssistences: (assistenceQuery: AssistenceQuery) => Promise<Assistence[]>;
  updateAssistences: (assistences: Assistence[]) => Promise<void>;
  getClassroom: (filters: ClassroomFilters) => Promise<Partial<Classroom>>;
}
