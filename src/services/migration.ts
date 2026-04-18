import type { IRacer } from '../types/types';

export function migrateRacersSave(racers: Record<string, unknown>[]): IRacer[] {
  // pour chaque racer
  const racersMigrated = racers.map((racer) => {
    // Migration html/js => react
    // si un racer ne pas contient la props currentStarFragment alors le tableau subit la transo

    // "franchise": 'String' .........==> "collection": 'string'
    // "rarity": 'string' ............==> EMPTY
    // "Role": 'string' ..............==> EMPTY
    // "name": 'string' ..............==> "name": 'string'
    // "currentStars": 'number' ......==> "currentStars": 'number'
    // EMPTY .........................==> "currentStarFragment": 'number'
    // "currentShards": 'number' .....==> "currentShards": 'number'
    // "currentSuperShards": 'number' ==> "currentSuperChargeTokens": 'number'
    // "currentLevel": 'number' ......==> EMPTY
    // "currentRMJ": 'number' ........==> "currentMPL": 'number'
    // "highestRMJ": 'number' ........==> "highestMPL": 'number'
    // "universalBox": boolean .......==> EMPTY
    // "releaseSeason": 'number' .....==> EMPTY

    if (!racer.currentStarFragment) {
      racer.collection = racer.franchise;
      delete racer.franchise;
      delete racer.rarity;
      delete racer.role;
      racer.currentStarFragment = 0;
      racer.currentSuperChargeTokens = racer.currentSuperShards;
      delete racer.currentSuperShards;
      delete racer.currentLevel;
      racer.currentMPL = racer.currentRMJ;
      delete racer.currentRMJ;
      racer.highestMPL = racer.highestRMJ;
      delete racer.highestRMJ;
      delete racer.universalBox;
      delete racer.releaseSeason;
    }

    return racer;
  });

  return racersMigrated as unknown as IRacer[];
}
