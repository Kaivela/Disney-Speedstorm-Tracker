import {
  MPLNewShardsReward,
  MPLOldShardsReward,
  epicCrewShardCost,
  normalCrewShardCost,
  racerShardsCost,
  superChargeCost,
  tuneCoinsCosts,
} from '../data/costAndRewards';
import type { ICrew, IRacer } from '../types/types';

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateCoinsNeeded(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const totalCoinsNeeded = tuneCoinsCosts.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateCoinsNeededToNextStar(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const endIndex = 5 - (startIndex % 5) + startIndex;

  const totalCoinsNeeded = tuneCoinsCosts.slice(startIndex, endIndex).reduce((sum, cost) => sum + cost, 0);
  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards nécéssaire pour maxer le racer
function calculateRacerShardsNeeded(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const totalShardsNeeded = racerShardsCost.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  return Math.max(totalShardsNeeded - racer.currentShards, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateRacerShardsNeededToMax(racer: IRacer): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const endIndex = 5 - (startIndex % 5) + startIndex;

  const totalShardsNeeded = racerShardsCost.slice(startIndex, endIndex).reduce((sum, cost) => sum + cost, 0);
  return Math.max(totalShardsNeeded - racer.currentShards, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards à récupérer en MPL
function calculateRacerShardsToGet(racer: IRacer): number {
  const startIndex = racer.highestMPL;
  let totalShardsToGet = 0;
  if (racer.MPLOldShardsReward === false) {
    totalShardsToGet = MPLNewShardsReward.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  } else {
    totalShardsToGet = MPLOldShardsReward.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  }
  return Math.max(totalShardsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
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
  const totalSuperShardsNeeded = superChargeCost.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  return Math.max(totalSuperShardsNeeded - racer.currentSuperChargeTokens, 0);
}

// calculer le nombre de shards nécéssaire pour maxer le crew
function calculateCrewShardsNeeded(crew: ICrew): number {
  const startIndex = crew.currentStars;
  let totalShardsNeeded = 0;
  if (crew.rarity === 'Epic') {
    totalShardsNeeded = epicCrewShardCost.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  } else {
    totalShardsNeeded = normalCrewShardCost.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  }
  return Math.max(totalShardsNeeded - crew.currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
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
};
