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
                  data-sort="releaseSeason"
                  data-trad="season">
                  {t('th.season')}
                </th>
              )}
              {settings.showRacerColumn.image && <th>{t('th.img')}</th>}
              {settings.showRacerColumn.collection && <th>{t('th.collection')}</th>}
              {settings.showRacerColumn.rarity && <th data-trad="rarity">{t('th.rarity')}</th>}
              {settings.showRacerColumn.role && <th data-trad="role">{t('th.role')}</th>}
              {settings.showRacerColumn.name && <th data-trad="racer_name_table">{t('th.racerName')}</th>}
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
                  data-sort="currentStarFragment"
                  data-trad="current_starfragment_table"></th>
              )}
              {settings.showRacerColumn.currentSuperChargeLevel && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="currentSuperChargeLevel cursor-pointer"
                  data-sort="currentSuperChargeLevel"
                  data-trad="current_super_charge_level_table"></th>
              )}
              {settings.showRacerColumn.currentShards && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="currentShards"
                  data-trad="current_shards_table">
                  {t('th.currentShards')}
                </th>
              )}
              {settings.showRacerColumn.currentSuperChargeTokens && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="currentSuperChargeTokens"
                  data-trad="current_super_charge_shards_table">
                  {t('th.currentSuperChargeTokens')}
                </th>
              )}
              {settings.showRacerColumn.currentMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="currentMPL"
                  data-trad="current_MPL_table">
                  {t('th.currentMPL')}
                </th>
              )}
              {settings.showRacerColumn.highestMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="highestMPL"
                  data-trad="highest_MPL_table">
                  {t('th.highestMPL')}
                </th>
              )}
              {settings.showRacerColumn.maxMPL && <th data-trad="max_MPL_table">{t('th.maxMPL')}</th>}
              {settings.showRacerColumn.shardsNeededToMax && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededToMax"
                  data-trad="shards_needed_table">
                  {t('th.shardsNeeded')}
                </th>
              )}
              {settings.showRacerColumn.shardsToGetInMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsToGetInMPL"
                  data-trad="shards_MPL_table">
                  {t('th.shardsInMPL')}
                </th>
              )}
              {settings.showRacerColumn.superChargeTokensNeeded && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="superChargeTokensNeeded"
                  data-trad="super_charge_tokens_to_get_table">
                  {t('th.superChargeTokensNeeded')}
                </th>
              )}
              {settings.showRacerColumn.tuneCoinsNeededToMax && (
                <th
                  className="TuneCoin cursor-pointer"
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  data-sort="tuneCoinsNeededToMax"></th>
              )}
              {settings.showRacerColumn.free && <th data-trad="free_table">{t('th.free')}</th>}
              {settings.showRacerColumn.shardsNeededToNextStar && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededToNextStar"
                  data-trad="shards_to_next_star">
                  {t('th.shardsNextStar')}
                </th>
              )}
              {settings.showRacerColumn.tuneCoinsNeededToNextStar && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="tuneCoinsNeededToNextStar"
                  data-trad="coins_to_next_star">
                  {t('th.coinsNextStar')}
                </th>
              )}
              {settings.showRacerColumn.shardsNeededIfMaxMPL && (
                <th
                  onClick={(event) => sortRacerClickHandler(event, sortRacerColumn, setSortRacerColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededIfMaxMPL"
                  data-trad="shards-if-max-MPL">
                  {t('th.shardsIfMaxMPL')}
                </th>
              )}
              <th data-trad="actions">{t('th.action')}</th>
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
                  data-sort="releaseSeason"
                  data-trad="season">
                  {t('th.season')}
                </th>
              )}
              {settings.showCrewColumn.exclusive && <th>{t('th.exclusive')}</th>}
              {settings.showCrewColumn.image && <th>{t('th.img')}</th>}
              {settings.showCrewColumn.collection && <th>{t('th.collection')}</th>}
              {settings.showCrewColumn.rarity && <th data-trad="rarity">{t('th.rarity')}</th>}
              {settings.showCrewColumn.name && <th data-trad="crew_name_table">{t('th.crewName')}</th>}
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
                  data-sort="currentShards"
                  data-trad="current_shards_table">
                  {t('th.currentShards')}
                </th>
              )}
              {settings.showCrewColumn.shardsNeededToMax && (
                <th
                  onClick={(event) => sortCrewClickHandler(event, sortCrewColumn, setSortCrewColumn)}
                  className="cursor-pointer"
                  data-sort="shardsNeededToMax"
                  data-trad="shards_needed_table">
                  {t('th.shardsNeeded')}
                </th>
              )}
              {settings.showCrewColumn.free && <th data-trad="free_table">{t('th.free')}</th>}
              <th data-trad="actions">{t('th.action')}</th>
            </tr>
          </thead>
          <CrewTableBody />
        </table>
      </div>
    );
  }
}
