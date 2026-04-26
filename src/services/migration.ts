import { sortCrews, sortRacers } from '../compute/sort';
import { getCrewsBlank, getRacersBlank } from '../data/collections';
import type { CrewSaved, ICrew, SettingsSaved, RacerSaved } from '../types/types';
import { StorageService } from './storage';

const nameMap = {
  'Mickey & Friends': 'MickeyAndFriends',
  'Pirates of the Caribbean': 'PiratesOfTheCaribbean',
  'Beauty and the Beast': 'BeautyAndTheBeast',
  'The Jungle Book': 'TheJungleBook',
  'Monsters inc.': 'MonsterInc',
  'Walt Disney World': 'WaltDisneyWorld',
  'Toy Story': 'ToyStory',
  'Lilo & Stitch': 'LiloStitch',
  'Oswald the Lucky Rabbit': 'OswaldTheLuckyRabbit',
  'WALL-E': 'WallE',
  'The Little Mermaid': 'TheLittleMermaid',
  'Wreck-it-Ralph': 'WreckItRalph',
  'The Nightmare Before Christmas': 'TheNightmareBeforeChristmas',
  'The Muppets': 'TheMuppets',
  'Inside Out': 'InsideOut',
  'Sleeping Beauty': 'SleepingBeauty',
  '101 Dalmatians': 'Dalmatians',
  Rapunzel: 'Tangled',
  'The Incredibles': 'TheIncredibles',
  'Snow White and the Seven Dwarfs': 'SnowWhiteAndTheSevenDwarfs',
  'Big Hero 6': 'BigHero6',
  'Rescue Rangers': 'RescueRangers',
  'Alice In Wonderland': 'AliceInWonderland',
  'Winnie The Pooh': 'WinnieThePooh',
  "The Emperor's New Groove": 'TheEmperorNewGroove',
};

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/ /g, '')
    .replaceAll(/[^a-z0-9]/g, '')
    .trim();
}

export function migrateRacersSave(racers: Record<string, unknown>[]): RacerSaved[] {
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
    // EMPTY .........................==> "currentSuperChargeLevel": 'number'
    // "currentSuperShards": 'number' ==> "currentSuperChargeTokens": 'number'
    // "currentLevel": 'number' ......==> EMPTY
    // "currentRMJ": 'number' ........==> "currentMPL": 'number'
    // "highestRMJ": 'number' ........==> "highestMPL": 'number'
    // "universalBox": boolean .......==> EMPTY
    // "releaseSeason": 'number' .....==> EMPTY
    // "superCharge": Boolean ........==> EMPTY

    // Migration html/js => react
    if (racer.franchise) {
      racer.collection = racer.franchise;
      delete racer.franchise;
      delete racer.rarity;
      delete racer.role;
      racer.currentStarFragment = 0;
      racer.currentSuperChargeLevel = 0;
      racer.currentSuperChargeTokens = racer.currentSuperShards;
      delete racer.currentSuperShards;
      racer.currentMPL = racer.currentRMJ;
      delete racer.currentRMJ;
      racer.highestMPL = racer.highestRMJ;
      delete racer.highestRMJ;
      delete racer.universalBox;
      delete racer.releaseSeason;
      delete racer.superCharge;

      // Régler les currentStars si plus grand que 5
      if ((racer.currentStars as number) > 5) {
        racer.currentSuperChargeLevel = (racer.currentStars as number) - 5;
        racer.currentStars = 5;
      }

      // faire migration de la S19
      const currentLevel = racer.currentLevel as number;
      const currentLevelFloored = Math.floor((currentLevel - 1) / 10) as number;
      racer.currentStars = currentLevelFloored + 1;
      delete racer.currentLevel;

      // Fix Go Go Tomago Name
      if (racer.name === 'Go Go Tamago') {
        racer.name = 'Go Go Tomago';
      }
      // Fix Minnie Mouse Name
      if (racer.name === 'Minnie') {
        racer.name = 'Minnie Mouse';
      }
      // Fix Scrooge McDuck Name
      if (racer.name === 'Scrooge Mcduck') {
        racer.name = 'Scrooge McDuck';
      }

      // Normalize racer.collection Names
      for (const oldName in nameMap) {
        const newName = nameMap[oldName as keyof typeof nameMap];
        if (normalizeName(racer.collection as string) === normalizeName(oldName)) {
          racer.collection = newName;
        }
      }
      console.log('Racers Saved Migration : OK');
    }

    // New Migration
    // if (condition qui n'existe que dans l'ancienne save) {
    //   je récupère l'ancienne valeur
    //   j'écris la nouvelle
    //   j'efface l'ancienne
    // }

    return racer;
  }) as unknown as RacerSaved[];
}

export function migrateCrewsSave(crews: Record<string, unknown>[]): CrewSaved[] {
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

    if (crew.franchise) {
      crew.collection = crew.franchise;
      delete crew.franchise;
      delete crew.rarity;
      delete crew.universalBox;
      delete crew.shardsNeeded;

      // Normalize crew.collection names
      for (const oldName in nameMap) {
        const newName = nameMap[oldName as keyof typeof nameMap];
        if (normalizeName(crew.collection as string) === normalizeName(oldName)) {
          crew.collection = newName;
        }
      }
      console.log('Crews Saved Migration : OK');
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

export function updateCollections() {
  const storage = StorageService.getInstance();
  const racerSaved = storage.getRacers();
  const racersBlank = getRacersBlank();
  const crewSaved = storage.getCrews();
  const crewsBlank = getCrewsBlank();
  // pour chaque element de racerBlank
  racersBlank.forEach((racerBlank) => {
    // on cherche dans le storage si un racer du même nom existe
    const found = racerSaved.find((racer) => racerBlank.name === racer.name);
    // si non on ajoute le racer au storage
    if (!found) {
      // ce racerBlank subit une transfo avant de le push dans le tableau
      const newRacer: RacerSaved = {
        name: racerBlank.name,
        collection: racerBlank.collection,
        currentMPL: 0,
        currentShards: 0,
        currentStarFragment: 0,
        currentStars: 0,
        currentSuperChargeLevel: 0,
        currentSuperChargeTokens: 0,
        highestMPL: 0,
      };
      racerSaved.push(newRacer);
    }
  });
  storage.saveRacers(sortRacers(racerSaved));

  crewsBlank.forEach((crewBlank) => {
    // on cherche dans le storage si un crew du même nom existe
    const found = crewSaved.find((crew) => crewBlank.name === crew.name);
    // si non on ajoute le crew au storage
    if (!found) {
      // ce crewBlank subit une transfo avant de le push dans le tableau
      const newCrew: CrewSaved = {
        name: crewBlank.name,
        collection: crewBlank.collection,
        currentStars: 0,
        currentShards: 0,
      };
      crewSaved.push(newCrew);
    }
  });
  storage.saveCrews(sortCrews(crewSaved));
}

export function migrateSettingsSave(settings: Record<string, unknown>): SettingsSaved {
  const newSetting = structuredClone(settings);
  // "lang": 'fr' | 'en' ...==> "lang": "Lang"
  // "theme": 'string' ......==> "theme: 'string'
  // "goal": 'number' .......==> "MPLGoal": 'number'
  // "levelGoal": 'number' ..==> EMPTY
  // EMPTY ..................==> "starGoal": 'number'
  // "transparant": Boolean .==> "transparant": Boolean
  // EMPTY      .............==> "dark": Boolean
  // EMPTY ..................==> "hideColumn": "string[]""
  if (newSetting.goal) {
    newSetting.MPLGoal = newSetting.goal;
    delete newSetting.goal;
    delete newSetting.levelGoal;
    newSetting.starGoal = 6;
    newSetting.hideColumn = [''];
    newSetting.dark = localStorage.getItem('theme') === 'dark';
    newSetting.hideColumn = [''];
    localStorage.removeItem('theme');

    console.log('Settings Migration : OK');
  }
  return newSetting as unknown as SettingsSaved;
}
