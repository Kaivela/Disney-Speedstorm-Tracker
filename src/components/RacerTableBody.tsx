import { getAllRacers } from '../data/collections';
import type { IRacer, RacerComputed } from '../types/types';
import {
  calculateCoinsNeeded,
  calculateRacerShardsIfMaxMPL,
  calculateRacerShardsNeeded,
  calculateRacerShardsToGet,
  calculateRacerSuperChargeTokenSNeeded,
} from '../compute/calculs';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const racersBlank = getAllRacers();

function Racer(racer: IRacer) {
  return (
    <tr>
      <td>{racer.releaseSeason}</td>
      <td>
        <img src={`/img/racers/${racer.name}.webp`} />
      </td>
      <td data-trad={racer.collection}>{racer.collection}</td>
      <td data-trad={racer.rarity}>{racer.rarity}</td>
      <td data-trad={racer.role}>{racer.role}</td>
      <td data-trad={racer.name}>{racer.name}</td>
      <td>{racer.currentStars}</td>
      <td>{racer.currentStars === 6 ? 'maxed' : racer.currentStarFragment}</td>
      <td>{racer.superCharge ? racer.currentSuperChargeLevel : '✘'}</td>
      <td>{racer.currentStars === 6 ? 'maxed' : racer.currentShards}</td>
      <td>{racer.currentSuperChargeLevel === 2 ? 'maxed' : racer.currentSuperChargeTokens}</td>
      <td>{racer.currentMPL}</td>
      <td>{racer.highestMPL}</td>
      <td>badge max MPL</td>
      <td>{racer.currentStars === 6 ? 'Maxed' : racer.shardsNeededToMax}</td>
      <td>{racer.shardsToGetInMPL === 0 ? 'None' : racer.shardsToGetInMPL}</td>
      <td>{racer.currentSuperChargeLevel === 2 ? 'Maxed' : racer.superChargeTokensNeeded}</td>
      <td>{racer.currentStars === 6 ? 'Maxed' : racer.tuneCoinsNeededToMax}</td>
      <td>{racer.universalBox}</td>
      <td>shardsNeeded (next star) calcul</td>
      <td>coinsNeeded (next star) calcul</td>
      <td>{racer.currentStars === 6 ? 'Maxed' : racer.shardsNeededIfMaxMPL}</td>
      <td>
        <button data-trad="modify" data-index="${index}">
          Modify
        </button>
        <button data-trad="calculate" data-index="${index}">
          Calculate
        </button>
      </td>
    </tr>
  );
}

function RacerList() {
  // LOGIC
  const { racers } = useContext(AppContext);
  const racersSaved = racers.map((racerSaved) => {
    const racerBlank = racersBlank.find((racerBlank) => racerBlank.name === racerSaved.name);
    // to prevent racerBlank from being undefined
    if (!racerBlank) throw new Error(`No racer blank found for name: ${racerSaved.name}`);
    return {
      ...racerBlank,
      ...racerSaved,
    };
  });
  // TEMPLATE
  return racersSaved.map((racerBlankWithSavedData, index) => {
    const racerComputed: RacerComputed = {
      tuneCoinsNeededToMax: calculateCoinsNeeded(racerBlankWithSavedData),
      shardsNeededToMax: calculateRacerShardsNeeded(racerBlankWithSavedData),
      shardsToGetInMPL: calculateRacerShardsToGet(racerBlankWithSavedData),
      shardsNeededIfMaxMPL: calculateRacerShardsIfMaxMPL(racerBlankWithSavedData),
      superChargeTokensNeeded: racerBlankWithSavedData.superCharge ? calculateRacerSuperChargeTokenSNeeded(racerBlankWithSavedData) : 0,
    };
    return <Racer key={index} {...{ ...racerBlankWithSavedData, ...racerComputed }} />;
  });
}

export function RacerTableBody() {
  // TEMPLATE
  return (
    <tbody>
      <RacerList />
    </tbody>
  );
}
