import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { router } from "./Router";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider } from "react-router-dom";
import { shadesOfPurple } from "@clerk/themes";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
