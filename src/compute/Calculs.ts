import { epicCrewShardCost, multiPlayerLeagueShardsReward, normalCrewShardCost, racerShardsCost, tuneCoinsCosts } from '../data/costAndRewards';
import type { ICrew, IRacer } from '../types/types';

// calculer le nombre de tunes coins nécéssaire pour maxer le racer
function calculateCoinsNeeded(racer: IRacer): number {
  let totalCoinsNeeded = 0;

  for (let level = racer.currentStarFragment + 1; level <= 31; level++) {
    if (level <= tuneCoinsCosts.length) {
      totalCoinsNeeded += tuneCoinsCosts[level - 1];
    }
  }

  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// calculer le nombre de shards nécéssaire pour maxer le racer
function calculateRacerShardsNeeded(racer: IRacer): number {
  let totalShardsNeeded = 0;

  for (let level = racer.currentStarFragment + 1; level <= 31; level++) {
    if (level <= racerShardsCost.length) {
      totalShardsNeeded += racerShardsCost[level - 1];
    }
  }

  return Math.max(totalShardsNeeded - racer.currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
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
function calculateRacerShardsToGet(racer: IRacer): number {
  let totalShardsToGet = 0;

  for (let rmj = racer.highestMPL + 1; rmj <= 40; rmj++) {
    if (rmj <= multiPlayerLeagueShardsReward.length) {
      totalShardsToGet += multiPlayerLeagueShardsReward[rmj - 1];
    }
  }

  return Math.max(totalShardsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

export { calculateRacerShardsNeeded, calculateCoinsNeeded, calculateCrewShardsNeeded, calculateRacerShardsToGet };
