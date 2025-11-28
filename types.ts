export type Language = 'fr' | 'en';

export interface Pilot {
  name: string;
  franchise: string;
  rarity: string;
  role: string;
  currentStars: number;
  currentShards: number;
  currentSuperShards: number;
  currentLevel: number;
  currentRMJ: number;
  highestRMJ: number;
  universalBox: boolean | "season";
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
  rarity: "Common" | "Rare" | "Epic";
  currentStars: number;
  currentShards: number;
  franchise: string;
  universalBox?: boolean | "season";

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
