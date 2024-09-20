import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const domNode = document.getElementById("root") as Element;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
