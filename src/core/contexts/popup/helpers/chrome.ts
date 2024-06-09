import { MESSAGES } from "@/core/constants/messages";

export type ChromeContentSend = {
  message: MESSAGES;
  data?: any;
};
export const chromeSendMessage = async (content: ChromeContentSend) => {
  try {
    // @ts-ignore
    const tabs = await chrome.tabs.query({ active: true });
    let tab = tabs[0];
    const result =
      // @ts-ignore
      await chrome.tabs.sendMessage(tab.id, {
        message: content.message,
        data: content.data,
      });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Verifica si te encuentras en la pestaña correcta o vuelve a intentarlo en unos minutos"
    );
  }
};
