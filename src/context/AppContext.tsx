// src/context/DisplayModeContext.tsx
import { createContext } from 'react';
import type { SettingsSaved, Mode, RacerSaved, CrewSaved } from '../types/types';

export const settingsDefaults: SettingsSaved = {
  lang: 'en',
  dark: false,
  transparant: false,
  MPLGoal: 40,
  starGoal: 6,
  superChargeLevelGoal: 2,
  theme: '',
  hideColumn: [],
};

export const AppContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
  racersSaved: RacerSaved[];
  setRacersSaved: (racers: RacerSaved[]) => void;
  updateRacers: (racers: RacerSaved[]) => void;
  crewsSaved: CrewSaved[];
  setCrewsSaved: (crews: CrewSaved[]) => void;
  updateCrews: (racers: CrewSaved[]) => void;
  settings: SettingsSaved;
  setSettings: (settings: SettingsSaved) => void;
  updateSettings: (racers: SettingsSaved) => void;
}>({
  mode: 'racer',
  setMode: () => {},
  racersSaved: [],
  setRacersSaved: () => {},
  updateRacers: () => {},
  crewsSaved: [],
  setCrewsSaved: () => {},
  updateCrews: () => {},
  settings: settingsDefaults,
  setSettings: () => {},
  updateSettings: () => {},
});
