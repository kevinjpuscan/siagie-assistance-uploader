import fetchApi from "src/core/helpers/fetch";
import { AssistenceResponse } from "./assistence.response";
import { Assistence } from "../models/assistence";
import { AsssitenceRepository } from "@/core/contexts/shared/assistence/models/assistence.repository";
import { ClassroomFilters } from "../models/classroom";
import { Classroom } from "@/core/types";
export class AssistenceApiRepository {
  getAssistences: (assistenceQuery: AssistenceQuery) => Promise<Assistence[]> =
    async (assistenceQuery) => {
      const getByPage: (page: number) => Promise<Assistence[]> = async (
        page
      ) => {
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
          pagination: {
            page: page,
            pageSize: 100,
          },
        };
        const assistenceResponse: AssistenceResponse = await fetchApi.get(
          "assistances",
          query
        );
        const assistances = assistenceResponse.data.map((assistence) => ({
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
        if (
          assistenceResponse.meta.pagination.pageCount >
          assistenceResponse.meta.pagination.page
        ) {
          return assistances.concat(await getByPage(page + 1));
        } else {
          return assistances;
        }
      };
      return await getByPage(1);
    };

  updateAssistences: (assistences: Assistence[]) => Promise<void> = async (
    assistences
  ) => {
    for (const assistence of assistences) {
      await fetchApi.put(`assistances/${assistence.id}`, {
        data: {
          type: assistence.type,
        },
      });
    }
  };
  getClassroom: (filters: ClassroomFilters) => Promise<Partial<Classroom>> =
    async (filters) => {
      const query = {
        fields: ["id", "level", "grade", "section"],
        filters: {
          grade: filters.grade,
          section: filters.section,
          level: filters.level,
          institution: filters.institutionId,
          year: filters.year,
        },
      };
      const classroomResponse = await fetchApi.get("classrooms", query);
      const classroom = classroomResponse.data[0] as Partial<Classroom>;
      return classroom;
    };
}

export class AsssitenceRepositoryLocator {
  static getInstance(): AsssitenceRepository {
    return new AssistenceApiRepository();
  }
}
