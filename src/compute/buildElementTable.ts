import { getCrewsBlank, getRacersBlank } from '../data/collections';
import type { CrewBlank, CrewComputed, CrewSaved, ICrew, IRacer, RacerBlank, RacerComputed, RacerSaved } from '../types/types';
import {
  calculateCoinsNeeded,
  calculateCoinsNeededToNextStar,
  calculateCoinsToGet,
  calculateCosmeticToGet,
  calculateCrewShardsNeeded,
  calculateRacerShardsNeeded,
  calculateRacerShardsNeededToMax,
  calculateRacerShardsToGet,
  calculateRacerSuperChargeTokenSNeeded,
  calculateTokensToGet,
} from './calculs';

const crewsBlank = getCrewsBlank();
const racersBlank = getRacersBlank();

function isRacerElement(e: RacerSaved | CrewSaved): e is RacerSaved & RacerComputed & RacerBlank {
  return 'currentMPL' in e;
}
function isCrewElement(e: RacerSaved | CrewSaved): e is CrewSaved & CrewComputed & CrewBlank {
  return !('currentMPL' in e);
}

export function buildIElements(elements: RacerSaved[]): IRacer[];
export function buildIElements(elements: CrewSaved[]): ICrew[];
export function buildIElements(elements: RacerSaved[] | CrewSaved[]): IRacer[] | ICrew[] {
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
      const shardsToGetInMPL = calculateRacerShardsToGet(elementFused);
      const shardsNeededToMax = calculateRacerShardsNeeded(elementFused);

      elementComputed = {
        tuneCoinsNeededToMax: calculateCoinsNeeded(elementFused),
        shardsNeededToMax,
        shardsToGetInMPL,
        superChargeTokensNeeded: elementFused.superCharge ? calculateRacerSuperChargeTokenSNeeded(elementFused) : 0,
        tuneCoinsNeededToNextStar: calculateCoinsNeededToNextStar(elementFused),
        shardsNeededToNextStar: calculateRacerShardsNeededToMax(elementFused),
        tuneCoinsToGet: calculateCoinsToGet(elementFused),
        tokensToGet: calculateTokensToGet(elementFused),
        vanityCoinsToGet: calculateCosmeticToGet(elementFused),
      };
    } else if (isCrewElement(elementFused))
      elementComputed = {
        shardsNeededToMax: calculateCrewShardsNeeded(elementFused),
      };
    const IElementTable = { ...{ ...elementFused, ...elementComputed } };
    return IElementTable;
  });
}
