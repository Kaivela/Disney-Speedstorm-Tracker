import MickeyAndFriends from '../data/MickeyAndFriends.json';
import Mulan from '../data/Mulan.json';
import PiratesOfTheCaribbean from '../data/PiratesOfTheCaribbean.json';

const collections = { MickeyAndFriends, Mulan, PiratesOfTheCaribbean };

export function getAllRacers() {
  return Object.entries(collections).flatMap(([collectionName, collection]) => {
    return collection.racers.map((racer) => ({ ...racer, collection: collectionName }));
  });
}

export function getAllCrews() {
  return Object.entries(collections).flatMap(([collectionName, collection]) => {
    return collection.crews.map((crew) => ({ ...crew, collection: collectionName }));
  });
}
