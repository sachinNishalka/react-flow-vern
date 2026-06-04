import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DnDProvider } from "./context/DnDProvider.jsx";
import { ReactFlowProvider } from "@xyflow/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactFlowProvider>
      <DnDProvider>
        <App />
      </DnDProvider>
    </ReactFlowProvider>
  </StrictMode>,
);
