import { getAllRacers } from '../../data/collections';
import type { IRacer } from '../../types/types';
import {
  calculateCoinsNeeded,
  calculateRacerShardsIfMaxMPL,
  calculateRacerShardsNeeded,
  calculateRacerShardsToGet,
  calculateRacerSuperChargeTokenSNeeded,
} from '../../compute/Calculs';

const racers = getAllRacers();
const racerData = buildRacerTableBodyData();
const racerList = racerData.map((racer, index) => {
  return <Racer key={index} {...racer} />;
});

function buildRacerTableBodyData() {
  console.log({ racers });
  return racers.map((racer) => {
    const tuneCoinsNeededToMax = calculateCoinsNeeded(racer);
    const racerShardsNeededToMax = calculateRacerShardsNeeded(racer);
    const racerShardsToGetInMPL = calculateRacerShardsToGet(racer);
    const racerShardNeededIfMaxMPL = calculateRacerShardsIfMaxMPL(racer);
    const racersuperChargeTokensToGet = racer.superCharge ? calculateRacerSuperChargeTokenSNeeded(racer) : 0;
    return {
      collection: racer.collection,
      releaseSeason: racer.releaseSeason,
      rarity: racer.rarity,
      role: racer.role,
      name: racer.name,
      currentStars: racer.currentStars,
      currentStarFragment: racer.currentStarFragment,
      currentShards: racer.currentShards,
      superCharge: racer.superCharge,
      currentSuperChargeLevel: racer.currentSuperChargeLevel,
      currentSuperChargeTokens: racer.currentSuperChargeTokens,
      currentMPL: racer.currentMPL,
      highestMPL: racer.highestMPL,
      universalBox: racer.universalBox,
      MPLTuneCoinReward: racer.MPLTuneCoinReward,
      MPLTokenOld: racer.MPLTokenOld,
      tuneCoinsNeededToMax: tuneCoinsNeededToMax,
      shardsNeededToMax: racerShardsNeededToMax,
      shardsToGetInMPL: racerShardsToGetInMPL,
      ShardsNeededIfMaxMPL: racerShardNeededIfMaxMPL,
      superChargeTokensToGet: racersuperChargeTokensToGet,
    };
  });
}

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
  ShardsNeededIfMaxMPL,
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
      <td>{ShardsNeededIfMaxMPL}</td>
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
  return <tbody>{racerList}</tbody>;
}
