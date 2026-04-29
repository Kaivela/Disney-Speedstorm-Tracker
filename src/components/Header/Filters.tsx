import { useContext } from 'react';
import { AppContext, filtersDefault } from '../../context/AppContext';
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

const racerStarsOptions = [0, 1, 2, 3, 4, 5, 6].map((option) => {
  return (
    <option key={option} value={option}>
      {option}
    </option>
  );
});

const crewStarsOptions = [0, 1, 2, 3, 4, 5].map((option) => {
  return (
    <option key={option} value={option}>
      {option}
    </option>
  );
});

const freeOptions = [...new Set(racersBlank.map((racer) => racer.universalBox))].map((option) => {
  return (
    <option key={option} value={option}>
      {option}
    </option>
  );
});

export function Filters() {
  const { mode, racerFilters, setRacerFilters, crewFilters, setCrewFilters } = useContext(AppContext);
  if (mode === 'racer') {
    return (
      <div className="flex gap-1 mx-auto">
        <button
          className="btn preset-filled"
          data-trad="reset_all"
          onClick={() => {
            setRacerFilters(filtersDefault.racer);
            console.log('lol');
          }}>
          reset
        </button>
        <input
          className="input preset-filled w-37.5"
          type="text"
          placeholder="Search/..."
          value={racerFilters.name}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, name: event.currentTarget.value });
          }}
        />
        <select
          className="input preset-filled w-min"
          value={racerFilters.season}
          onChange={(event) => setRacerFilters({ ...racerFilters, season: Number(event.currentTarget.value) })}>
          <option value="-1">Season</option>
          {seasonOptions}
        </select>
        <select
          className="input preset-filled w-30"
          value={racerFilters.collection}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, collection: event.currentTarget.value });
          }}>
          <option value="">Collection</option>
          {collectionOptions}
        </select>
        <select
          className="input preset-filled w-22.5"
          value={racerFilters.rarity}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, rarity: event.currentTarget.value });
          }}>
          <option value="">Rarity</option>
          {rarityOptions}
        </select>
        <select
          className="input preset-filled w-17.5"
          value={racerFilters.role}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, role: event.currentTarget.value });
          }}>
          <option value="">Role</option>
          {roleOptions}
        </select>
        <select
          className="input preset-filled w-40"
          value={racerFilters.shardsNeeded}
          onChange={(event) => setRacerFilters({ ...racerFilters, shardsNeeded: event.currentTarget.value })}>
          <option value="">Shards Needed</option>
          <option value="above50">above 50</option>
          <option value="between21and50">between 21 and 50</option>
          <option value="between1and20">between 1 and 20</option>
          <option value="not0">still need shards</option>
          <option value="0">Maxed</option>
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.highestMPL}
          onChange={(event) => setRacerFilters({ ...racerFilters, highestMPL: event.currentTarget.value })}>
          <option value="">highestMPL</option>
          <option value="not40">not 40 yet</option>
          <option value="40">40</option>
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.currentStars}
          onChange={(event) => setRacerFilters({ ...racerFilters, currentStars: Number(event.currentTarget.value) })}>
          <option value="-1">Current Stars</option>
          {racerStarsOptions}
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.universalBox}
          onChange={(event) => setRacerFilters({ ...racerFilters, universalBox: event.currentTarget.value })}>
          <option value="">Boxes</option>
          {freeOptions}
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.superChargeTokensNeeded}
          onChange={(event) => setRacerFilters({ ...racerFilters, superChargeTokensNeeded: event.currentTarget.value })}>
          <option value="">SuperCharge Tokens</option>
          <option value="40+">more than 40</option>
          <option value="40-">40 or less</option>
          <option value="0">Maxed or 0</option>
        </select>
      </div>
    );
  } else {
    return (
      <div className="flex gap-1 mx-auto">
        <button
          className="btn preset-filled"
          data-trad="reset_all"
          onClick={() => {
            setCrewFilters(filtersDefault.crew);
          }}>
          reset
        </button>
        <input
          className="input preset-filled w-37.5"
          type="text"
          placeholder="Search/..."
          value={crewFilters.name}
          onChange={(event) => {
            setCrewFilters({ ...crewFilters, name: event.currentTarget.value });
          }}
        />
        <select
          className="input preset-filled w-min"
          value={crewFilters.season}
          onChange={(event) => setCrewFilters({ ...crewFilters, season: Number(event.currentTarget.value) })}>
          <option value="-1">Season</option>
          {seasonOptions}
        </select>
        <select
          className="input preset-filled w-30"
          value={crewFilters.collection}
          onChange={(event) => setCrewFilters({ ...crewFilters, collection: event.currentTarget.value })}>
          <option value="">Collection</option>
          {collectionOptions}
        </select>
        <select
          className="input preset-filled w-22.5"
          value={crewFilters.rarity}
          onChange={(event) => setCrewFilters({ ...crewFilters, rarity: event.currentTarget.value })}>
          <option value="">Rarity</option>
          {rarityOptions}
        </select>
        <select
          className="input preset-filled w-min"
          value={crewFilters.currentStars}
          onChange={(event) => setCrewFilters({ ...crewFilters, currentStars: Number(event.currentTarget.value) })}>
          <option value="-1">Star</option>
          {crewStarsOptions}
        </select>
        <select
          className="input preset-filled w-40"
          value={crewFilters.shardsNeeded}
          onChange={(event) => setCrewFilters({ ...crewFilters, shardsNeeded: event.currentTarget.value })}>
          <option value="">Shards</option>
          <option value="above50">above 50</option>
          <option value="between21and50">between 21 and 50</option>
          <option value="between1and20">between 1 and 20</option>
          <option value="not0">still need shards</option>
          <option value="0">maxed</option>
        </select>
        <select
          className="input preset-filled w-min"
          value={crewFilters.universalBox}
          onChange={(event) => setCrewFilters({ ...crewFilters, universalBox: event.currentTarget.value })}>
          <option value="">Boxes</option>
          {freeOptions}
        </select>
      </div>
    );
  }
}
