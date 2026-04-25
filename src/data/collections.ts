import * as dataFiles from './Roaster';
import type { Collection, Collections, CrewBlank, RacerBlank } from '../types/types';

const collections: Collections = {
  MickeyAndFriends: dataFiles.MickeyAndFriends as Collection,
  Mulan: dataFiles.Mulan as Collection,
  PiratesOfTheCaribbean: dataFiles.PiratesOfTheCaribbean as Collection,
  Hercules: dataFiles.Hercules as Collection,
  BeautyAndTheBeast: dataFiles.BeautyAndTheBeast as Collection,
  TheJungleBook: dataFiles.TheJungleBook as Collection,
  MonsterInc: dataFiles.MonsterInc as Collection,
  WaltDisneyWorld: dataFiles.WaltDisneyWorld as Collection,
  ToyStory: dataFiles.ToyStory as Collection,
  LiloStitch: dataFiles.LiloStitch as Collection,
  Aladdin: dataFiles.Aladdin as Collection,
  OswaldTheLuckyRabbit: dataFiles.OswaldTheLuckyRabbit as Collection,
  Frozen: dataFiles.Frozen as Collection,
  WallE: dataFiles.WallE as Collection,
  TheLittleMermaid: dataFiles.TheLittleMermaid as Collection,
  WreckItRalph: dataFiles.WreckItRalph as Collection,
  TheNightmareBeforeChristmas: dataFiles.TheNightmareBeforeChristmas as Collection,
  TheMuppets: dataFiles.TheMuppets as Collection,
  InsideOut: dataFiles.InsideOut as Collection,
  SleepingBeauty: dataFiles.SleepingBeauty as Collection,
  Dalmatians: dataFiles.Dalmatians as Collection,
  Tangled: dataFiles.Tangled as Collection,
  TheIncredibles: dataFiles.TheIncredibles as Collection,
  Moana: dataFiles.Moana as Collection,
  Tron: dataFiles.Tron as Collection,
  SnowWhiteAndTheSevenDwarfs: dataFiles.SnowWhiteAndTheSevenDwarfs as Collection,
  BigHero6: dataFiles.BigHero6 as Collection,
  Cinderella: dataFiles.Cinderella as Collection,
  RescueRangers: dataFiles.RescueRangers as Collection,
  AliceInWonderland: dataFiles.AliceInWonderland as Collection,
  WinnieThePooh: dataFiles.WinnieThePooh as Collection,
  Up: dataFiles.Up as Collection,
  Zootopia: dataFiles.Zootopia as Collection,
  TheEmperorNewGroove: dataFiles.TheEmperorNewGroove as Collection,
  Cars: dataFiles.Cars as Collection,
  Hoppers: dataFiles.Hoppers as Collection,
};

export function getRacersBlank(): RacerBlank[] {
  return Object.entries(collections).flatMap((c) => addCollectionToElementBlank(c, 'racers'));
}

export function getCrewsBlank(): CrewBlank[] {
  return Object.entries(collections).flatMap((c) => addCollectionToElementBlank(c, 'crews'));
}

function addCollectionToElementBlank([collectionName, collection]: [string, Collection], label: 'racers'): RacerBlank[];
function addCollectionToElementBlank([collectionName, collection]: [string, Collection], label: 'crews'): CrewBlank[];
function addCollectionToElementBlank([collectionName, collection]: [string, Collection], label: 'racers' | 'crews'): RacerBlank[] | CrewBlank[] {
  return collection[label].map((element: RacerBlank | CrewBlank) => ({ ...element, collection: collectionName }));
}
