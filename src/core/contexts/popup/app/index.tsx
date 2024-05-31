import React, { useState } from "react";
import { SyncAssistance } from "./pages/sync-assistance";
import { Login } from "./pages/login";
import { useAuthContext } from "../context/auth-context";

export function App() {
  const { user } = useAuthContext();
  return <>{!!user ? <SyncAssistance /> : <Login />}</>;
}
