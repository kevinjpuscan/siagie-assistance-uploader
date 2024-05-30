import { getDomData } from "@/core/contexts/content/dom-handler";
import { Assistence } from "@/core/contexts/shared/assistence/models/assistence";
import { updateDomData } from "@/core/contexts/content/dom-handler";
console.log("content7.ts");
// @ts-ignore
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    const studentAssistences = getDomData("tblAsistencia");
    console.log("data:", studentAssistences);
    const assistances = request.message as Assistence[];
    console.log("assistances:", assistances);
    updateDomData(assistances, studentAssistences);
  } catch (error) {
    alert(error);
  }
});
