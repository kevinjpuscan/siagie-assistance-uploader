import { getDomData } from "@/core/contexts/content/dom-handler";
import { Assistence } from "@/core/contexts/shared/assistence/models/assistence";
import { updateDomData } from "@/core/contexts/content/dom-handler";
import { getCurrentSeccion } from "@/core/contexts/content/seccion-handler";
import { MESSAGES } from "./core/constants/messages";
console.log("content7.ts");
const syncAssistances = async (assistances: Assistence[]) => {
  const studentAssistences = getDomData("tblAsistencia");
  console.log("data:", studentAssistences);
  console.log("assistances:", assistances);
  updateDomData(assistances, studentAssistences);
};

const updateClassroom = () => {
  const data = getCurrentSeccion();
  return data;
};

const actions = {
  [MESSAGES.SYNC_ASSYSTANCES]: syncAssistances,
  [MESSAGES.UPDATE_CLASSROOM]: updateClassroom,
};
// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const message = request.message as MESSAGES;
    console.log("message:", message);
    if (!actions[message]) throw new Error("Message not found");
    const response = actions[message](request.data);
    if (response) sendResponse(response);
  } catch (error) {
    console.error(error);
    alert(error);
  }
});
