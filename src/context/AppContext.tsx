// src/context/DisplayModeContext.tsx
import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { ISettings, Mode, RacerSaved, CrewSaved } from '../types/types';
import { StorageService } from '../services/storage';
import { migrateCrewsSave, migrateRacersSave, updateCollections } from '../services/migration';

const storage = StorageService.getInstance();

export const AppContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
  racers: RacerSaved[];
  setRacers: (racers: RacerSaved[]) => void;
  crews: CrewSaved[];
  setCrews: (crews: CrewSaved[]) => void;
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}>({
  mode: 'racer',
  setMode: () => {},
  racers: [],
  setRacers: () => {},
  crews: [],
  setCrews: () => {},
  settings: {},
  setSettings: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  // LOGIC
  const [mode, setMode] = useState<Mode>('racer');
  const [racers, setRacers] = useState<RacerSaved[]>([]);
  const [crews, setCrews] = useState<CrewSaved[]>([]);
  const [settings, setSettings] = useState<ISettings>({});

  useEffect(() => {
    const savedRacers = storage.getRacers();

    if (savedRacers) {
      const migratedRacers = migrateRacersSave(savedRacers as unknown as Record<string, unknown>[]);
      setRacers(migratedRacers);
      storage.saveRacers(migratedRacers);
    }

    const savedCrews = storage.getCrews();
    if (savedCrews) {
      const migratedCrews = migrateCrewsSave(savedCrews as unknown as Record<string, unknown>[]);
      setCrews(migratedCrews);
      storage.saveCrews(migratedCrews);
    }
    updateCollections();
    const savedSettings = storage.getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }

    // migrateSettingsSave(savedSettings as unknown as Record<string, unknown>);
  }, []);

  // TEMPLATE
  return <AppContext.Provider value={{ mode, setMode, racers, setRacers, crews, setCrews, settings, setSettings }}>{children}</AppContext.Provider>;
}
