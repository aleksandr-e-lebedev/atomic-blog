import { createContext, useContext, useState, useCallback } from "react";

import { useGetArchive, useArchivePost } from "@/hooks";
import type { GetArchiveState, ArchivePostState } from "@/hooks";

interface ArchiveState {
  showArchive: boolean;
  toggleArchive: () => void;
  getArchiveState: GetArchiveState;
  archivePostState: ArchivePostState;
}

const ArchiveContext = createContext<ArchiveState | null>(null);
ArchiveContext.displayName = "ArchiveState";

export function ArchiveProvider({ children }: { children: React.ReactNode }) {
  // Local UI State
  const [showArchive, setShowArchive] = useState(false);

  const toggleArchive = useCallback(() => {
    setShowArchive(!showArchive);
  }, [showArchive]);

  // Global Remote State
  const getArchiveState = useGetArchive();
  const archivePostState = useArchivePost();

  const state: ArchiveState = {
    showArchive,
    toggleArchive,
    getArchiveState,
    archivePostState,
  };

  return (
    <ArchiveContext.Provider value={state}>{children}</ArchiveContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useArchive() {
  const state = useContext(ArchiveContext);

  if (!state) {
    throw new Error("useArchive must be used within the ArchiveProvider");
  }

  return state;
}
