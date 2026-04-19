import { getAllRacers } from '../data/collections';
import type { RacerSaved } from '../types/types';

export function sortRacers(racers: RacerSaved[]): RacerSaved[] {
  return getAllRacers().map((racerBlank) => {
    const racer = racers.find((racer) => racer.name === racerBlank.name);
    if (!racer) {
      return {} as RacerSaved;
    }
    return racer;
  });
}
