import * as dataFiles from '../data';
import type { Collection, Collections, ICrew, IRacer } from '../types/types';

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
};

export function getAllRacers(): IRacer[] {
  return Object.entries(collections).flatMap(([collectionName, collection]) => {
    return collection.racers.map((racer) => ({ ...racer, collection: collectionName }));
  });
}

export function getAllCrews(): ICrew[] {
  return Object.entries(collections).flatMap(([collectionName, collection]) => {
    return collection.crews.map((crew) => ({ ...crew, collection: collectionName }));
  });
}
