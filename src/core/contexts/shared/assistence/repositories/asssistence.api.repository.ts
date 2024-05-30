import fetchApi from "src/core/helpers/fetch";
import { AssistenceResponse } from "./assistence.response";

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
        fields: ["is_late", "entry_time"],
      };
      const assistenceResponse: AssistenceResponse = await fetchApi.get(
        "assistences",
        query
      );
      return assistenceResponse.data.map((assistence) => ({
        id: assistence.id,
        is_late: assistence.attributes.is_late,
        entry_time: new Date(assistence.attributes.entry_time),
        student: {
          dni: assistence.attributes.student.data.attributes.dni,
          first_names:
            assistence.attributes.student.data.attributes.first_names,
          last_names: assistence.attributes.student.data.attributes.last_names,
        },
      }));
    };
}

export class AsssitenceRepositoryLocator {
  static getInstance(): AsssitenceRepository {
    return new AssistenceApiRepository();
  }
}
