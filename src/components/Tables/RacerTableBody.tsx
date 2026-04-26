import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { IRacer } from '../../types/types';
import { ModifyRacerBtn } from './ModifyRacerBtn';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import { formatBigNumber } from '../../compute/calculs';

function Racer({ racer }: { racer: IRacer }) {
  const currentStarMaxed = racer.currentStars === 6;
  const shardsNeededIfMaxMPL = Math.max(racer.shardsToGetInMPL - racer.shardsNeededToMax, 0);
  return (
    <tr>
      <td>{racer.releaseSeason}</td>
      <td className="td-img">
        <img className="img-cover" src={`/img/racers/${racer.name}.webp`} />
      </td>
      <td data-trad={racer.collection}>{racer.collection}</td>
      <td data-trad={racer.rarity}>{racer.rarity}</td>
      <td data-trad={racer.role}>{racer.role}</td>
      <td data-trad={racer.name}>{racer.name}</td>
      <td>{racer.currentStars}</td>
      <td>{currentStarMaxed ? 'maxed' : racer.currentStarFragment}</td>
      <td>{racer.superCharge ? racer.currentSuperChargeLevel : '✘'}</td>
      <td>{currentStarMaxed ? 'maxed' : racer.currentShards}</td>
      <td>{racer.superCharge ? (racer.currentSuperChargeLevel === 2 ? 'maxed' : racer.currentSuperChargeTokens) : '✘'}</td>
      <td>{racer.currentMPL}</td>
      <td>{racer.highestMPL}</td>
      <td>badge max MPL</td>
      <td>{currentStarMaxed ? 'Maxed' : racer.shardsNeededToMax}</td>
      <td>{racer.shardsToGetInMPL === 0 ? 'None' : racer.shardsToGetInMPL}</td>
      <td>{racer.currentSuperChargeLevel === 2 ? 'Maxed' : racer.superChargeTokensNeeded}</td>
      <td>{currentStarMaxed ? 'Maxed' : formatBigNumber(racer.tuneCoinsNeededToMax)}</td>
      <td>{racer.universalBox}</td>
      <td>{racer.shardsNeededToNextStar}</td>
      <td>{formatBigNumber(racer.tuneCoinsNeededToNextStar)}</td>
      <td>{currentStarMaxed ? 'Maxed' : shardsNeededIfMaxMPL}</td>
      <td>
        <ModifyRacerBtn racer={racer} />
        <button data-trad="calculate" data-index="${index}">
          Calculate
        </button>
      </td>
    </tr>
  );
}

function RacerList() {
  // LOGIC
  const { racersSaved } = useContext(AppContext);
  const iRacers = buildIElementsArray(racersSaved);
  return iRacers.map((racer) => {
    // TEMPLATE
    return <Racer key={racer.name} racer={racer} />;
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
