import React from "react";
import { Login } from "./pages/login";
import { useAuthContext } from "../context/auth-context";
import { Layout } from "./components/layouts/main";
import { useNavContext } from "../context/nav-context";
import { NAV_ITEM } from "@/core/constants/nav";
import { Sync } from "./pages/sync";

export function App() {
  const { user } = useAuthContext();
  const { page } = useNavContext();
  return (
    <>
      {!!user ? (
        <Layout>{page === NAV_ITEM.SYNC && <Sync />}</Layout>
      ) : (
        <Login />
      )}
    </>
  );
}
