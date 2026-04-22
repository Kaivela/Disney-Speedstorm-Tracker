import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { RacerTableBody } from './RacerTableBody';
import { CrewTableBody } from './CrewTableBody';

export function Table() {
  const { mode } = useContext(AppContext);
  if (mode === 'racer') {
    return (
      <div className="tableContainer">
        <table id="racerTable">
          <thead>
            <tr>
              <th data-sort="releaseSeason" data-trad="season">
                Season
              </th>
              <th>Image</th>
              <th>Collection</th>
              <th data-trad="rarity">Rarity</th>
              <th data-trad="role">Role</th>
              <th data-trad="racer_name_table">Racer Name</th>
              <th className="racerCurrentStars" data-sort="currentStars"></th>
              <th className="racerCurrentStarFragment" data-sort="currentStarFragment" data-trad="current_starfragment_table"></th>
              <th className="currentSuperChargeLevel" data-sort="currentSuperChargeLevel" data-trad="current_super_charge_level_table"></th>
              <th data-sort="currentShards" data-trad="current_shards_table">
                Current Shards
              </th>
              <th data-sort="currentSuperChargeShards" data-trad="current_super_charge_shards_table">
                Current Super Charge Tokens
              </th>
              <th data-sort="currentMPL" data-trad="current_MPL_table">
                Current MPL
              </th>
              <th data-sort="highestMPL" data-trad="highest_MPL_table">
                Highest MPL
              </th>
              <th data-trad="max_MPL_table">Max MPL</th>
              <th data-sort="shardsNeeded" data-trad="shards_needed_table">
                Shards Needed
              </th>
              <th data-sort="shardsToGet" data-trad="shards_MPL_table">
                Shards in MPL
              </th>
              <th className="superChargeTokensNeeded" data-trad="super_charge_tokens_to_get_table">
                super charge tokens to get
              </th>
              <th className="TuneCoin" data-sort="tuneCoins"></th>
              <th data-trad="free_table">Free</th>
              <th data-sort="shardStar" data-trad="shards_to_next_star">
                Shards Next Star
              </th>
              <th data-sort="coinStar" data-trad="coins_to_next_star">
                Coins Next Star
              </th>
              <th data-sort="shardMaxMPL" data-trad="shards_needed_if_max_MPL">
                Shards Needed if Max MPL
              </th>
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
              <th data-sort="releaseSeason" data-trad="season">
                Season
              </th>
              <th>Exclusive To</th>
              <th>Image</th>
              <th>Collection</th>
              <th data-trad="rarity">Rarity</th>
              <th data-trad="crew_name_table">Crew Name</th>
              <th data-sort="currentStars" data-trad="current_level_table">
                Current Level
              </th>
              <th data-sort="currentShards" data-trad="current_shards_table">
                Current Shards
              </th>
              <th data-sort="shardsNeeded" data-trad="shards_needed_table">
                Shards Needed
              </th>
              <th data-trad="free_table">Free</th>
              <th data-trad="actions">Action</th>
            </tr>
          </thead>
          <CrewTableBody />
        </table>
      </div>
    );
  }
}
