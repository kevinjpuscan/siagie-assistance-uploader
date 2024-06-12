import React, { useEffect } from "react";
import { SyncAssistance } from "./sync-assistance";
import { SyncClassroom } from "./sync-classroom";
import { getAuthUser } from "@/core/helpers/auth";
import { User } from "@/core/types";
export function Sync() {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  useEffect(() => {
    const fetchUser = async () => {
      const user = (await getAuthUser()) as User;
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <div className="w-full h-full p-3 bg-secondary text-white flex flex-col items-center">
      <div className="py-2">
        <h1 className="text-2xl font-bold">Sincronización SIAGIE</h1>
      </div>
      {user && (
        <div className="py-6 w-full h-full grid grid-cols-1 grid-rows-2 gap-4">
          <div className=" p-4 rounded-md border border-gray-600 flex flex-col items-center justify-center">
            <SyncAssistance user={user} />
          </div>
          <div className=" p-4 rounded-md border border-gray-600 flex flex-col items-center justify-center">
            <SyncClassroom user={user} />
          </div>
        </div>
      )}
    </div>
  );
}
