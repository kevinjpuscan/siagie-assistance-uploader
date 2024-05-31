import ReactDOM from "react-dom/client";
import { App } from "./core/contexts/popup/app";
import React from "react";
import "./core/contexts/popup/styles/tailwind.css";
import AuthProvider from "./core/contexts/popup/provider/auth-provider/auth-provider";

const domContainer = document.querySelector("#app");

if (!!domContainer) {
  ReactDOM.createRoot(domContainer).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
}
