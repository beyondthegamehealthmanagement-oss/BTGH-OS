import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type SavedEventsContextValue = {
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const SavedEventsContext = createContext<SavedEventsContextValue | null>(null);

/** In-memory saved events; resets when the app reloads. */
export function SavedEventsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<ReadonlySet<string>>(new Set());

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ isSaved: (id: string) => savedIds.has(id), toggleSaved }),
    [savedIds, toggleSaved]
  );

  return <SavedEventsContext.Provider value={value}>{children}</SavedEventsContext.Provider>;
}

export function useSavedEvents() {
  const context = useContext(SavedEventsContext);
  if (!context) {
    throw new Error('useSavedEvents must be used inside SavedEventsProvider');
  }
  return context;
}
