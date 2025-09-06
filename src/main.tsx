import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import { PostsProvider } from "@/contexts/PostsContext";
import { ArchiveProvider } from "@/contexts/ArchiveContext";

import "./api/server.ts";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostsProvider>
      <ArchiveProvider>
        <App />
      </ArchiveProvider>
    </PostsProvider>
  </StrictMode>
);
