import { useContext } from 'react';
import { AppContext, filtersDefault } from '../../context/AppContext';
import { getRacersBlank } from '../../data/collections';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

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

function buildCollectionOptions(t: TFunction) {
  return [...new Set(racersBlank.map((racer) => racer.collection))].map((option) => {
    return (
      <option key={option} value={option}>
        {t(`collection.${option}`)}
      </option>
    );
  });
}

function buildRarityOptions(t: TFunction) {
  return [...new Set(racersBlank.map((racer) => racer.rarity))].map((option) => {
    return (
      <option key={option} value={option}>
        {t(`filters.${option}`)}
      </option>
    );
  });
}

function buildRoleOptions(t: TFunction) {
  return [...new Set(racersBlank.map((racer) => racer.role))].map((option) => {
    return (
      <option key={option} value={option}>
        {t(`filters.${option}`)}
      </option>
    );
  });
}

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
  const { t } = useTranslation();
  const collectionOptions = buildCollectionOptions(t);
  const rarityOptions = buildRarityOptions(t);
  const roleOptions = buildRoleOptions(t);

  if (mode === 'racer') {
    return (
      <div className="flex gap-1 mx-auto">
        <button
          className="btn preset-filled"
          onClick={() => {
            setRacerFilters(filtersDefault.racer);
            console.log('lol');
          }}>
          {t('filters.reset')}
        </button>
        <input
          className="input preset-filled w-37.5"
          type="text"
          placeholder={t('filters.search')}
          value={racerFilters.name}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, name: event.currentTarget.value });
          }}
        />
        <select
          className="input preset-filled w-min"
          value={racerFilters.season}
          onChange={(event) => setRacerFilters({ ...racerFilters, season: Number(event.currentTarget.value) })}>
          <option value="-1">{t('filters.season')}</option>
          {seasonOptions}
        </select>
        <select
          className="input preset-filled w-30"
          value={racerFilters.collection}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, collection: event.currentTarget.value });
          }}>
          <option value="">{t('filters.collection')}</option>
          {collectionOptions}
        </select>
        <select
          className="input preset-filled w-22.5"
          value={racerFilters.rarity}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, rarity: event.currentTarget.value });
          }}>
          <option value="">{t('filters.rarity')}</option>
          {rarityOptions}
        </select>
        <select
          className="input preset-filled w-20"
          value={racerFilters.role}
          onChange={(event) => {
            setRacerFilters({ ...racerFilters, role: event.currentTarget.value });
          }}>
          <option value="">{t('filters.role')}</option>
          {roleOptions}
        </select>
        <select
          className="input preset-filled w-42"
          value={racerFilters.shardsNeeded}
          onChange={(event) => setRacerFilters({ ...racerFilters, shardsNeeded: event.currentTarget.value })}>
          <option value="">{t('filters.shardsNeeded')}</option>
          <option value="above50">{t('filters.50+')}</option>
          <option value="between21and50">{t('filters.between21and50')}</option>
          <option value="between1and20">{t('filters.between1and20')}</option>
          <option value="not0">{t('filters.stillNeedShards')}</option>
          <option value="0">{t('filters.maxed')}</option>
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.highestMPL}
          onChange={(event) => setRacerFilters({ ...racerFilters, highestMPL: event.currentTarget.value })}>
          <option value="">{t('filters.highestMPL')}</option>
          <option value="not40">{t('filters.not40')}</option>
          <option value="40">40</option>
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.currentStars}
          onChange={(event) => setRacerFilters({ ...racerFilters, currentStars: Number(event.currentTarget.value) })}>
          <option value="-1">{t('filters.currentStars')}</option>
          {racerStarsOptions}
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.universalBox}
          onChange={(event) => setRacerFilters({ ...racerFilters, universalBox: event.currentTarget.value })}>
          <option value="">{t('filters.boxes')}</option>
          {freeOptions}
        </select>
        <select
          className="input preset-filled w-min"
          value={racerFilters.superChargeTokensNeeded}
          onChange={(event) => setRacerFilters({ ...racerFilters, superChargeTokensNeeded: event.currentTarget.value })}>
          <option value="">{t('filters.superChargeTokens')}</option>
          <option value="40+">{t('filters.40+')}</option>
          <option value="40-">{t('filters.40-')}</option>
          <option value="0">{t('filters.maxed')}</option>
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
          {t('filters.reset')}
        </button>
        <input
          className="input preset-filled w-37.5"
          type="text"
          placeholder={t('filters.search')}
          value={crewFilters.name}
          onChange={(event) => {
            setCrewFilters({ ...crewFilters, name: event.currentTarget.value });
          }}
        />
        <select
          className="input preset-filled w-min"
          value={crewFilters.season}
          onChange={(event) => setCrewFilters({ ...crewFilters, season: Number(event.currentTarget.value) })}>
          <option value="-1">{t('filters.season')}</option>
          {seasonOptions}
        </select>
        <select
          className="input preset-filled w-30"
          value={crewFilters.collection}
          onChange={(event) => setCrewFilters({ ...crewFilters, collection: event.currentTarget.value })}>
          <option value="">{t('filters.collection')}</option>
          {collectionOptions}
        </select>
        <select
          className="input preset-filled w-22.5"
          value={crewFilters.rarity}
          onChange={(event) => setCrewFilters({ ...crewFilters, rarity: event.currentTarget.value })}>
          <option value="">{t('filters.rarity')}</option>
          {rarityOptions}
        </select>
        <select
          className="input preset-filled w-min"
          value={crewFilters.currentStars}
          onChange={(event) => setCrewFilters({ ...crewFilters, currentStars: Number(event.currentTarget.value) })}>
          <option value="-1">{t('filters.currentStars')}</option>
          {crewStarsOptions}
        </select>
        <select
          className="input preset-filled w-40"
          value={crewFilters.shardsNeeded}
          onChange={(event) => setCrewFilters({ ...crewFilters, shardsNeeded: event.currentTarget.value })}>
          <option value="">{t('filters.shardsNeeded')}</option>
          <option value="above50">{t('filters.50+')}</option>
          <option value="between21and50">{t('filters.between21and50')}</option>
          <option value="between1and20">{t('filters.between1and20')}</option>
          <option value="not0">{t('filters.stillNeedShards')}</option>
          <option value="0">{t('filters.maxed')}</option>
        </select>
        <select
          className="input preset-filled w-min"
          value={crewFilters.universalBox}
          onChange={(event) => setCrewFilters({ ...crewFilters, universalBox: event.currentTarget.value })}>
          <option value="">{t('filters.boxes')}</option>
          {freeOptions}
        </select>
      </div>
    );
  }
}
