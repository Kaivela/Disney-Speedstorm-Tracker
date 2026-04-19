import { getAllRacers } from '../../data/collections';
import type { IRacer } from '../../types/types';
import {
  calculateCoinsNeeded,
  calculateRacerShardsIfMaxMPL,
  calculateRacerShardsNeeded,
  calculateRacerShardsToGet,
  calculateRacerSuperChargeTokenSNeeded,
} from '../../compute/calculs';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const racersBlank = getAllRacers();

function Racer({
  releaseSeason,
  collection,
  rarity,
  name,
  currentStars,
  currentShards,
  universalBox,
  shardsNeededToMax,
  tuneCoinsNeededToMax,
  currentStarFragment,
  currentSuperChargeLevel,
  currentSuperChargeTokens,
  currentMPL,
  highestMPL,
  shardsToGetInMPL,
  role,
  shardsNeededIfMaxMPL,
  superChargeTokensToGet,
}: IRacer) {
  return (
    <tr>
      <td>{releaseSeason}</td>
      <td>
        <img src={`/img/racers/${name}.webp`} />
      </td>
      <td data-trad={collection}>{collection}</td>
      <td data-trad={rarity}>{rarity}</td>
      <td data-trad={role}>{role}</td>
      <td data-trad={name}>{name}</td>
      <td>{currentStars}</td>
      <td>{currentStarFragment}</td>
      <td>{currentSuperChargeLevel}</td>
      <td>{currentShards}</td>
      <td>{currentSuperChargeTokens}</td>
      <td>{currentMPL}</td>
      <td>{highestMPL}</td>
      <td>badge max MPL</td>
      <td>{shardsNeededToMax}</td>
      <td>{shardsToGetInMPL}</td>
      <td>{superChargeTokensToGet}</td>
      <td>{tuneCoinsNeededToMax}</td>
      <td>{universalBox}</td>
      <td>shardsNeeded (next star) calcul</td>
      <td>coinsNeeded (next star) calcul</td>
      <td>{shardsNeededIfMaxMPL}</td>
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

export function RacerTableBody() {
  // on construit un nouveau tableau qui contient les données de racers auquel on ajoute les props du blank
  const { racers } = useContext(AppContext);
  const NEWTABLEAU = racers.map((racer) => {
    const found = racersBlank.find((racerBlank) => racerBlank.name === racer.name);

    return {
      ...found,
      ...racer,
    };
  });
  const racerList = NEWTABLEAU.map((racer, index) => {
    const computed = {
      tuneCoinsNeededToMax: calculateCoinsNeeded(racer),
      shardsNeededToMax: calculateRacerShardsNeeded(racer),
      shardsToGetInMPL: calculateRacerShardsToGet(racer),
      shardsNeededIfMaxMPL: calculateRacerShardsIfMaxMPL(racer),
      superChargeTokensToGet: racer.superCharge ? calculateRacerSuperChargeTokenSNeeded(racer) : 0,
    };
    return <Racer key={index} {...{ ...racer, ...computed }} />;
  });
  return <tbody>{racerList}</tbody>;
}
