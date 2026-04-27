import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { RacerTableBody } from './RacerTableBody';
import { CrewTableBody } from './CrewTableBody';

export function Table() {
  const { mode, settings } = useContext(AppContext);
  if (mode === 'racer') {
    return (
      <div className="tableContainer">
        <table id="racerTable">
          <thead>
            <tr>
              {settings.showRacerColumn.releaseSeason && (
                <th data-sort="releaseSeason" data-trad="season">
                  Season
                </th>
              )}
              {settings.showRacerColumn.image && <th>Image</th>}
              {settings.showRacerColumn.collection && <th>Collection</th>}
              {settings.showRacerColumn.rarity && <th data-trad="rarity">Rarity</th>}
              {settings.showRacerColumn.role && <th data-trad="role">Role</th>}
              {settings.showRacerColumn.name && <th data-trad="racer_name_table">Racer Name</th>}
              {settings.showRacerColumn.currentStars && <th className="racerCurrentStars" data-sort="currentStars"></th>}
              {settings.showRacerColumn.starFragment && (
                <th className="racerCurrentStarFragment" data-sort="currentStarFragment" data-trad="current_starfragment_table"></th>
              )}
              {settings.showRacerColumn.superChargeLevel && (
                <th className="currentSuperChargeLevel" data-sort="currentSuperChargeLevel" data-trad="current_super_charge_level_table"></th>
              )}
              {settings.showRacerColumn.currentShards && (
                <th data-sort="currentShards" data-trad="current_shards_table">
                  Current Shards
                </th>
              )}
              {settings.showRacerColumn.currentSuperChargeTokens && (
                <th data-sort="currentSuperChargeShards" data-trad="current_super_charge_shards_table">
                  Current Super Charge Tokens
                </th>
              )}
              {settings.showRacerColumn.currentMPL && (
                <th data-sort="currentMPL" data-trad="current_MPL_table">
                  Current MPL
                </th>
              )}
              {settings.showRacerColumn.highestMPL && (
                <th data-sort="highestMPL" data-trad="highest_MPL_table">
                  Highest MPL
                </th>
              )}
              {settings.showRacerColumn.maxMPL && <th data-trad="max_MPL_table">Max MPL</th>}
              {settings.showRacerColumn.shardsNeeded && (
                <th data-sort="shardsNeeded" data-trad="shards_needed_table">
                  Shards Needed
                </th>
              )}
              {settings.showRacerColumn.shardsInMPL && (
                <th data-sort="shardsToGet" data-trad="shards_MPL_table">
                  Shards in MPL
                </th>
              )}
              {settings.showRacerColumn.superChargeTokensNeeded && (
                <th className="superChargeTokensNeeded" data-trad="super_charge_tokens_to_get_table">
                  super charge tokens to get
                </th>
              )}
              {settings.showRacerColumn.tuneCoinsNeeded && <th className="TuneCoin" data-sort="tuneCoins"></th>}
              {settings.showRacerColumn.free && <th data-trad="free_table">Free</th>}
              {settings.showRacerColumn.shardsNextStar && (
                <th data-sort="shardStar" data-trad="shards_to_next_star">
                  Shards Next Star
                </th>
              )}
              {settings.showRacerColumn.coinsNextStar && (
                <th data-sort="coinStar" data-trad="coins_to_next_star">
                  Coins Next Star
                </th>
              )}
              {settings.showRacerColumn.shardsNeededIfMaxMPL && (
                <th data-sort="shardMaxMPL" data-trad="shards_needed_if_max_MPL">
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
              {settings.showCrewColumn.level && [
                <th data-sort="currentStars" data-trad="current_level_table">
                  Current Level
                </th>,
              ]}
              {settings.showCrewColumn.currentShards && (
                <th data-sort="currentShards" data-trad="current_shards_table">
                  Current Shards
                </th>
              )}
              {settings.showCrewColumn.shardsNeeded && (
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
