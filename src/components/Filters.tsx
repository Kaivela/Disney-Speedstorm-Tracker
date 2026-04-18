import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function Filters() {
  const { mode } = useContext(AppContext);
  if (mode === 'racer') {
    return (
      <>
        <button className="reset" id="reset" data-trad="reset_all">
          reset
        </button>
        <input type="text" id="racerSearchInput" />
        <select id="racerSeasonFilter" className="racerFilter">
          <option value="">season</option>
        </select>
        <select id="racerFranchiseFilter" className="racerFilter">
          <option value="">Franchise</option>
        </select>
        <select id="racerRarityFilter" className="racerFilter">
          <option value="">Rarity</option>
        </select>
        <select id="roleFilter" className="racerFilter">
          <option value="">Role</option>
        </select>
        <select id="racerShardsFilter" className="racerFilter">
          <option value="">Shards</option>
        </select>
        <select id="rmjFilter" className="racerFilter">
          <option value="">MPR</option>
        </select>
        <select id="starFilter" className="racerFilter">
          <option value="">Star</option>
        </select>
        <select id="racerBoxesFilter" className="racerFilter">
          <option value="">Boxes</option>
        </select>
      </>
    );
  } else {
    return (
      <>
        <button className="reset" id="reset" data-trad="reset_all">
          reset
        </button>
        <input type="text" id="racerSearchInput" />
        <select id="racerFranchiseFilter" className="racerFilter">
          <option value="">Franchise</option>
        </select>
        <select id="racerRarityFilter" className="racerFilter">
          <option value="">Rarity</option>
        </select>
        <select id="starFilter" className="racerFilter">
          <option value="">Star</option>
        </select>
        <select id="racerShardsFilter" className="racerFilter">
          <option value="">Shards</option>
        </select>
        <select id="racerBoxesFilter" className="racerFilter">
          <option value="">Boxes</option>
        </select>
      </>
    );
  }
}
