import ReactDOM from "react-dom/client";
import { App } from "./app";
import React from "react";

const domContainer = document.querySelector("#app");
if (!!domContainer) {
  ReactDOM.createRoot(domContainer).render(<App />);
}
