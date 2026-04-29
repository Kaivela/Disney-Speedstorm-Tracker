// src/context/DisplayModeContext.tsx
import { createContext } from 'react';
import type { SettingsSaved, Mode, RacerSaved, CrewSaved, RacerFilters, SortRacerColumn, CrewFilters, SortCrewColumn } from '../types/types';

export const filtersDefault = {
  racer: {
    name: '',
    season: -1,
    collection: '',
    rarity: '',
    role: '',
    shardsNeeded: '',
    highestMPL: '',
    currentStars: -1,
    universalBox: '',
    superChargeTokensNeeded: '',
  },
  crew: { name: '', season: -1, collection: '', rarity: '', shardsNeeded: '', currentStars: -1, universalBox: '' },
};

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
    currentStars: true,
    currentShards: true,
    shardsNeededToMax: true,
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
  racerFilters: RacerFilters;
  setRacerFilters: (filters: RacerFilters) => void;
  sortRacerColumn: SortRacerColumn;
  setSortRacerColumn: (sortOptions: SortRacerColumn) => void;
  crewFilters: CrewFilters;
  setCrewFilters: (filters: CrewFilters) => void;
  sortCrewColumn: SortCrewColumn;
  setSortCrewColumn: (sortOptions: SortCrewColumn) => void;
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
  racerFilters: filtersDefault.racer,
  setRacerFilters: () => {},
  sortRacerColumn: { columnName: 'releaseSeason', order: 'default' },
  setSortRacerColumn: () => {},
  crewFilters: filtersDefault.crew,
  setCrewFilters: () => {},
  sortCrewColumn: { columnName: 'releaseSeason', order: 'default' },
  setSortCrewColumn: () => {},
});
