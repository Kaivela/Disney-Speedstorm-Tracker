import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { IRacer } from '../../types/types';
import { ModifyRacerBtn } from './ModifyRacerBtn';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import { formatBigNumber } from '../../compute/calculs';

function Racer({ racer }: { racer: IRacer }) {
  const { settings } = useContext(AppContext);
  const currentStarMaxed = racer.currentStars === 6;
  const shardsNeededIfMaxMPL = Math.max(racer.shardsNeededToMax - racer.shardsToGetInMPL, 0);
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
      {settings.showRacerColumn.currentStarFragment && <td>{currentStarMaxed ? 'maxed' : racer.currentStarFragment}</td>}
      {settings.showRacerColumn.currentSuperChargeLevel && <td>{racer.superCharge ? racer.currentSuperChargeLevel : '✘'}</td>}
      {settings.showRacerColumn.currentShards && <td>{currentStarMaxed ? 'maxed' : racer.currentShards}</td>}
      {settings.showRacerColumn.currentSuperChargeTokens && (
        <td>{racer.superCharge ? (racer.currentSuperChargeLevel === 2 ? 'maxed' : racer.currentSuperChargeTokens) : '✘'}</td>
      )}
      {settings.showRacerColumn.currentMPL && <td>{racer.currentMPL}</td>}
      {settings.showRacerColumn.highestMPL && <td>{racer.highestMPL}</td>}
      {settings.showRacerColumn.maxMPL && <td>badge max MPL</td>}
      {settings.showRacerColumn.shardsNeededToMax && <td>{currentStarMaxed ? 'Maxed' : racer.shardsNeededToMax}</td>}
      {settings.showRacerColumn.shardsToGetInMPL && <td>{racer.shardsToGetInMPL === 0 ? 'None' : racer.shardsToGetInMPL}</td>}
      {settings.showRacerColumn.superChargeTokensNeeded && <td>{racer.currentSuperChargeLevel === 2 ? 'Maxed' : racer.superChargeTokensNeeded}</td>}
      {settings.showRacerColumn.tuneCoinsNeededToMax && <td>{currentStarMaxed ? 'Maxed' : formatBigNumber(racer.tuneCoinsNeededToMax)}</td>}
      {settings.showRacerColumn.free && <td>{racer.universalBox}</td>}
      {settings.showRacerColumn.shardsNeededToNextStar && <td>{racer.shardsNeededToNextStar}</td>}
      {settings.showRacerColumn.tuneCoinsNeededToNextStar && <td>{formatBigNumber(racer.tuneCoinsNeededToNextStar)}</td>}
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
  const { racersSaved, filters, sortColumn } = useContext(AppContext);
  const iRacers = buildIElementsArray(racersSaved);
  return iRacers
    .filter((racer) => {
      let nameFilter = true;
      let seasonFilter = true;
      let shardsFilter = true;

      if (filters.name) {
        nameFilter = racer.name.toLowerCase().includes(filters.name.toLowerCase());
      }
      if (filters.season !== -1) {
        seasonFilter = filters.season === -1 ? true : racer.releaseSeason === filters.season;
      }
      if (filters.shards) {
        switch (filters.shards) {
          case 'above50':
            shardsFilter = racer.shardsNeededToMax > 50;
            break;

          case 'between21and50':
            shardsFilter = racer.shardsNeededToMax <= 50 && racer.shardsNeededToMax > 21;
            break;

          case 'between1and20':
            shardsFilter = racer.shardsNeededToMax <= 20 && racer.shardsNeededToMax > 1;
            break;

          case 'not0':
            shardsFilter = racer.shardsNeededToMax !== 0;
            break;

          case '0':
            shardsFilter = racer.shardsNeededToMax === 0;
            break;
        }
      }
      return nameFilter && seasonFilter && shardsFilter;
    })
    .sort((racerA: IRacer, racerB: IRacer) => {
      if (sortColumn.order === 'asc') {
        return racerA[sortColumn.columnName] - racerB[sortColumn.columnName];
      }
      if (sortColumn.order === 'desc') {
        return racerB[sortColumn.columnName] - racerA[sortColumn.columnName];
      }
      return 0;
    })
    .map((racer) => {
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
