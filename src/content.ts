import { Assistence } from "@/core/contexts/shared/assistence/models/assistence";
import {
  updateDomData,
  getDomData,
} from "@/core/contexts/content/assistance-handler";
import { getCurrentSeccion } from "@/core/contexts/content/seccion-handler";
import { MESSAGES } from "./core/constants/messages";
import {
  getClassroomSelected,
  getStudents,
} from "@/core/contexts/content/classroom-handler";
import { ClassroomInfo } from "./core/contexts/shared/classroom/models/classroom-info";

console.log("content7.ts");
const syncAssistances = (assistances: Assistence[]) => {
  const studentAssistences = getDomData("tblAsistencia");
  console.log("data:", studentAssistences);
  console.log("assistances:", assistances);
  return updateDomData(assistances, studentAssistences);
};

const updateClassroom = () => {
  const data = getCurrentSeccion();
  return data;
};

const getClassroom = () => {
  const classroom = getClassroomSelected();
  const students = getStudents();
  return {
    grade: classroom.grade,
    section: classroom.section,
    level: classroom.level,
    students,
  } satisfies ClassroomInfo;
};

const actions = {
  [MESSAGES.SYNC_ASSYSTANCES]: syncAssistances,
  [MESSAGES.UPDATE_CLASSROOM]: updateClassroom,
  [MESSAGES.GET_CLASSROOM]: getClassroom,
};
// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const message = request.message as MESSAGES;
    console.log("message:", message);
    if (!actions[message]) throw new Error("Message not found");
    const response = actions[message](request.data);
    console.log("response:", response);
    if (response) sendResponse(response);
  } catch (error) {
    console.error(error);
    alert(error);
  }
});
