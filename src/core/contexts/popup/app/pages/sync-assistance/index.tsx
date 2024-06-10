import React from "react";
import { AsssitenceRepositoryLocator } from "@/core/contexts/shared/assistence/repositories/asssistence.api.repository";
import { MESSAGES } from "@/core/constants/messages";
import { getAuthUser } from "@/core/helpers/auth";
import { chromeSendMessage } from "../../../helpers/chrome";
import { MONTHS } from "@/core/constants/months";

type CurrentSectionPage = {
  level: string;
  grade: string;
  section: string;
  month: string;
};
const assistenceRepository = AsssitenceRepositoryLocator.getInstance();

export function SyncAssistance() {
  const [sectionPageInfo, setSectionPageInfo] =
    React.useState<CurrentSectionPage | null>(null);

  const getAssistences = async (sectionPageInfo: CurrentSectionPage) => {
    if (!sectionPageInfo) throw new Error("No se ha podido obtener la sección");
    const user = await getAuthUser();
    console.log("user:", user);
    if (!user?.institution)
      throw new Error("No se ha podido obtener la institución");
    const { level, grade, section } = sectionPageInfo;
    console.log("sectionPageInfo:", sectionPageInfo);
    const classroom = await assistenceRepository.getClassroom({
      level,
      grade,
      section,
      year: new Date().getFullYear().toString(),
      institutionId: user.institution.id,
    });
    if (!classroom) return;
    const assistences = await assistenceRepository.getAssistences({
      classroom: classroom.id as number,
      year: new Date().getFullYear().toString(),
      month: MONTHS[sectionPageInfo.month],
    });
    console.log("assistences:", assistences);
    return assistences;
  };
  const syncClassroom = async () => {
    const currentSectionPage: CurrentSectionPage = await chromeSendMessage({
      message: MESSAGES.UPDATE_CLASSROOM,
    });
    setSectionPageInfo(currentSectionPage);
    const assistences = await getAssistences(currentSectionPage);
    if (!assistences)
      throw new Error("No se ha podido obtener las asistencias");
    const assistanceToUpdate = await chromeSendMessage({
      message: MESSAGES.SYNC_ASSYSTANCES,
      data: assistences,
    });

    await assistenceRepository.updateAssistences(assistanceToUpdate);
  };
  const handleClickUpdateClassroom = async () => {
    try {
      await syncClassroom();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="w-full h-full p-4 bg-secondary text-white flex flex-col justify-center items-center">
      <div className="py-6">
        <h1 className="text-2xl font-bold">Carga de asistencia SIAGIE</h1>
        {!!sectionPageInfo && (
          <div className="w-full flex flex-col justify-center items-center">
            <div>Nivel: {sectionPageInfo.level}</div>
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
          Actualizar Asistencia
        </button>
      </div>
    </div>
  );
}
