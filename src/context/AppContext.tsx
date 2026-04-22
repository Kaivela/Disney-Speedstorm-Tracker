// src/context/DisplayModeContext.tsx
import { createContext } from 'react';
import type { ISettings, Mode, RacerSaved, CrewSaved } from '../types/types';

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
