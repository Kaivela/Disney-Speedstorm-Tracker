import { useEffect, useState, type ReactNode } from 'react';
import type { SettingsSaved, Mode, RacerSaved, CrewSaved } from '../types/types';
import { StorageService } from '../services/storage';
import { migrateCrewsSave, migrateRacersSave, migrateSettingsSave, updateCollections } from '../services/migration';
import { AppContext, settingsDefaults } from './AppContext';

const storage = StorageService.getInstance();

export function ModeProvider({ children }: { children: ReactNode }) {
  // LOGIC
  const [mode, setMode] = useState<Mode>('racer');
  const [racersSaved, setRacersSaved] = useState<RacerSaved[]>([]);
  const [crewsSaved, setCrewsSaved] = useState<CrewSaved[]>([]);
  const [settings, setSettings] = useState<SettingsSaved>(settingsDefaults);

  function updateRacers(racers: RacerSaved[]) {
    setRacersSaved(racers);
    storage.saveRacers(racers);
  }
  function updateCrews(crews: CrewSaved[]) {
    setCrewsSaved(crews);
    storage.saveCrews(crews);
  }
  function updateSettings(settings: SettingsSaved) {
    setSettings(settings);
    storage.saveSettings(settings);
  }

  useEffect(() => {
    const savedRacers = storage.getRacers();
    if (savedRacers) {
      const migratedRacers = migrateRacersSave(savedRacers as unknown as Record<string, unknown>[]);
      updateRacers(migratedRacers);
    }

    const savedCrews = storage.getCrews();
    if (savedCrews) {
      const migratedCrews = migrateCrewsSave(savedCrews as unknown as Record<string, unknown>[]);
      updateCrews(migratedCrews);
    }

    updateCollections();

    const savedSettings = storage.getSettings();
    if (savedSettings) {
      const migratedSettings = migrateSettingsSave(savedSettings as unknown as Record<string, unknown>);
      updateSettings(migratedSettings);
    }
  }, []);

  // TEMPLATE
  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        racersSaved,
        setRacersSaved,
        updateRacers,
        crewsSaved,
        setCrewsSaved,
        updateCrews,
        settings,
        setSettings,
        updateSettings,
      }}>
      {children}
    </AppContext.Provider>
  );
}
