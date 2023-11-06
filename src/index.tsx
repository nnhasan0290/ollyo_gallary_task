import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ContextProvider from "./utils/context/Context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //global context
  <ContextProvider>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </ContextProvider>
);
