import React from "react";
import { AsssitenceRepositoryLocator } from "@/core/contexts/shared/assistence/repositories/asssistence.api.repository";

export function App() {
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
      await chrome.tabs.sendMessage(tab.id, { message: assistences });
    });
  };
  return (
    <div className="w-full h-full p-4 bg-secondary text-white flex flex-col justify-center items-center">
      <div className="py-6">
        <h1 className="text-2xl font-bold">Carga de asistencia SIAGIE</h1>
      </div>
      <div>
        <div className="mb-3 w-full py-2">
          <label
            htmlFor="formFile"
            className="mb-2 inline-bloc text-neutral-200"
          >
            Formato: xls
          </label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-main px-3 py-[0.32rem] text-md font-normal text-white transition duration-300 ease-in-out 
            file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none 
            file:text-md file:border-0 file:border-solid file:border-inherit file:bg-main file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]
             hover:file:bg-main_light focus:border-primary 
             focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
            type="file"
            id="formFile"
          />
        </div>
      </div>
      <div className="py-6">
        <button
          className="w-full py-2 px-8 bg-main text-white text-lg rounded-md"
          type="button"
          onClick={handleClickProccess}
        >
          Procesar
        </button>
      </div>
    </div>
  );
}
