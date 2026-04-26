// src/context/DisplayModeContext.tsx
import { createContext } from 'react';
import type { SettingsSaved, Mode, RacerSaved, CrewSaved } from '../types/types';

export const AppContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
  racersSaved: RacerSaved[];
  setRacersSaved: (racers: RacerSaved[]) => void;
  crewsSaved: CrewSaved[];
  setCrewsSaved: (crews: CrewSaved[]) => void;
  settings: SettingsSaved;
  setSettings: (settings: SettingsSaved) => void;
}>({
  mode: 'racer',
  setMode: () => {},
  racersSaved: [],
  setRacersSaved: () => {},
  crewsSaved: [],
  setCrewsSaved: () => {},
  settings: {},
  setSettings: () => {},
});
