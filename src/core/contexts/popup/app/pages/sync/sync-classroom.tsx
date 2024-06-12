import React, { useEffect } from "react";
import { MESSAGES } from "@/core/constants/messages";
import { ClassroomInfo } from "@/core/contexts/shared/classroom/models/classroom-info";
import { ClassroomApiRepositoryLocator } from "@/core/contexts/shared/classroom/repositories/classroom.api.repository";
import { chromeSendMessage } from "../../../helpers/chrome";
import { Shift } from "@/core/types";

const classroomRepository = ClassroomApiRepositoryLocator.getInstance();

export function SyncClassroom({ user: User }) {
  const [shifts, setShifts] = React.useState<Shift[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchShifts = async () => {
      const shifts = await classroomRepository.getShifts(User.institution.id);
      setShifts(shifts);
    };
    fetchShifts();
  }, []);

  const validateClassroom = (classRoomInfo) => {
    if (!classRoomInfo) {
      throw new Error("No se ha podido obtener la información de la sección");
      return false;
    }
    if (
      !classRoomInfo.level ||
      !classRoomInfo.grade ||
      !classRoomInfo.section
    ) {
      throw new Error("No se ha podido obtener la información de la sección");
    }
    if (!classRoomInfo.students || classRoomInfo.students.length === 0) {
      throw new Error(
        "No se ha podido obtener la información de los estudiantes"
      );
    }
  };
  const handleSubmitClassrom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const shiftId = Number(formData.get("shift"));
      const classRoomInfo: ClassroomInfo = await chromeSendMessage({
        message: MESSAGES.GET_CLASSROOM,
      });
      validateClassroom(classRoomInfo);
      classRoomInfo.shiftId = shiftId;
      console.log("classRoomInfo:", classRoomInfo);
      await syncClassroom(classRoomInfo);
      alert(
        "Aula sincronizada: " +
          classRoomInfo.grade +
          " " +
          classRoomInfo.section
      );
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncClassroom = async (classRoomInfo) => {
    if (!classRoomInfo) {
      alert("No se ha podido obtener la información de la sección");
      return;
    }
    const classroomRepository = ClassroomApiRepositoryLocator.getInstance();
    await classroomRepository.syncClassroom(classRoomInfo);
  };
  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmitClassrom}
    >
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="shift">Turno:</label>
        </div>
        <div>
          <select
            name="shift"
            id="shift"
            className="w-full p-2 text-md rounded-md text-secondary"
          >
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.name.toLocaleUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button
          className="w-full py-2 px-8 bg-main text-white text-lg rounded-md flex items-center justify-center disabled:bg-main_dark disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 mr-3 ... size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          )}
          Sincronizar sección
        </button>
      </div>
    </form>
  );
}
