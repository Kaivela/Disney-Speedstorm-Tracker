export type Language = 'fr' | 'en';
export type UniversalBox = '✔' | '✘' | '🟣';
export type Rarity = 'Common' | 'Rare' | 'Epic';
export type Role = 'Speedster' | 'Trickster' | 'Brawler' | 'Defender';
export type MPLTuneCoinReward = 'Mickey' | 'S0To4' | 'S5To9' | 'S10To14Mid' | 'S10ToLatest';

export type Mode = 'racer' | 'crew';
export type Collections = Record<string, Collection>;

export interface Collection {
  racers: IRacer[];
  crews: ICrew[];
}

export interface RacerComputed {
  // Calculated properties
  tuneCoinsNeededToMax?: number;
  tuneCoinsNeededToNextStar?: number;
  shardsNeededToMax?: number;
  shardsNeededToNextStar?: number;
  shardsToGetInMPL?: number;
  shardsNeededIfMaxMPL?: number;
  superChargeTokensNeeded?: number;
  // tuneCoinsToGet?: number;
  // superShardsNeeded?: number;
  // tokensToGet?: number;
  // cosmeticToGet?: number;
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
  shardsNeededToMax?: number;
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

export interface ISettings {
  // lang?: Language;
  // theme?: string;
  // goal?: number;
  // levelGoal?: number;
  // dark?: boolean;
  // transparant?: boolean;
}
