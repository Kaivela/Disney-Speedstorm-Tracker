import MickeyAndFriends from '../data/MickeyAndFriends.json';
import Mulan from '../data/Mulan.json';
import PiratesOfTheCaribbean from '../data/PiratesOfTheCaribbean.json';
import type { Collection, Collections, ICrew, IRacer } from '../types/types';

const collections: Collections = {
  MickeyAndFriends: MickeyAndFriends as Collection,
  Mulan: Mulan as Collection,
  PiratesOfTheCaribbean: PiratesOfTheCaribbean as Collection,
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
