import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { IRacer } from '../../types/types';
import { ModifyRacerBtn } from './ModifyRacerBtn';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import { formatBigNumber } from '../../compute/calculs';

function Racer({ racer }: { racer: IRacer }) {
  const { settings } = useContext(AppContext);
  const currentStarMaxed = racer.currentStars === 6;
  const shardsNeededIfMaxMPL = Math.max(racer.shardsToGetInMPL - racer.shardsNeededToMax, 0);
  return (
    <tr>
      {settings.showRacerColumn.releaseSeason && <td>{racer.releaseSeason}</td>}
      {settings.showRacerColumn.image && (
        <td className="td-img">
          <img className="img-cover" src={`/img/racers/${racer.name}.webp`} />
        </td>
      )}
      {settings.showRacerColumn.collection && <td data-trad={racer.collection}>{racer.collection}</td>}
      {settings.showRacerColumn.rarity && <td data-trad={racer.rarity}>{racer.rarity}</td>}
      {settings.showRacerColumn.role && <td data-trad={racer.role}>{racer.role}</td>}
      {settings.showRacerColumn.name && <td data-trad={racer.name}>{racer.name}</td>}
      {settings.showRacerColumn.currentStars && <td>{racer.currentStars}</td>}
      {settings.showRacerColumn.starFragment && <td>{currentStarMaxed ? 'maxed' : racer.currentStarFragment}</td>}
      {settings.showRacerColumn.superChargeLevel && <td>{racer.superCharge ? racer.currentSuperChargeLevel : '✘'}</td>}
      {settings.showRacerColumn.currentShards && <td>{currentStarMaxed ? 'maxed' : racer.currentShards}</td>}
      {settings.showRacerColumn.currentSuperChargeTokens && (
        <td>{racer.superCharge ? (racer.currentSuperChargeLevel === 2 ? 'maxed' : racer.currentSuperChargeTokens) : '✘'}</td>
      )}
      {settings.showRacerColumn.currentMPL && <td>{racer.currentMPL}</td>}
      {settings.showRacerColumn.highestMPL && <td>{racer.highestMPL}</td>}
      {settings.showRacerColumn.maxMPL && <td>badge max MPL</td>}
      {settings.showRacerColumn.shardsNeeded && <td>{currentStarMaxed ? 'Maxed' : racer.shardsNeededToMax}</td>}
      {settings.showRacerColumn.shardsInMPL && <td>{racer.shardsToGetInMPL === 0 ? 'None' : racer.shardsToGetInMPL}</td>}
      {settings.showRacerColumn.superChargeTokensNeeded && <td>{racer.currentSuperChargeLevel === 2 ? 'Maxed' : racer.superChargeTokensNeeded}</td>}
      {settings.showRacerColumn.tuneCoinsNeeded && <td>{currentStarMaxed ? 'Maxed' : formatBigNumber(racer.tuneCoinsNeededToMax)}</td>}
      {settings.showRacerColumn.free && <td>{racer.universalBox}</td>}
      {settings.showRacerColumn.shardsNextStar && <td>{racer.shardsNeededToNextStar}</td>}
      {settings.showRacerColumn.coinsNextStar && <td>{formatBigNumber(racer.tuneCoinsNeededToNextStar)}</td>}
      {settings.showRacerColumn.shardsNeededIfMaxMPL && <td>{currentStarMaxed ? 'Maxed' : shardsNeededIfMaxMPL}</td>}
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
