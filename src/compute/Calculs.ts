import {
  epicCrewShardCost,
  multiPlayerLeagueShardsReward,
  normalCrewShardCost,
  racerShardsCost,
  superChargeCost,
  tuneCoinsCosts,
} from '../data/costAndRewards';
import type { ICrew, RacerSaved } from '../types/types';

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateCoinsNeeded(racer: RacerSaved): number {
  let totalCoinsNeeded = 0;

  for (let level = racer.currentStarFragment + 1; level <= 30; level++) {
    if (level <= tuneCoinsCosts.length) {
      totalCoinsNeeded += tuneCoinsCosts[level - 1];
    }
  }

  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards nécéssaire pour maxer le racer
function calculateRacerShardsNeeded(racer: RacerSaved): number {
  const startIndex = racer.currentStars * 5 + racer.currentStarFragment;
  const totalShardsNeeded = racerShardsCost.slice(startIndex).reduce((sum, cost) => sum + cost, 0);
  return totalShardsNeeded - racer.currentShards;
}

// calculer le nombre de shards nécéssaire pour maxer le crew
function calculateCrewShardsNeeded(crew: ICrew): number {
  let totalShardsNeeded = 0;
  if (crew.rarity === 'Epic') {
    for (let star = crew.currentStars + 1; star <= 5; star++) {
      if (star <= epicCrewShardCost.length) {
        totalShardsNeeded += epicCrewShardCost[star - 1];
      }
    }
  } else {
    for (let star = crew.currentStars + 1; star <= 5; star++) {
      if (star <= normalCrewShardCost.length) {
        totalShardsNeeded += normalCrewShardCost[star - 1];
      }
    }
  }

  return Math.max(totalShardsNeeded - crew.currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// calculer le nombre de shards à récupérer en MPL
function calculateRacerShardsToGet(racer: RacerSaved): number {
  let totalShardsToGet = 0;

  for (let MPL = racer.highestMPL + 1; MPL <= 40; MPL++) {
    if (MPL <= multiPlayerLeagueShardsReward.length) {
      totalShardsToGet += multiPlayerLeagueShardsReward[MPL - 1];
    }
  }

  return Math.max(totalShardsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards a réupérer pour maxer si le racer est déjà maxé en MPL
function calculateRacerShardsIfMaxMPL(racer: RacerSaved): number {
  const shardsNeededToMax = calculateRacerShardsNeeded(racer);
  const shardsToGet = calculateRacerShardsToGet(racer);
  const shardIfMaxMPR = shardsNeededToMax - shardsToGet;

  return Math.max(shardIfMaxMPR, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

//calculer le nombre de super charge tokens à récupérer pour maxer la super charge
function calculateRacerSuperChargeTokenSNeeded(racer: RacerSaved): number {
  let totalSuperShardsNeeded = 0;

  for (let superCharge = racer.currentSuperChargeLevel + 1; superCharge <= 2; superCharge++) {
    if (superCharge <= superChargeCost.length) {
      totalSuperShardsNeeded += superChargeCost[superCharge - 1];
    }
  }

  return Math.max(totalSuperShardsNeeded - racer.currentSuperChargeTokens, 0);
}

export {
  calculateRacerShardsNeeded,
  calculateCoinsNeeded,
  calculateCrewShardsNeeded,
  calculateRacerShardsToGet,
  calculateRacerShardsIfMaxMPL,
  calculateRacerSuperChargeTokenSNeeded,
};
