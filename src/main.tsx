import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/app/App";
import { getStoredThemePreference } from "@/shared/lib/admin/themePreferenceStorage";
import "./index.css";

const storedTheme = getStoredThemePreference();
if (storedTheme === "dark") {
  document.body.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
