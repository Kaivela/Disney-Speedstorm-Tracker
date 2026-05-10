import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { RacerTableBody } from './RacerTableBody';
import { CrewTableBody } from './CrewTableBody';
import type { SortableCrewColumns, SortableRacerColumns, SortCrewColumn, SortRacerColumn } from '../../types/types';
import { useTranslation } from 'react-i18next';

function sortRacerClickHandler(
  event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  sortColumn: SortRacerColumn,
  setSortRacerColumn: (sortOptions: SortRacerColumn) => void
) {
  const columnName = event.currentTarget?.dataset.sort as SortableRacerColumns;
  // faire ça proprement
  document.querySelectorAll('[data-sort]').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.dataset.order = '';
    }
  });
  if (sortColumn.columnName === columnName) {
    const nextOrder =
      (
        {
          default: 'asc',
          asc: 'desc',
          desc: 'default',
        } as const
      )[sortColumn.order] || 'default';
    setSortRacerColumn({ columnName, order: nextOrder });
    event.currentTarget.dataset.order = nextOrder;
  } else {
    setSortRacerColumn({ columnName, order: 'asc' });
    event.currentTarget.dataset.order = 'asc';
  }
}

function sortCrewClickHandler(
  event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  sortColumn: SortCrewColumn,
  setSortCrewColumn: (sortOptions: SortCrewColumn) => void
) {
  const columnName = event.currentTarget?.dataset.sort as SortableCrewColumns;
  // faire ça proprement
  document.querySelectorAll('[data-sort]').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.dataset.order = '';
    }
  });
  if (sortColumn.columnName === columnName) {
    const nextOrder =
      (
        {
          default: 'asc',
          asc: 'desc',
          desc: 'default',
        } as const
      )[sortColumn.order] || 'default';
    setSortCrewColumn({ columnName, order: nextOrder });
    event.currentTarget.dataset.order = nextOrder;
  } else {
    setSortCrewColumn({ columnName, order: 'asc' });
    event.currentTarget.dataset.order = 'asc';
  }
}

export function Table() {
  const { mode, settings, sortRacerColumn, setSortRacerColumn, sortCrewColumn, setSortCrewColumn } = useContext(AppContext);
  const { t } = useTranslation();
  if (mode === 'racer') {
    return (
      <div className="tableContainer">
        <table>
          <thead className="bg-black/85 backdrop-blur-sm">
            <tr>
              {settings.showRacerColumn?.releaseSeason && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="releaseSeason">
                  {t('th.season')}
                </th>
              )}
              {settings.showRacerColumn.image && <th>{t('th.img')}</th>}
              {settings.showRacerColumn.collection && <th>{t('th.collection')}</th>}
              {settings.showRacerColumn.rarity && <th>{t('th.rarity')}</th>}
              {settings.showRacerColumn.role && <th>{t('th.role')}</th>}
              {settings.showRacerColumn.name && <th>{t('th.racerName')}</th>}
              {settings.showRacerColumn.currentStars && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="racerCurrentStars cursor-pointer"
                  data-sort="currentStars"></th>
              )}
              {settings.showRacerColumn.currentStarFragment && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="racerCurrentStarFragment cursor-pointer"
                  data-sort="currentStarFragment"></th>
              )}
              {settings.showRacerColumn.currentSuperChargeLevel && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="currentSuperChargeLevel cursor-pointer"
                  data-sort="currentSuperChargeLevel"></th>
              )}
              {settings.showRacerColumn.currentShards && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="currentShards">
                  {t('th.currentShards')}
                </th>
              )}
              {settings.showRacerColumn.currentSuperChargeTokens && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="currentSuperChargeTokens">
                  {t('th.currentSuperChargeTokens')}
                </th>
              )}
              {settings.showRacerColumn.currentMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="currentMPL">
                  {t('th.currentMPL')}
                </th>
              )}
              {settings.showRacerColumn.highestMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="highestMPL">
                  {t('th.highestMPL')}
                </th>
              )}
              {settings.showRacerColumn.maxMPL && <th>{t('th.maxMPL')}</th>}
              {settings.showRacerColumn.shardsNeededToMax && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededToMax">
                  {t('th.shardsNeeded')}
                </th>
              )}
              {settings.showRacerColumn.shardsToGetInMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsToGetInMPL">
                  {t('th.shardsInMPL')}
                </th>
              )}
              {settings.showRacerColumn.superChargeTokensNeeded && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="superChargeTokensNeeded">
                  {t('th.superChargeTokensNeeded')}
                </th>
              )}
              {settings.showRacerColumn.tuneCoinsNeededToMax && (
                <th
                  className="TuneCoin cursor-pointer"
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  data-sort="tuneCoinsNeededToMax"></th>
              )}
              {settings.showRacerColumn.free && <th>{t('th.free')}</th>}
              {settings.showRacerColumn.shardsNeededToNextStar && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededToNextStar">
                  {t('th.shardsNextStar')}
                </th>
              )}
              {settings.showRacerColumn.tuneCoinsNeededToNextStar && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="tuneCoinsNeededToNextStar">
                  {t('th.coinsNextStar')}
                </th>
              )}
              {settings.showRacerColumn.shardsNeededIfMaxMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededIfMaxMPL">
                  {t('th.shardsIfMaxMPL')}
                </th>
              )}
              <th>{t('th.action')}</th>
            </tr>
          </thead>
          <RacerTableBody />
        </table>
      </div>
    );
  } else {
    return (
      <div className="tableContainer">
        <table>
          <thead className="bg-black/70 backdrop-blur-xs">
            <tr>
              {settings.showCrewColumn.releaseSeason && (
                <th
                  onClick={(event) => sortCrewClickHandler(event, sortCrewColumn, setSortCrewColumn)}
                  className="cursor-pointer"
                  data-sort="releaseSeason">
                  {t('th.season')}
                </th>
              )}
              {settings.showCrewColumn.exclusive && <th>{t('th.exclusive')}</th>}
              {settings.showCrewColumn.image && <th>{t('th.img')}</th>}
              {settings.showCrewColumn.collection && <th>{t('th.collection')}</th>}
              {settings.showCrewColumn.rarity && <th>{t('th.rarity')}</th>}
              {settings.showCrewColumn.name && <th>{t('th.crewName')}</th>}
              {settings.showCrewColumn.currentStars && [
                <th
                  onClick={(event) => sortCrewClickHandler(event, sortCrewColumn, setSortCrewColumn)}
                  className="racerCurrentStars cursor-pointer"
                  data-sort="currentStars"></th>,
              ]}
              {settings.showCrewColumn.currentShards && (
                <th
                  onClick={(event) => sortCrewClickHandler(event, sortCrewColumn, setSortCrewColumn)}
                  className="cursor-pointer"
                  data-sort="currentShards">
                  {t('th.currentShards')}
                </th>
              )}
              {settings.showCrewColumn.shardsNeededToMax && (
                <th
                  onClick={(event) => sortCrewClickHandler(event, sortCrewColumn, setSortCrewColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededToMax">
                  {t('th.shardsNeeded')}
                </th>
              )}
              {settings.showCrewColumn.free && <th>{t('th.free')}</th>}
              <th>{t('th.action')}</th>
            </tr>
          </thead>
          <CrewTableBody />
        </table>
      </div>
    );
  }
}
