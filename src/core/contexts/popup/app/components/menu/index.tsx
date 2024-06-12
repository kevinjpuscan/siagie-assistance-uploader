import React from "react";
import { useAuthContext } from "../../../context/auth-context";

export function Menu() {
  const { setUser } = useAuthContext();

  const handleClickExit = () => {
    setUser(undefined);
    window.close();
  };

  return (
    <div className="w-full flex gap-2 justify-end">
      <div
        className="px-2 py-1 rounded-md text-white cursor-pointer"
        onClick={handleClickExit}
      >
        Salir
      </div>
    </div>
  );
}
