import ReactDOM from "react-dom/client";
import { App } from "./core/contexts/popup/app";
import React from "react";
import "./core/contexts/popup/styles/tailwind.css";

const domContainer = document.querySelector("#app");
if (!!domContainer) {
  ReactDOM.createRoot(domContainer).render(<App />);
}
