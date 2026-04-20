import { describe, test, expect } from 'vitest';
// import { calculateRacerShardsNeeded } from '../compute/Calculs';
import type { RacerSaved } from '../types/types';
import { calculateRacerShardsNeeded } from '../compute/calculs';

describe('calculateRacerShardsNeeded', () => {
  test('should calculate the correct number of shards needed for a racer', () => {
    const racer: Partial<RacerSaved> = {
      currentStars: 3,
      currentShards: 10,
      currentStarFragment: 4,
    };

    // on calcule un startIndex à partir currentStars*5 + currentStarFragment
    // startIndex = 3*5 + 4 = 19
    // on calcul la somme des valeurs de racerShardsCost à partir de startIndex jusqu'à la fin de la liste
    // [5, 5, 5, 5, 8, 6, 6, 6, 6, 10, 7, 7, 7, 7, 12, 8, 8, 8, 8, 14, 9, 9, 9, 9, 16, 10, 10, 10, 10, 20];
    //                                                             ^(19)
    // => 14+9+9+9+9+16+10+10+10+10+20 = 126
    // on soustrait le currentShards de la somme pour obtenir le nombre de shards nécessaires
    // 126 - 10 = 116

    expect(calculateRacerShardsNeeded(racer as RacerSaved)).toBe(116);

    const racer1: Partial<RacerSaved> = {
      currentStars: 6,
      currentShards: 0,
      currentStarFragment: 0,
    };
    expect(calculateRacerShardsNeeded(racer1 as RacerSaved)).toBe(0);

    const racer2: Partial<RacerSaved> = {
      currentStars: 0,
      currentShards: 0,
      currentStarFragment: 0,
    };
    expect(calculateRacerShardsNeeded(racer2 as RacerSaved)).toBe(260);

    const racer3: Partial<RacerSaved> = {
      currentStars: 5,
      currentShards: 60,
      currentStarFragment: 0,
    };
    expect(calculateRacerShardsNeeded(racer3 as RacerSaved)).toBe(0);

    const racer4: Partial<RacerSaved> = {
      currentStars: 5,
      currentShards: 2,
      currentStarFragment: 3,
    };
    expect(calculateRacerShardsNeeded(racer4 as RacerSaved)).toBe(28);
  });
});
