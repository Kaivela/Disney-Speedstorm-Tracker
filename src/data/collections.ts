import MickeyAndFriends from '../data/MickeyAndFriends.json';
import Mulan from '../data/Mulan.json';
import PiratesOfTheCaribbean from '../data/PiratesOfTheCaribbean.json';
import Hercules from '../data/Hercules.json';
import BeautyAndTheBeast from '../data/BeautyAndTheBeast.json';
import TheJungleBook from '../data/TheJungleBook.json';
import MonsterInc from '../data/MonsterInc.json';
import WaltDisneyWorld from '../data/WaltDisneyWorld.json';
import ToyStory from '../data/ToyStory.json';
import LiloStitch from '../data/LiloStitch.json';
import Aladdin from '../data/Aladdin.json';
import type { Collection, Collections, ICrew, IRacer } from '../types/types';

const collections: Collections = {
  MickeyAndFriends: MickeyAndFriends as Collection,
  Mulan: Mulan as Collection,
  PiratesOfTheCaribbean: PiratesOfTheCaribbean as Collection,
  Hercules: Hercules as Collection,
  BeautyAndTheBeast: BeautyAndTheBeast as Collection,
  TheJungleBook: TheJungleBook as Collection,
  MonsterInc: MonsterInc as Collection,
  WaltDisneyWorld: WaltDisneyWorld as Collection,
  ToyStory: ToyStory as Collection,
  LiloStitch: LiloStitch as Collection,
  Aladdin: Aladdin as Collection,
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
