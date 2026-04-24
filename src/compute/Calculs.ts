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

function sum(element: number[]) {
  return element.reduce((sum, cost) => sum + cost, 0);
}

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateCoinsNeeded(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const totalCoinsNeeded = sum(tuneCoinsCosts.slice(startIndex));
  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateCoinsNeededToNextStar(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const endIndex = 5 - (startIndex % 5) + startIndex;
  const totalCoinsNeeded = sum(tuneCoinsCosts.slice(startIndex, endIndex));
  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards nécéssaire pour maxer le racer
function calculateRacerShardsNeeded(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const totalShardsNeeded = sum(racerShardsCost.slice(startIndex));
  return Math.max(totalShardsNeeded - racer.currentShards, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateRacerShardsNeededToMax(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const endIndex = 5 - (startIndex % 5) + startIndex;
  const totalShardsNeeded = sum(racerShardsCost.slice(startIndex, endIndex));
  return Math.max(totalShardsNeeded - racer.currentShards, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards à récupérer en MPL
function calculateTokensToGet(racer: IRacer): number {
  const startIndex = racer.highestMPL;
  let table: number[] = [];
  if (racer.MPLTokenOld) table = MPLOldTokensReward;
  else table = MPLNewTokensReward;
  const totalTokensToGet = sum(table.slice(startIndex));
  return Math.max(totalTokensToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards a réupérer pour maxer si le racer est déjà maxé en MPL
function calculateRacerShardsIfMaxMPL(racer: IRacer): number {
  const shardsNeededToMax = calculateRacerShardsNeeded(racer);
  const shardsToGet = calculateRacerShardsToGet(racer);
  return Math.max(shardsNeededToMax - shardsToGet, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

//calculer le nombre de super charge tokens à récupérer pour maxer la super charge
function calculateRacerSuperChargeTokenSNeeded(racer: IRacer): number {
  const startIndex = racer.currentSuperChargeLevel;
  const totalSuperShardsNeeded = sum(superChargeCost.slice(startIndex));
  return Math.max(totalSuperShardsNeeded - racer.currentSuperChargeTokens, 0);
}

// calculer le nombre de shards nécéssaire pour maxer le crew
function calculateCrewShardsNeeded(crew: ICrew): number {
  const startIndex = crew.currentStars;
  let table: number[] = [];
  if (crew.rarity === 'Epic') table = epicCrewShardCost;
  else table = normalCrewShardCost;
  const totalShardsNeeded = sum(table.slice(startIndex));
  return Math.max(totalShardsNeeded - crew.currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// function pour calculer les CoinsToGet en fonction du HighestRMJ
function calculateCoinsToGet(racer: IRacer): number {
  const startIndex = racer.highestMPL;
  let table: number[] = [];
  if (racer.MPLTuneCoinReward === 'S0To4') table = MPLS0To4CoinsReward;
  else if (racer.MPLTuneCoinReward === 'S5To9') table = MPLS5To9CoinsReward;
  else if (racer.MPLTuneCoinReward === 'S10To14Mid') table = MPLS10To14MidCoinsReward;
  else if (racer.MPLTuneCoinReward === 'S10ToLatest') table = MPLS10ToLatestCoinsReward;
  const totalCoinsToGet = sum(table.slice(startIndex));
  return Math.max(totalCoinsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les coins nécessaires en fonction du HighestRMJ
function calculateRacerShardsToGet(racer: IRacer): number {
  const startIndex = racer.highestMPL;
  let table: number[] = [];
  if (racer.MPLOldShardsReward) table = MPLOldShardsReward;
  else table = MPLNewShardsReward;
  const totalShardsToGet = sum(table.slice(startIndex));
  return Math.max(totalShardsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les cosmeticToGet en fonction du HighestRMJ
function calculateCosmeticToGet(racer: IRacer): number {
  const startIndex = racer.highestMPL;
  const cosmecticToGet = sum(MPLCosmeticReward.slice(startIndex));
  return Math.max(cosmecticToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

function calculateSeasonCoinsToGet(racer: IRacer): number {
  const shardsToGetInMPL = calculateRacerShardsToGet(racer);
  let conversion = 0;
  if (racer.rarity === 'Common') conversion = 400;
  if (racer.rarity === 'Rare') conversion = 500;
  if (racer.rarity === 'Epic') conversion = 1000;
  const seasonCoinsToGet = shardsToGetInMPL * conversion;
  return Math.max(seasonCoinsToGet, 0);
}

export {
  calculateRacerShardsNeeded,
  calculateCoinsNeeded,
  calculateCrewShardsNeeded,
  calculateRacerShardsToGet,
  calculateRacerShardsIfMaxMPL,
  calculateRacerSuperChargeTokenSNeeded,
  calculateCoinsNeededToNextStar,
  calculateRacerShardsNeededToMax,
  calculateSeasonCoinsToGet,
  calculateCoinsToGet,
  calculateTokensToGet,
  calculateCosmeticToGet,
};
