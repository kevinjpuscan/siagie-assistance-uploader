import fetchApi from "src/core/helpers/fetch";
import { AssistenceResponse } from "./assistence.response";
import { Assistence } from "../models/assistence";
import { AsssitenceRepository } from "@/core/contexts/shared/assistence/models/assistence.repository";
export class AssistenceApiRepository implements AsssitenceRepository {
  getAssistences: (assistenceQuery: AssistenceQuery) => Promise<Assistence[]> =
    async (assistenceQuery) => {
      const query = {
        populate: {
          filters: {
            classroom: assistenceQuery.classroom,
            year: assistenceQuery.year,
            month: assistenceQuery.month,
          },
          student: {
            fields: ["dni", "first_names", "last_names"],
          },
        },
        fields: ["type", "entry_time"],
      };
      const assistenceResponse: AssistenceResponse = await fetchApi.get(
        "assistences",
        query
      );
      return assistenceResponse.data.map((assistence) => ({
        id: assistence.id,
        type: assistence.attributes.type,
        entry_time: new Date(assistence.attributes.entry_time),
        student: {
          dni: assistence.attributes.student.data.attributes.dni,
          first_names:
            assistence.attributes.student.data.attributes.first_names.trim(),
          last_names:
            assistence.attributes.student.data.attributes.last_names.trim(),
        },
      }));
    };
}

export class AsssitenceRepositoryLocator {
  static getInstance(): AsssitenceRepository {
    return new AssistenceApiRepository();
  }
}
