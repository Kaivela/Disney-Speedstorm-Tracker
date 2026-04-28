import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { RacerTableBody } from './RacerTableBody';
import { CrewTableBody } from './CrewTableBody';
import type { SortableRacerColumns, SortColumn } from '../../types/types';

function sortClickHandler(
  event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  sortColumn: SortColumn,
  setSortColumn: (sortOptions: SortColumn) => void
) {
  const columnName = event.currentTarget?.dataset.sort as SortableRacerColumns;
  console.log({ columnName });
  if (sortColumn.columnName === columnName) {
    const nextOrder =
      (
        {
          default: 'asc',
          asc: 'desc',
          desc: 'default',
        } as const
      )[sortColumn.order] || 'default';
    setSortColumn({ columnName, order: nextOrder });
  } else {
    setSortColumn({ columnName, order: 'asc' });
  }
}

export function Table() {
  const { mode, settings, sortColumn, setSortColumn } = useContext(AppContext);
  if (mode === 'racer') {
    return (
      <div className="tableContainer">
        <table id="racerTable">
          <thead>
            <tr>
              {settings.showRacerColumn?.releaseSeason && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="releaseSeason"
                  data-trad="season">
                  Season
                </th>
              )}
              {settings.showRacerColumn.image && <th>Image</th>}
              {settings.showRacerColumn.collection && <th>Collection</th>}
              {settings.showRacerColumn.rarity && <th data-trad="rarity">Rarity</th>}
              {settings.showRacerColumn.role && <th data-trad="role">Role</th>}
              {settings.showRacerColumn.name && <th data-trad="racer_name_table">Racer Name</th>}
              {settings.showRacerColumn.currentStars && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="racerCurrentStars pointer"
                  data-sort="currentStars"></th>
              )}
              {settings.showRacerColumn.currentStarFragment && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="racerCurrentStarFragment pointer"
                  data-sort="currentStarFragment"
                  data-trad="current_starfragment_table"></th>
              )}
              {settings.showRacerColumn.currentSuperChargeLevel && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="currentSuperChargeLevel pointer"
                  data-sort="currentSuperChargeLevel"
                  data-trad="current_super_charge_level_table"></th>
              )}
              {settings.showRacerColumn.currentShards && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="currentShards"
                  data-trad="current_shards_table">
                  Current Shards
                </th>
              )}
              {settings.showRacerColumn.currentSuperChargeTokens && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="currentSuperChargeTokens"
                  data-trad="current_super_charge_shards_table">
                  Current Super Charge Tokens
                </th>
              )}
              {settings.showRacerColumn.currentMPL && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="currentMPL"
                  data-trad="current_MPL_table">
                  Current MPL
                </th>
              )}
              {settings.showRacerColumn.highestMPL && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="highestMPL"
                  data-trad="highest_MPL_table">
                  Highest MPL
                </th>
              )}
              {settings.showRacerColumn.maxMPL && <th data-trad="max_MPL_table">Max MPL</th>}
              {settings.showRacerColumn.shardsNeededToMax && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="shardsNeededToMax"
                  data-trad="shards_needed_table">
                  Shards Needed
                </th>
              )}
              {settings.showRacerColumn.shardsToGetInMPL && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="shardsToGetInMPL"
                  data-trad="shards_MPL_table">
                  Shards in MPL
                </th>
              )}
              {settings.showRacerColumn.superChargeTokensNeeded && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="superChargeTokensNeeded"
                  data-trad="super_charge_tokens_to_get_table">
                  super charge tokens to get
                </th>
              )}
              {settings.showRacerColumn.tuneCoinsNeededToMax && (
                <th
                  className="TuneCoin pointer"
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  data-sort="tuneCoinsNeededToMax"></th>
              )}
              {settings.showRacerColumn.free && <th data-trad="free_table">Free</th>}
              {settings.showRacerColumn.shardsNeededToNextStar && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="shardsNeededToNextStar"
                  data-trad="shards_to_next_star">
                  Shards Next Star
                </th>
              )}
              {settings.showRacerColumn.tuneCoinsNeededToNextStar && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="tuneCoinsNeededToNextStar"
                  data-trad="coins_to_next_star">
                  Coins Next Star
                </th>
              )}
              {settings.showRacerColumn.shardsNeededIfMaxMPL && (
                <th
                  onClick={(event) => sortClickHandler(event, sortColumn, setSortColumn)}
                  className="pointer"
                  data-sort="shardsNeededIfMaxMPL"
                  data-trad="shards-if-max-MPL">
                  Shards Needed if Max MPL
                </th>
              )}
              <th data-trad="actions">Actions</th>
            </tr>
          </thead>
          <RacerTableBody />
        </table>
      </div>
    );
  } else {
    return (
      <div className="tableContainer">
        <table id="crewTable">
          <thead>
            <tr>
              {settings.showCrewColumn.releaseSeason && (
                <th data-sort="releaseSeason" data-trad="season">
                  Season
                </th>
              )}
              {settings.showCrewColumn.exclusive && <th>Exclusive To</th>}
              {settings.showCrewColumn.image && <th>Image</th>}
              {settings.showCrewColumn.collection && <th>Collection</th>}
              {settings.showCrewColumn.rarity && <th data-trad="rarity">Rarity</th>}
              {settings.showCrewColumn.name && <th data-trad="crew_name_table">Crew Name</th>}
              {settings.showCrewColumn.currentStars && [
                <th data-sort="currentStars" data-trad="current_level_table">
                  Current Level
                </th>,
              ]}
              {settings.showCrewColumn.currentShards && (
                <th data-sort="currentShards" data-trad="current_shards_table">
                  Current Shards
                </th>
              )}
              {settings.showCrewColumn.shardsNeededToMax && (
                <th data-sort="shardsNeeded" data-trad="shards_needed_table">
                  Shards Needed
                </th>
              )}
              {settings.showCrewColumn.free && <th data-trad="free_table">Free</th>}
              <th data-trad="actions">Action</th>
            </tr>
          </thead>
          <CrewTableBody />
        </table>
      </div>
    );
  }
}
