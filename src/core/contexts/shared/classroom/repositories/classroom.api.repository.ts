import fetchApi from "src/core/helpers/fetch";
import { ClassroomInfo } from "../models/classroom-info";
import { Shift } from "@/core/types";

export class ClassroomApiRepository {
  syncClassroom: (classroomInfo: ClassroomInfo) => Promise<void> = async (
    classroomInfo
  ) => {
    await fetchApi.post("sync-classrooms", classroomInfo);
  };
  getShifts: (institutionId: number) => Promise<Shift[]> = async (
    institutionId
  ) => {
    const query = {
      filters: {
        institution: institutionId,
      },
      fields: ["id", "name"],
    };
    const shiftsResponse = await fetchApi.get("shifts", query);
    return shiftsResponse.data.map(({ id, attributes }) => ({
      id,
      name: attributes.name,
    })) as Shift[];
  };
}

export class ClassroomApiRepositoryLocator {
  static getInstance(): ClassroomApiRepository {
    return new ClassroomApiRepository();
  }
}
