import React from "react";
import { AsssitenceRepositoryLocator } from "@/core/contexts/shared/assistence/repositories/asssistence.api.repository";
import { MESSAGES } from "@/core/constants/messages";

type CurrentSectionPage = {
  grade: string;
  section: string;
  month: string;
};

export function App() {
  const [sectionPageInfo, setSectionPageInfo] =
    React.useState<CurrentSectionPage | null>(null);

  const getAssistences = async () => {
    const assistenceRepository = AsssitenceRepositoryLocator.getInstance();
    const assistences = await assistenceRepository.getAssistences({
      classroom: 1,
      year: "2024",
      month: "05",
    });
    return assistences;
  };

  const handleClickProccess = async () => {
    const assistences = await getAssistences();
    // @ts-ignore
    await chrome.tabs.query({ active: true }, async function (tabs) {
      let tab = tabs[0];
      // @ts-ignore
      await chrome.tabs.sendMessage(tab.id, {
        message: MESSAGES.SYNC_ASSYSTANCES,
        data: assistences,
      });
    });
  };

  const handleClickUpdateClassroom = async () => {
    // @ts-ignore
    await chrome.tabs.query({ active: true }, async function (tabs) {
      let tab = tabs[0];
      // @ts-ignore
      await chrome.tabs.sendMessage(
        tab.id,
        {
          message: MESSAGES.UPDATE_CLASSROOM,
        },
        function (response) {
          const currentSectionPage = response as CurrentSectionPage;
          setSectionPageInfo(currentSectionPage);
        }
      );
    });
  };
  return (
    <div className="w-full h-full p-4 bg-secondary text-white flex flex-col justify-center items-center">
      <div className="py-6">
        <h1 className="text-2xl font-bold">Carga de asistencia SIAGIE</h1>
        {!!sectionPageInfo && (
          <div className="w-full flex flex-col justify-center items-center">
            <div>Grado: {sectionPageInfo.grade}</div>
            <div>Sección: {sectionPageInfo.section}</div>
            <div>Mes: {sectionPageInfo.month}</div>
          </div>
        )}
      </div>
      <div className="py-6">
        <button
          className="w-full py-2 px-8 bg-main text-white text-lg rounded-md"
          type="button"
          onClick={handleClickUpdateClassroom}
        >
          Actualizar sección
        </button>
      </div>
      <div className="py-6">
        {!!sectionPageInfo && (
          <button
            className="w-full py-2 px-8 bg-main text-white text-lg rounded-md"
            type="button"
            onClick={handleClickProccess}
          >
            Procesar
          </button>
        )}
      </div>
    </div>
  );
}
