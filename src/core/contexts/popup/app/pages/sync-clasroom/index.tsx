import React from "react";
import { MESSAGES } from "@/core/constants/messages";
import { ClassroomInfo } from "@/core/contexts/shared/classroom/models/classroom-info";
import { ClassroomApiRepositoryLocator } from "@/core/contexts/shared/classroom/repositories/classroom.api.repository";

export function SyncClassroom() {
  const [classRoomInfo, setclassRoomInfo] =
    React.useState<ClassroomInfo | null>(null);

  const handleClickSyncClassroom = async () => {
    try {
      // @ts-ignore
      await chrome.tabs.query({ active: true }, async function (tabs) {
        let tab = tabs[0];
        // @ts-ignore
        await chrome.tabs.sendMessage(
          tab.id,
          {
            message: MESSAGES.GET_CLASSROOM,
          },
          async function (response) {
            try {
              const classRoomInfo = response as ClassroomInfo;
              console.log("classRoomInfo:", classRoomInfo);
              await syncClassroom(classRoomInfo);
              alert("Aula sincronizada");
            } catch (error) {
              console.error(error);
              alert("No se ha podido sincronizar la sección");
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error");
    }
  };

  const syncClassroom = async (classRoomInfo) => {
    if (!classRoomInfo) {
      alert("No se ha podido obtener la información de la sección");
      return;
    }
    setclassRoomInfo(classRoomInfo);
    const classroomRepository = ClassroomApiRepositoryLocator.getInstance();
    await classroomRepository.syncClassroom(classRoomInfo);
    setclassRoomInfo(null);
  };
  return (
    <div className="w-full h-full p-4 bg-secondary text-white flex flex-col justify-center items-center">
      <div className="py-6">
        <h1 className="text-2xl font-bold">Syncronizar Aula</h1>
        {!!classRoomInfo && (
          <div className="w-full flex flex-col justify-center items-center">
            <div>Sincronizando</div>
            <div>Grado: {classRoomInfo.grade}</div>
            <div>Sección: {classRoomInfo.section}</div>
          </div>
        )}
      </div>
      <div className="py-6">
        <button
          className="w-full py-2 px-8 bg-main text-white text-lg rounded-md"
          type="button"
          onClick={handleClickSyncClassroom}
        >
          Sincronizar sección
        </button>
      </div>
    </div>
  );
}
