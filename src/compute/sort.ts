import { getAllCrews, getAllRacers } from '../data/collections';
import type { CrewSaved, RacerSaved } from '../types/types';

export function sortRacers(racers: RacerSaved[]): RacerSaved[] {
  return getAllRacers().map((racerBlank) => {
    const racer = racers.find((racer) => racer.name === racerBlank.name);
    if (!racer) {
      return {} as RacerSaved;
    }
    return racer;
  });
}

export function sortCrews(crews: CrewSaved[]): CrewSaved[] {
  return getAllCrews().map((crewBlank) => {
    const crew = crews.find((crew) => crew.name === crewBlank.name);
    if (!crew) {
      return {} as CrewSaved;
    }
    return crew;
  });
}
