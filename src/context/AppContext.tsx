// src/context/DisplayModeContext.tsx
import { createContext } from 'react';
import type { SettingsSaved, Mode, RacerSaved, CrewSaved, Filters, SortColumn } from '../types/types';

export const settingsDefaults: SettingsSaved = {
  lang: 'en',
  dark: false,
  transparent: false,
  MPLGoal: 40,
  starGoal: 6,
  superChargeLevelGoal: 2,
  theme: '1',
  showRacerColumn: {
    releaseSeason: false,
    image: true,
    collection: true,
    rarity: true,
    role: true,
    name: true,
    currentStars: true,
    currentStarFragment: true,
    currentSuperChargeLevel: true,
    currentShards: true,
    currentSuperChargeTokens: true,
    currentMPL: true,
    highestMPL: true,
    maxMPL: true,
    shardsNeededToMax: true,
    shardsToGetInMPL: true,
    superChargeTokensNeeded: true,
    tuneCoinsNeededToMax: true,
    free: true,
    shardsNeededToNextStar: false,
    tuneCoinsNeededToNextStar: false,
    shardsNeededIfMaxMPL: false,
  },
  showCrewColumn: {
    releaseSeason: false,
    exclusive: false,
    image: true,
    collection: true,
    rarity: true,
    name: true,
    level: true,
    currentShards: true,
    shardsNeeded: true,
    free: true,
  },
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
  filters: Filters;
  setFilters: (filters: Filters) => void;
  sortColumn: SortColumn;
  setSortColumn: (sortOptions: SortColumn) => void;
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
  filters: { name: '', season: -1, collection: '', shards: '' },
  setFilters: () => {},
  sortColumn: { columnName: 'releaseSeason', order: 'default' },
  setSortColumn: () => {},
});
