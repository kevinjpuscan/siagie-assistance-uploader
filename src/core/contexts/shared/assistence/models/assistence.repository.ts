import { Assistence } from "./assistence";

export interface AsssitenceRepository {
  getAssistences: (assistenceQuery: AssistenceQuery) => Promise<Assistence[]>;
  updateAssistences: (assistences: Assistence[]) => Promise<void>;
}
