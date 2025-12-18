export type Language = 'fr' | 'en';
export type UniversalBox = boolean | "season";
export type Rarity = "Common" | "Rare" | "Epic";

export interface Pilot {
  name: string;
  franchise: string;
  rarity: Rarity;
  role: string;
  currentStars: number;
  currentShards: number;
  currentSuperShards: number;
  currentLevel: number;
  currentRMJ: number;
  highestRMJ: number;
  universalBox: UniversalBox;
  releaseSeason: string | number;

  // Calculated properties
  shardsNeeded?: number;
  shardsToGet?: number;
  superShardsNeeded?: number;
  coinsNeeded?: number;
  upgradeCoins?: number;
  tokensToGet?: number;
  cosmeticToGet?: number;
  superCharge?: boolean;
}

export interface Crew {
  name: string;
  rarity: Rarity
  currentStars: number;
  currentShards: number;
  franchise: string;
  universalBox?: UniversalBox;

  // Calculated properties
  shardsNeeded?: number;
}

export interface Settings {
  lang?: Language;
  theme?: string;
  goal?: number;
  levelGoal?: number;
  dark?: boolean;
  transparant?: boolean;
}

export interface TranslationData {
  [key: string]: string;
}

export interface TotalStats {
  allCoins: number;
  allShardsNeeded: number;
  seasonShardsNeeded: number;
  midSeasonShardsNeeded: number;
  allCrewShardsNeeded: number;
  crewSeasonShardsNeeded: number;
  crewMidSeasonShardsNeeded: number;
  allSuperShardsNeeded: number;
  allRegularShards: number;
  universalBoxCount: number;
  uniBoxCost: number;
  seasonCoins: number;
  upgradeCoins: number;
  tokensToGet: number;
  cosmeticToGet: number;
  totalCommonShardsNeeded: number;
  totalRareShardsNeeded: number;
  totalEpicShardsNeeded: number;
  totalFreeCrewShardsNeededCalculated: number;
  crewSeasonCoinsNeeded: number;
  crewSeasonNumber: number;
  rmj40Count: number;
  allFreeShards: number;
}
