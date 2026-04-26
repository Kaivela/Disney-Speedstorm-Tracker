import {
  MPLCosmeticReward,
  MPLNewShardsReward,
  MPLNewTokensReward,
  MPLOldShardsReward,
  MPLOldTokensReward,
  MPLS0To4CoinsReward,
  MPLS10To14MidCoinsReward,
  MPLS10ToLatestCoinsReward,
  MPLS5To9CoinsReward,
  epicCrewShardCost,
  normalCrewShardCost,
  racerShardsCost,
  superChargeCost,
  tuneCoinsCosts,
} from '../data/costAndRewards';
import type { ICrew, IRacer } from '../types/types';

export function sum(element: number[]) {
  return element.reduce((sum, cost) => sum + cost, 0);
}

export function formatBigNumber(number: number): string {
  return new Intl.NumberFormat('de-DE').format(number);
  // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
export function calculateCoinsNeeded(racer: IRacer, starGoal: number): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const endIndex = starGoal * 5;
  const totalCoinsNeeded = sum(tuneCoinsCosts.slice(startIndex, endIndex));
  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards nécéssaire pour maxer le racer
export function calculateRacerShardsNeeded(racer: IRacer, starGoal: number): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const endIndex = starGoal * 5;
  const totalShardsNeeded = sum(racerShardsCost.slice(startIndex, endIndex));
  return Math.max(totalShardsNeeded - racer.currentShards, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards à récupérer en MPL
export function calculateTokensToGet(racer: IRacer, MPLGoal: number): number {
  const startIndex = racer.highestMPL;
  const endIndex = MPLGoal;
  let table: number[] = [];
  if (racer.MPLTokenOld) table = MPLOldTokensReward;
  else table = MPLNewTokensReward;
  const totalTokensToGet = sum(table.slice(startIndex, endIndex));
  return Math.max(totalTokensToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

//calculer le nombre de super charge tokens à récupérer pour maxer la super charge
export function calculateRacerSuperChargeTokenSNeeded(racer: IRacer, superChargeLevelGoal: number): number {
  const startIndex = racer.currentSuperChargeLevel;
  const endIndex = superChargeLevelGoal;
  const totalSuperShardsNeeded = sum(superChargeCost.slice(startIndex, endIndex));
  return Math.max(totalSuperShardsNeeded - racer.currentSuperChargeTokens, 0);
}

// calculer le nombre de shards nécéssaire pour maxer le crew
export function calculateCrewShardsNeeded(crew: ICrew): number {
  const startIndex = crew.currentStars;
  let table: number[] = [];
  if (crew.rarity === 'Epic') table = epicCrewShardCost;
  else table = normalCrewShardCost;
  const totalShardsNeeded = sum(table.slice(startIndex));
  return Math.max(totalShardsNeeded - crew.currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// export function pour calculer les CoinsToGet en fonction du HighestMPL
export function calculateCoinsToGet(racer: IRacer, MPLGoal: number): number {
  const startIndex = racer.highestMPL;
  const endIndex = MPLGoal;
  let table: number[] = [];
  if (racer.MPLTuneCoinReward === 'S0To4') table = MPLS0To4CoinsReward;
  else if (racer.MPLTuneCoinReward === 'S5To9') table = MPLS5To9CoinsReward;
  else if (racer.MPLTuneCoinReward === 'S10To14Mid') table = MPLS10To14MidCoinsReward;
  else if (racer.MPLTuneCoinReward === 'S10ToLatest') table = MPLS10ToLatestCoinsReward;
  const totalCoinsToGet = sum(table.slice(startIndex, endIndex));
  return Math.max(totalCoinsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les coins nécessaires en fonction du HighestMPL
export function calculateRacerShardsToGet(racer: IRacer, MPLGoal: number): number {
  const startIndex = racer.highestMPL;
  const endIndex = MPLGoal;
  let table: number[] = [];
  if (racer.MPLOldShardsReward) table = MPLOldShardsReward;
  else table = MPLNewShardsReward;
  const totalShardsToGet = sum(table.slice(startIndex, endIndex));
  return Math.max(totalShardsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les cosmeticToGet en fonction du HighestMPL
export function calculateCosmeticToGet(racer: IRacer, MPLGoal: number): number {
  const startIndex = racer.highestMPL;
  const endIndex = MPLGoal;
  const cosmecticToGet = sum(MPLCosmeticReward.slice(startIndex, endIndex));
  return Math.max(cosmecticToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

export function calculateSeasonCoinsToGet(racer: IRacer, shardsToGetInMPL: number): number {
  if (racer.shardsNeededToMax !== 0) return 0;
  let conversion = 0;
  if (racer.rarity === 'Common') conversion = 400;
  if (racer.rarity === 'Rare') conversion = 500;
  if (racer.rarity === 'Epic') conversion = 1000;
  // const conversion = { Common: 400, Rare: 500, Epic: 1000 }[racer.rarity];
  const seasonCoinsToGet = shardsToGetInMPL * conversion;
  return Math.max(seasonCoinsToGet, 0);
}
