import { createContext, useContext, useState, useCallback } from "react";

import { useGetArchive } from "@/hooks";
import type { GetArchiveState } from "@/hooks";

interface ArchiveState {
  showArchive: boolean;
  toggleArchive: () => void;
  getArchiveState: GetArchiveState;
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

  const state: ArchiveState = {
    showArchive,
    toggleArchive,
    getArchiveState,
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
