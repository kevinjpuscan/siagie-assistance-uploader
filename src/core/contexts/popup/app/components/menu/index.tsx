import React from "react";
import { useNavContext } from "@/core/contexts/popup/context/nav-context";
import { useAuthContext } from "../../../context/auth-context";
import { NAV_ITEM } from "@/core/constants/nav";

export function Menu() {
  const { setPage } = useNavContext();
  const { setUser } = useAuthContext();
  const handleClickAssistance = () => {
    setPage(NAV_ITEM.ASSISTANCE);
  };
  const handleClickClassroom = () => {
    setPage(NAV_ITEM.CLASSROOMS);
  };
  const handleClickExit = () => {
    setPage(NAV_ITEM.ASSISTANCE);
    setUser(undefined);
  };
  return (
    <div className="w-full flex gap-2 justify-end">
      <div
        className="px-2 py-1 rounded-md text-white cursor-pointer"
        onClick={handleClickAssistance}
      >
        Asistencia
      </div>
      <div
        className="px-2 py-1 rounded-md text-white cursor-pointer"
        onClick={handleClickClassroom}
      >
        Aulas
      </div>
      <div
        className="px-2 py-1 rounded-md text-white cursor-pointer"
        onClick={handleClickExit}
      >
        Salir
      </div>
    </div>
  );
}
