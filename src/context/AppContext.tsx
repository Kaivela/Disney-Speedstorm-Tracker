// src/context/DisplayModeContext.tsx
import { createContext } from 'react';
import type { ISettings, Mode, RacerSaved, CrewSaved } from '../types/types';

export const AppContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
  racersSaved: RacerSaved[];
  setRacersSaved: (racers: RacerSaved[]) => void;
  crewsSaved: CrewSaved[];
  setCrewsSaved: (crews: CrewSaved[]) => void;
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
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
