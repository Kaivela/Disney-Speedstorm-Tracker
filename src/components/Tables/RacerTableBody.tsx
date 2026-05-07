import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import type { IRacer } from '../../types/types';
import { ModifyRacerBtn } from './ModifyRacerBtn';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import { formatBigNumber } from '../../compute/calculs';
import { ElementImgHtml } from './ElementImgHtml';
import { getRacerTdColors } from '../../compute/tdColors';
import { useTranslation } from 'react-i18next';

function Racer({ racer }: { racer: IRacer }) {
  const { settings } = useContext(AppContext);
  const { t } = useTranslation();
  const currentStarMaxed = racer.currentStars === 6;
  const shardsNeededIfMaxMPL = Math.max(racer.shardsNeededToMax - racer.shardsToGetInMPL, 0);

  return (
    <tr>
      {settings.showRacerColumn.releaseSeason && <td>{racer.releaseSeason}</td>}
      {settings.showRacerColumn.image && (
        <td className="td-img">
          <ElementImgHtml element={racer} />
        </td>
      )}
      {settings.showRacerColumn.collection && <td data-trad={racer.collection}>{t(`collection.${racer.collection}`)}</td>}
      {settings.showRacerColumn.rarity && (
        <td className={getRacerTdColors(racer).rarityColor} data-trad={racer.rarity}>
          {t(`td.${racer.rarity}`)}
        </td>
      )}
      {settings.showRacerColumn.role && (
        <td className={getRacerTdColors(racer).roleColor} data-trad={racer.role}>
          {t(`td.${racer.role}`)}
        </td>
      )}
      {settings.showRacerColumn.name && <td data-trad={racer.name}>{t(`racerName.${racer.name}`)}</td>}
      {settings.showRacerColumn.currentStars && <td className={getRacerTdColors(racer).starColor}>{racer.currentStars}</td>}
      {settings.showRacerColumn.currentStarFragment && <td>{racer.currentStarFragment}</td>}
      {settings.showRacerColumn.currentSuperChargeLevel && (
        <td className={getRacerTdColors(racer).superChargeColor}>{racer.superCharge ? racer.currentSuperChargeLevel : '✘'}</td>
      )}
      {settings.showRacerColumn.currentShards && (
        <td className={getRacerTdColors(racer).shardsColor}>{currentStarMaxed ? t('td.maxed') : racer.currentShards}</td>
      )}
      {settings.showRacerColumn.currentSuperChargeTokens && (
        <td>{racer.superCharge ? (racer.currentSuperChargeLevel === 2 ? t('td.maxed') : racer.currentSuperChargeTokens) : '✘'}</td>
      )}
      {settings.showRacerColumn.currentMPL && <td>{racer.currentMPL}</td>}
      {settings.showRacerColumn.highestMPL && <td>{racer.highestMPL}</td>}
      {settings.showRacerColumn.maxMPL && <td>badge max MPL</td>}
      {settings.showRacerColumn.shardsNeededToMax && (
        <td className={getRacerTdColors(racer).shardsColor}>{currentStarMaxed ? t('td.maxed') : racer.shardsNeededToMax}</td>
      )}
      {settings.showRacerColumn.shardsToGetInMPL && <td>{racer.shardsToGetInMPL === 0 ? t('td.none') : racer.shardsToGetInMPL}</td>}
      {settings.showRacerColumn.superChargeTokensNeeded && (
        <td>{racer.currentSuperChargeLevel === 2 ? t('td.maxed') : racer.superChargeTokensNeeded}</td>
      )}
      {settings.showRacerColumn.tuneCoinsNeededToMax && <td>{currentStarMaxed ? t('td.maxed') : formatBigNumber(racer.tuneCoinsNeededToMax)}</td>}
      {settings.showRacerColumn.free && <td>{racer.universalBox}</td>}
      {settings.showRacerColumn.shardsNeededToNextStar && <td>{racer.shardsNeededToNextStar}</td>}
      {settings.showRacerColumn.tuneCoinsNeededToNextStar && <td>{formatBigNumber(racer.tuneCoinsNeededToNextStar)}</td>}
      {settings.showRacerColumn.shardsNeededIfMaxMPL && <td>{currentStarMaxed ? t('td.maxed') : shardsNeededIfMaxMPL}</td>}
      <td>
        <div className="flex flex-col gap-2 h-full items-center">
          <ModifyRacerBtn racer={racer} />
          <button className="btn btn-sm hidden preset-filled-primary-50-950" data-trad="calculate" data-index="${index}">
            Calculate
          </button>
        </div>
      </td>
    </tr>
  );
}

function RacerList() {
  // LOGIC
  const { racersSaved, racerFilters, sortRacerColumn } = useContext(AppContext);
  const iRacers = buildIElementsArray(racersSaved);
  const { t } = useTranslation();

  return iRacers
    .filter((racer) => {
      let nameFilter = true;
      let seasonFilter = true;
      let collectionFilter = true;
      let rarityFilter = true;
      let roleFilter = true;
      let shardsFilter = true;
      let highestMPLFilter = true;
      let starsFilter = true;
      let freeFilter = true;
      let superChargeTokensNeededFilter = true;

      if (racerFilters.name) {
        nameFilter = t(`racerName.${racer.name}`).toLowerCase().includes(racerFilters.name.toLowerCase());
      }
      if (racerFilters.season !== -1) {
        seasonFilter = racer.releaseSeason === racerFilters.season;
      }
      if (racerFilters.shardsNeeded) {
        switch (racerFilters.shardsNeeded) {
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
      if (racerFilters.collection) {
        collectionFilter = racer.collection.toLowerCase() === racerFilters.collection.toLowerCase();
      }
      if (racerFilters.rarity) {
        rarityFilter = racer.rarity.toLowerCase().includes(racerFilters.rarity.toLowerCase());
      }
      if (racerFilters.role) {
        roleFilter = racer.role.toLowerCase().includes(racerFilters.role.toLowerCase());
      }
      if (racerFilters.highestMPL) {
        switch (racerFilters.highestMPL) {
          case 'not40':
            highestMPLFilter = racer.highestMPL < 40;
            break;

          case 'between21and50':
            highestMPLFilter = racer.highestMPL === 40;
            break;
        }
      }
      if (racerFilters.currentStars !== -1) {
        starsFilter = racer.currentStars === racerFilters.currentStars;
      }
      if (racerFilters.universalBox) {
        freeFilter = racer.universalBox === racerFilters.universalBox;
      }
      if (racerFilters.superChargeTokensNeeded) {
        switch (racerFilters.superChargeTokensNeeded) {
          case '40+':
            superChargeTokensNeededFilter = racer.superChargeTokensNeeded > 40;
            break;

          case '40-':
            superChargeTokensNeededFilter = racer.superChargeTokensNeeded <= 40 && racer.superChargeTokensNeeded >= 1;
            break;

          case '0':
            superChargeTokensNeededFilter = racer.superChargeTokensNeeded === 0;
            break;
        }
      }

      // TEMPLATE
      return (
        nameFilter &&
        seasonFilter &&
        shardsFilter &&
        collectionFilter &&
        rarityFilter &&
        roleFilter &&
        starsFilter &&
        freeFilter &&
        highestMPLFilter &&
        superChargeTokensNeededFilter
      );
    })
    .sort((racerA: IRacer, racerB: IRacer) => {
      if (sortRacerColumn.order === 'asc') {
        return racerA[sortRacerColumn.columnName] - racerB[sortRacerColumn.columnName];
      }
      if (sortRacerColumn.order === 'desc') {
        return racerB[sortRacerColumn.columnName] - racerA[sortRacerColumn.columnName];
      }
      return 0;
    })
    .map((racer) => {
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
