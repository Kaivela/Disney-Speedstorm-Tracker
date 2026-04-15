export type Language = 'fr' | 'en';
export type UniversalBox = '✔' | '✘' | '🟣';
export type Rarity = 'Common' | 'Rare' | 'Epic';
export type Role = 'Speedster' | 'Trickster' | 'Brawler' | 'Defender';
export type MPLCoin = 'old' | 'new' | 'S10' | 'S10Mid';

export type Collections = Record<string, Collection>;

export interface Collection {
  racers: IRacer[];
  crews: ICrew[];
}

export interface IRacer {
  MPLCoin: MPLCoin;
  MPLTokenOld: string;
  currentMPL: number;
  currentShards: number;
  currentStarFragment: number;
  currentStars: number;
  currentSuperChargeLevel: number;
  currentSuperChargeShards: number;
  highestMPL: number;
  name: string;
  rarity: Rarity;
  releaseSeason: number;
  role: Role;
  superCharge: boolean;
  universalBox: UniversalBox;

  // Calculated properties
  collection?: string;
  shardsNeededToMax?: number | 'Maxed';
  shardsToGetInMPL?: number;
  tuneCoinsNeededToMax?: number;
  tuneCoinsToGet?: number;
  superShardsNeeded?: number;
  tokensToGet?: number;
  cosmeticToGet?: number;
}

export interface ICrew {
  collection: string;
  currentShards: number;
  currentStars: number;
  name: string;
  rarity: Rarity;
  universalBox: UniversalBox;

  // Calculated properties
  exclusiveTo?: string;
  shardsNeededToMax?: number | 'Maxed';
}
