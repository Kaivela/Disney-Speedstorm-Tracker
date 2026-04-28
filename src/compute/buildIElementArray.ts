import { getCrewsBlank, getRacersBlank } from '../data/collections';
import type { CrewBlank, CrewComputed, CrewSaved, ICrew, IRacer, RacerBlank, RacerComputed, RacerSaved } from '../types/types';
import {
  calculateCoinsNeeded,
  calculateCrewShardsNeeded,
  calculateRacerShardsNeeded,
  calculateRacerShardsToGet,
  calculateRacerSuperChargeTokenSNeeded,
} from './calculs';

const crewsBlank = getCrewsBlank();
const racersBlank = getRacersBlank();

function isRacerElement(e: RacerSaved | CrewSaved): e is RacerSaved & RacerComputed & RacerBlank {
  return 'currentMPL' in e;
}
function isCrewElement(e: RacerSaved | CrewSaved): e is CrewSaved & CrewComputed & CrewBlank {
  return !('currentMPL' in e);
}

export function buildIElementsArray(elements: RacerSaved[]): IRacer[];
export function buildIElementsArray(elements: CrewSaved[]): ICrew[];
export function buildIElementsArray(elements: RacerSaved[] | CrewSaved[]): IRacer[] | ICrew[] {
  if (!elements || elements.length === 0) return [];
  const isRacer = 'currentMPL' in elements[0];
  const elementsBlank = isRacer ? racersBlank : crewsBlank;
  return elements.map((elementSaved) => {
    const elementBlank = elementsBlank.find((elementBlank) => elementBlank.name === elementSaved.name);
    if (!elementBlank) throw new Error(`No element Blank found for name: ${elementSaved.name}`);
    const elementFused = {
      ...elementBlank,
      ...elementSaved,
    };
    let elementComputed = {} as RacerComputed | CrewComputed;
    if (isRacerElement(elementFused)) {
      const shardsToGetInMPL = calculateRacerShardsToGet(elementFused, 40);
      const shardsNeededToMax = calculateRacerShardsNeeded(elementFused, 6);

      elementComputed = {
        tuneCoinsNeededToMax: calculateCoinsNeeded(elementFused, 6),
        shardsNeededToMax,
        shardsToGetInMPL,
        superChargeTokensNeeded: elementFused.superCharge ? calculateRacerSuperChargeTokenSNeeded(elementFused, 2) : 0,
        tuneCoinsNeededToNextStar: calculateCoinsNeeded(elementFused, elementFused.currentStars + 1),
        shardsNeededToNextStar: calculateRacerShardsNeeded(elementFused, elementFused.currentStars + 1),
        shardsNeededIfMaxMPL: Math.max(shardsNeededToMax - shardsToGetInMPL, 0),
      };
    } else if (isCrewElement(elementFused))
      elementComputed = {
        shardsNeededToMax: calculateCrewShardsNeeded(elementFused),
      };
    const IElementTable = { ...{ ...elementFused, ...elementComputed } };
    return IElementTable;
  });
}
