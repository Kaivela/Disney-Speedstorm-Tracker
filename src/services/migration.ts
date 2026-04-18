import type { ICrew, IRacer } from '../types/types';

export function migrateRacersSave(racers: Record<string, unknown>[]): IRacer[] {
  // pour chaque racer
  return racers.map((racerOriginal) => {
    const racer = structuredClone(racerOriginal);
    // si un racer ne contient pas la props currentStarFragment alors le tableau subit la transformation

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
    // "superCharge": Boolean ........==> EMPTY

    // Migration html/js => react
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
      delete racer.superCharge;
    }

    // change GoGoTomage's Name
    if (racer.name === 'Go Go Tamago') {
      racer.name = 'Go Go Tomago';
    }

    // New Migration
    // if (condition qui n'existe que dans l'ancienne save) {
    //   je récupère l'ancienne valeur
    //   j'écris la nouvelle
    //   j'efface l'ancienne
    // }

    return racer;
  }) as unknown as IRacer[];
}

export function migrateCrewsSave(crews: Record<string, unknown>[]): ICrew[] {
  // pour chaque crew
  return crews.map((crewOriginal) => {
    const crew = structuredClone(crewOriginal);
    // Migration html/js => react
    // si un crew contient la props rarity alors le tableau subit la transformation

    // "franchise": 'string' ................==> "collection": 'string'
    // "rarity": "Common" ...................==> EMPTY
    // "name": 'string' .....................==> "name": 'string'
    // "currentStars": 'number' .............==> "currentStars": 'number'
    // "currentShards": 'number' ............==> "currentShards": 'number'
    // "universalBox": Boolean ..............==> EMPTY
    // "shardsNeeded": 'number' .............==> EMPTY

    if (crew.rarity) {
      crew.collection = crew.franchise;
      delete crew.franchise;
      delete crew.rarity;
      delete crew.universalBox;
      delete crew.shardsNeeded;
    }

    return crew;
  }) as unknown as ICrew[];
}

export function migrateLocalStorage() {
  // rename key pilots into key racers
  const pilots = localStorage.getItem('pilots');
  if (pilots) {
    localStorage.setItem('racers', pilots);
    localStorage.removeItem('pilots');
  }
  // New migration
  // const oldKey = localStorage.getItem('oldKey');
  // if (oldKey) {
  //   localStorage.setItem('newKey', oldKey);
  //   localStorage.removeItem('oldKey');
  // }
}
