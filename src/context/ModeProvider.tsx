import { useEffect, useState, type ReactNode } from 'react';
import type { SettingsSaved, Mode, RacerSaved, CrewSaved } from '../types/types';
import { StorageService } from '../services/storage';
import { migrateCrewsSave, migrateRacersSave, migrateSettingsSave, updateCollections } from '../services/migration';
import { AppContext } from './AppContext';

const storage = StorageService.getInstance();

export function ModeProvider({ children }: { children: ReactNode }) {
  // LOGIC
  const [mode, setMode] = useState<Mode>('racer');
  const [racersSaved, setRacersSaved] = useState<RacerSaved[]>([]);
  const [crewsSaved, setCrewsSaved] = useState<CrewSaved[]>([]);
  const [settings, setSettings] = useState<SettingsSaved>({});

  useEffect(() => {
    const savedRacers = storage.getRacers();
    if (savedRacers) {
      const migratedRacers = migrateRacersSave(savedRacers as unknown as Record<string, unknown>[]);
      setRacersSaved(migratedRacers);
      storage.saveRacers(migratedRacers);
    }

    const savedCrews = storage.getCrews();
    if (savedCrews) {
      const migratedCrews = migrateCrewsSave(savedCrews as unknown as Record<string, unknown>[]);
      setCrewsSaved(migratedCrews);
      storage.saveCrews(migratedCrews);
    }

    updateCollections();

    const savedSettings = storage.getSettings();
    if (savedSettings) {
      const migratedSettings = migrateSettingsSave(savedSettings as unknown as Record<string, unknown>);
      setSettings(migratedSettings);
      storage.saveSettings(migratedSettings);
    }

    // migrateSettingsSave(savedSettings as unknown as Record<string, unknown>);
  }, []);

  // TEMPLATE
  return (
    <AppContext.Provider value={{ mode, setMode, racersSaved, setRacersSaved, crewsSaved, setCrewsSaved, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
}
