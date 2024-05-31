import ReactDOM from "react-dom/client";
import { App } from "./core/contexts/popup/app";
import React from "react";
import "./core/contexts/popup/styles/tailwind.css";
import AuthProvider from "./core/contexts/popup/provider/auth-provider/auth-provider";
import NavProvider from "./core/contexts/popup/provider/nav-provider/nav-provider";

const domContainer = document.querySelector("#app");

if (!!domContainer) {
  ReactDOM.createRoot(domContainer).render(
    <React.StrictMode>
      <AuthProvider>
        <NavProvider>
          <App />
        </NavProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
