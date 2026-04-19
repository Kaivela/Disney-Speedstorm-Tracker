import { getAllRacers } from '../data/collections';
import type { IRacer } from '../types/types';

export function sortRacers(racers: IRacer[]): IRacer[] {
  return getAllRacers().map((racerBlank) => {
    const racer = racers.find((racer) => racer.name === racerBlank.name);
    if (!racer) {
      return {} as IRacer;
    }
    return racer;
  });
}
