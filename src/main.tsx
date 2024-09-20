import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {Provider } from "react-redux"
import {store} from "./state/store.ts"

const domNode = document.getElementById("root") as Element;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
