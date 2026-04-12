import { useContext } from 'react';
import { ModeContext } from '../context/AppContext';

export function Table() {
  const { mode } = useContext(ModeContext);
  if (mode === 'racer') {
    return (
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
            <th data-trad="racer_name_table">racer Name</th>
            <th data-sort="currentStars" className="current_stars">
              Current Stars
            </th>
            <th data-sort="currentStarFragment" data-trad="current_starfragment_table">
              Current StarFragment
            </th>
            <th data-sort="currentShards" data-trad="current_shards_table">
              Current Shards
            </th>
            <th data-sort="currentSuperChargeLevel" data-trad="current_super_charge_level_table">
              Current SuperCharge Level
            </th>
            <th data-sort="currentSuperChargeShards" data-trad="current_super_charge_shards_table">
              Current SuperCharge Shards
            </th>
            <th data-sort="currentRMJ" data-trad="current_MPR_table">
              Current MPR
            </th>
            <th data-sort="highestRMJ" data-trad="highest_MPR_table">
              Highest MPR
            </th>
            <th data-trad="max_MPR_table">Max MPR</th>
            <th data-sort="shardsNeeded" data-trad="shards_needed_table">
              Shards Needed
            </th>
            <th data-sort="shardsToGet" data-trad="shards_MPR_table">
              Shards for MPR
            </th>
            <th data-sort="tuneCoins" className="tuneCoin">
              Tune Coins
            </th>
            <th data-trad="free_table">Free</th>
            <th data-sort="shardStar" data-trad="shards_to_next_star">
              Shards Next Star
            </th>
            <th data-sort="coinStar" data-trad="coins_to_next_star">
              Coins Next Star
            </th>
            <th data-sort="shardMaxMPR" data-trad="shards_needed_if_max_MPR">
              Shards Needed if Max MPR
            </th>
            <th data-trad="actions">Actions</th>
          </tr>
        </thead>
        <tbody id="racerTableBody">{/* Les données des pilotes seront ajoutées ici */}</tbody>
      </table>
    );
  } else {
    return (
      <table id="crewTable">
        <thead>
          <tr>
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
        <tbody id="crewTableBody">{/* Les données des crews seront ajoutées ici */}</tbody>
      </table>
    );
  }
}
