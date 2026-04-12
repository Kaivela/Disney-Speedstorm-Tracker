// src/context/DisplayModeContext.tsx
import { createContext, useState, type ReactNode } from 'react';

type Mode = 'racer' | 'crew';

export const ModeContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}>({
  mode: 'racer',
  setMode: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('racer');

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}
