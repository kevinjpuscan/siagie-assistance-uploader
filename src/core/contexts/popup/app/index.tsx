import React from "react";
import { SyncAssistance } from "./pages/sync-assistance";
import { Login } from "./pages/login";
import { useAuthContext } from "../context/auth-context";
import { Layout } from "./components/layouts/main";
import { useNavContext } from "../context/nav-context";
import { NAV_ITEM } from "@/core/constants/nav";
import { SyncClassroom } from "./pages/sync-clasroom";

export function App() {
  const { user } = useAuthContext();
  const { page } = useNavContext();
  return (
    <>
      {!!user ? (
        <Layout>
          {page === NAV_ITEM.ASSISTANCE && <SyncAssistance />}
          {page === NAV_ITEM.CLASSROOMS && <SyncClassroom />}
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}
