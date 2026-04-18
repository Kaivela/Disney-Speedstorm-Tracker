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

export interface IRacer {
  //Static properties
  collection: string;
  MPLTuneCoinReward: MPLTuneCoinReward;
  MPLTokenOld: boolean;
  name: string;
  releaseSeason: number;
  rarity: Rarity;
  role: Role;
  superCharge: boolean;
  universalBox: UniversalBox;

  //Modifiable properties
  currentMPL: number;
  currentShards: number;
  currentStarFragment: number;
  currentStars: number;
  currentSuperChargeLevel: number;
  currentSuperChargeTokens: number;
  highestMPL: number;

  // Calculated properties
  shardsNeededToMax?: number | 'Maxed';
  ShardsNeededIfMaxMPL?: number;
  shardsToGetInMPL?: number;
  tuneCoinsNeededToMax?: number;
  tuneCoinsToGet?: number;
  superShardsNeeded?: number;
  tokensToGet?: number;
  cosmeticToGet?: number;
  superChargeTokensToGet?: number;
}

export interface ICrew {
  collection: string;
  releaseSeason: number;
  rarity: Rarity;
  name: string;
  currentStars: number;
  currentShards: number;
  universalBox: UniversalBox;

  // Optional property
  exclusiveTo?: string;
  // Calculated properties
  shardsNeededToMax?: number | 'Maxed';
}

export interface ISettings {
  // lang?: Language;
  // theme?: string;
  // goal?: number;
  // levelGoal?: number;
  // dark?: boolean;
  // transparant?: boolean;
}
