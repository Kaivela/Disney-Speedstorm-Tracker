export type Lang = 'fr' | 'en';
export type UniversalBox = '✔' | '✘' | '🟣';
export type Rarity = 'Common' | 'Rare' | 'Epic';
export type Role = 'Speedster' | 'Trickster' | 'Brawler' | 'Defender';
export type MPLTuneCoinReward = 'Mickey' | 'S0To4' | 'S5To9' | 'S10To14Mid' | 'S10ToLatest';

export type Mode = 'racer' | 'crew';
export type Collections = Record<string, Collection>;

export type RacerFilters = {
  name: string;
  season: number;
  collection: string;
  rarity: string;
  role: string;
  shardsNeeded: string;
  currentStars: number;
  highestMPL: string;
  universalBox: string;
  superChargeTokensNeeded: string;
};
export type CrewFilters = {
  name: string;
  season: number;
  collection: string;
  rarity: string;
  shardsNeeded: string;
  currentStars: number;
  universalBox: string;
};

export type Order = 'desc' | 'asc' | 'default';
export type SortRacerColumn = { columnName: SortableRacerColumns; order: Order };
export type SortCrewColumn = { columnName: SortableCrewColumns; order: Order };

export type SortableRacerColumns = NumberKeys<IRacer>;
export type SortableCrewColumns = NumberKeys<Omit<ICrew, 'exclusiveTo'>>;

type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export interface Collection {
  racers: IRacer[];
  crews: ICrew[];
}

// todo : check si on peut retirer les optional
export interface RacerComputed {
  // Calculated properties
  shardsNeededToMax: number;
  shardsToGetInMPL: number;
  superChargeTokensNeeded: number;
  tuneCoinsNeededToMax: number;
  shardsNeededToNextStar: number;
  tuneCoinsNeededToNextStar: number;
  shardsNeededIfMaxMPL: number;
}

export interface RacerBlank {
  //Static properties
  collection: string;
  MPLTuneCoinReward: MPLTuneCoinReward;
  MPLTokenOld: boolean;
  MPLOldShardsReward: boolean;
  name: string;
  releaseSeason: number;
  rarity: Rarity;
  role: Role;
  superCharge: boolean;
  universalBox: UniversalBox;
}

export interface RacerSaved {
  //Static properties
  collection: string;
  name: string;

  //Modifiable properties
  currentMPL: number;
  currentShards: number;
  currentStarFragment: number;
  currentStars: number;
  currentSuperChargeLevel: number;
  currentSuperChargeTokens: number;
  highestMPL: number;
}

export type IRacer = RacerBlank & RacerSaved & RacerComputed;

export interface CrewComputed {
  // Calculated properties
  shardsNeededToMax: number;
}
export interface CrewBlank {
  //Static properties
  collection: string;
  name: string;
  releaseSeason: number;
  rarity: Rarity;
  universalBox: UniversalBox;

  // Optional property
  exclusiveTo?: string;
}
export interface CrewSaved {
  //Static properties
  collection: string;
  name: string;

  //Modifiable properties
  currentStars: number;
  currentShards: number;
}

export type ICrew = CrewBlank & CrewSaved & CrewComputed;

export interface SettingsSaved {
  lang: Lang;
  theme: string;
  MPLGoal: number;
  starGoal: number;
  superChargeLevelGoal: number;
  dark: boolean;
  transparent: boolean;
  showRacerColumn: {
    releaseSeason: boolean;
    image: boolean;
    collection: boolean;
    rarity: boolean;
    role: boolean;
    name: boolean;
    currentStars: boolean;
    currentStarFragment: boolean;
    currentSuperChargeLevel: boolean;
    currentShards: boolean;
    currentSuperChargeTokens: boolean;
    currentMPL: boolean;
    highestMPL: boolean;
    maxMPL: boolean;
    shardsNeededToMax: boolean;
    shardsToGetInMPL: boolean;
    superChargeTokensNeeded: boolean;
    tuneCoinsNeededToMax: boolean;
    free: boolean;
    shardsNeededToNextStar: boolean;
    tuneCoinsNeededToNextStar: boolean;
    shardsNeededIfMaxMPL: boolean;
  };
  showCrewColumn: {
    releaseSeason: boolean;
    exclusive: boolean;
    image: boolean;
    collection: boolean;
    rarity: boolean;
    name: boolean;
    currentStars: boolean;
    currentShards: boolean;
    shardsNeededToMax: boolean;
    free: boolean;
  };
}
