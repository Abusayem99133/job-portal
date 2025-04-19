import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/them-provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    ></ThemeProvider>
    <RouterProvider router={router} />
  </StrictMode>
);
