import fetchApi from "src/core/helpers/fetch";
import { ClassroomInfo } from "../models/classroom-info";

export class ClassroomApiRepository {
  syncClassroom: (classroomInfo: ClassroomInfo) => Promise<void> = async (
    classroomInfo
  ) => {
    await fetchApi.post("sync-classrooms", classroomInfo);
  };
}

export class ClassroomApiRepositoryLocator {
  static getInstance(): ClassroomApiRepository {
    return new ClassroomApiRepository();
  }
}
