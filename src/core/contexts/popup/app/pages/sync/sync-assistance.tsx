import React from "react";
import { AsssitenceRepositoryLocator } from "@/core/contexts/shared/assistence/repositories/asssistence.api.repository";
import { MESSAGES } from "@/core/constants/messages";
import { Spinner } from "../../components/spiner";
import { chromeSendMessage } from "../../../helpers/chrome";
import { MONTHS } from "@/core/constants/months";
import { User } from "@/core/types";

type CurrentSectionPage = {
  level: string;
  grade: string;
  section: string;
  month: string;
};

const assistenceRepository = AsssitenceRepositoryLocator.getInstance();
export function SyncAssistance({ user }: { user: User }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const getAssistences = async (sectionPageInfo: CurrentSectionPage) => {
    if (!sectionPageInfo) throw new Error("No se ha podido obtener la sección");
    if (!user?.institution)
      throw new Error("No se ha podido obtener la institución");
    const { level, grade, section } = sectionPageInfo;
    console.log("sectionPageInfo:", sectionPageInfo);
    const classroom = await assistenceRepository.getClassroom({
      level,
      grade,
      section,
      year: new Date().getFullYear().toString(),
      institutionId: String(user.institution.id),
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
      setIsLoading(true);
      await syncClassroom();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className="w-full py-2 px-8 bg-main text-white text-lg rounded-md flex items-center justify-center disabled:bg-main_dark disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      disabled={isLoading}
      onClick={handleClickUpdateClassroom}
    >
      {isLoading && <Spinner />}
      Actualizar Asistencia
    </button>
  );
}
