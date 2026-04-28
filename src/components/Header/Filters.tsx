import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { getRacersBlank } from '../../data/collections';

const racersBlank = getRacersBlank();

const seasonOptions = [...new Set(racersBlank.map((racer) => racer.releaseSeason))]
  .sort((a: number, b: number) => a - b)
  .map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

const collectionOptions = [...new Set(racersBlank.map((racer) => racer.collection))].map((option) => {
  return (
    <option key={option} value={option}>
      {option}
    </option>
  );
});

const rarityOptions = [...new Set(racersBlank.map((racer) => racer.rarity))].map((option) => {
  return (
    <option key={option} value={option}>
      {option}
    </option>
  );
});

const roleOptions = [...new Set(racersBlank.map((racer) => racer.role))].map((option) => {
  return (
    <option key={option} value={option}>
      {option}
    </option>
  );
});

// const pilotShardsNeededValues = [...new Set(pilots.map((pilot) => pilot.shardsNeeded || 0))];
// const pilotBoxes = [...new Set(pilotsBlank.map((pilot) => pilot.universalBox))];
// const rmj = [...new Set(pilots.map((pilot) => pilot.currentRMJ))];
// const level = [...new Set(pilots.map((pilot) => pilot.currentStarFragment))];
// const crewFranchises = [...new Set(crews.map((crew) => crew.franchise))];
// const crewRarities = [...new Set(crews.map((crew) => crew.rarity))];
// const crewStars = [...new Set(crews.map((crew) => crew.currentStars))];
// const crewShardsNeededValues = [...new Set(crews.map((crew) => crew.shardsNeeded || 0))];
// const crewBoxes = [...new Set(crewsBlank.map((crew) => crew.universalBox))];
// console.log({ seasonOptions });

export function Filters() {
  const { mode, filters, setFilters } = useContext(AppContext);
  if (mode === 'racer') {
    return (
      <div className="filters">
        {/* reset doit aussi vider le champ de search */}
        <button data-trad="reset_all" onClick={() => setFilters({ name: '', season: -1, collection: '', shards: '' })}>
          reset
        </button>
        <input
          type="text"
          placeholder="Search/..."
          onChange={(event) => {
            setFilters({ ...filters, name: event.currentTarget.value });
          }}
        />
        <select onChange={(event) => setFilters({ ...filters, season: Number(event.currentTarget.value) })}>
          <option value="-1">Season</option>
          {seasonOptions}
        </select>
        <select id="racerFranchiseFilter" className="racerFilter">
          <option value="">Collection</option>
          {collectionOptions}
        </select>
        <select id="racerRarityFilter" className="racerFilter">
          <option value="">Rarity</option>
          {rarityOptions}
        </select>
        <select id="roleFilter" className="racerFilter">
          <option value="">Role</option>
          {roleOptions}
        </select>
        <select onChange={(event) => setFilters({ ...filters, shards: event.currentTarget.value })} className="racerFilter">
          <option value="">Shards</option>
          <option value="above50">above 50</option>
          <option value="between21and50">between 21 and 50</option>
          <option value="between1and20">between 1 and 20</option>
          <option value="not0">still need shards</option>
          <option value="0">maxed</option>
        </select>
        <select id="mprFilter" className="racerFilter">
          <option value="">MPL</option>
        </select>
        <select id="starFilter" className="racerFilter">
          <option value="">Star</option>
        </select>
        <select id="racerBoxesFilter" className="racerFilter">
          <option value="">Boxes</option>
        </select>
      </div>
    );
  } else {
    return (
      <div className="filters">
        <button className="reset" id="reset" data-trad="reset_all">
          reset
        </button>
        <input type="text" id="racerSearchInput" />
        <select id="racerFranchiseFilter" className="racerFilter">
          <option value="">Collection</option>
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
      </div>
    );
  }
}
