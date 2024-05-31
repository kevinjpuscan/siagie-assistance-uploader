import React from "react";
import { Menu } from "../menu";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full p-4 bg-secondary text-white flex flex-col justify-center items-center gap-6">
      <Menu />
      {children}
    </div>
  );
}
