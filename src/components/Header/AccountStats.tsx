import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import {
  calculateCoinsNeeded,
  calculateCoinsToGet,
  calculateCosmeticToGet,
  calculateRacerShardsToGet,
  calculateRacerSuperChargeTokenSNeeded,
  calculateSeasonCoinsToGet,
  calculateTokensToGet,
  formatBigNumber,
  sum,
} from '../../compute/calculs';
import { useTranslation } from 'react-i18next';

export function AccountStats() {
  const { racersSaved, crewsSaved, settings } = useContext(AppContext);
  const iRacers = buildIElementsArray(racersSaved);
  const iCrews = buildIElementsArray(crewsSaved);
  const { t } = useTranslation();

  // LOGIC
  const totalRacerShardsNeeded = sum(iRacers.map((IRacer) => IRacer.shardsNeededToMax));
  const totalTuneCoinsNeeded = sum(iRacers.map((IRacer) => calculateCoinsNeeded(IRacer, settings.starGoal)));
  const totalSuperChargeTokensNeeded = sum(
    iRacers.filter((racer) => racer.superCharge).map((IRacer) => calculateRacerSuperChargeTokenSNeeded(IRacer, settings.superChargeLevelGoal))
  );
  const totalUniBoxRacerShardsNeeded = sum(iRacers.filter((racer) => racer.universalBox === '✔').map((IRacer) => IRacer.shardsNeededToMax));
  const totalTuneCoinsToGetInMPL = sum(
    iRacers
      .filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0 || racer.currentShards >= 10)
      .map((IRacer) => calculateCoinsToGet(IRacer, settings.MPLGoal))
  );
  const totalTokensToGetInMPL = sum(
    iRacers
      .filter((racer) => racer.currentMPL > 0 || racer.currentStarFragment > 0 || racer.currentShards >= 10)
      .map((IRacer) => calculateTokensToGet(IRacer, settings.MPLGoal))
  );
  const totalCosmeticToGetInMPL = sum(
    iRacers
      .filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0 || racer.currentShards >= 10)
      .map((IRacer) => calculateCosmeticToGet(IRacer, settings.MPLGoal))
  );
  const totalSeasonCoinsToGetInMPL = sum(
    iRacers
      .filter((racer) => racer.shardsToGetInMPL)
      .map((racer) => {
        return calculateSeasonCoinsToGet(racer, calculateRacerShardsToGet(racer, settings.MPLGoal));
      })
  );
  const totalCrewShardsNeeded = sum(iCrews.map((ICrew) => ICrew.shardsNeededToMax));
  const totalUniBoxCrewShardsNeeded = sum(iCrews.filter((crew) => crew.universalBox === '✔').map((ICrew) => ICrew.shardsNeededToMax));
  const totalUniBoxShardsNeeded = totalUniBoxCrewShardsNeeded + totalUniBoxRacerShardsNeeded;
  const MPL40Count = racersSaved
    .filter(
      (racer) =>
        (racer.currentStars > 0 && racer.highestMPL < 40) ||
        (racer.currentStarFragment > 0 && racer.highestMPL < 40) ||
        (racer.currentShards >= 10 && racer.highestMPL < 40)
    )
    .reduce((count) => count + 1, 0);

  // TEMPLATE
  return (
    <div className="rounded-2xl bg-black/60 py-4 px-8 text-sm flex flex-col gap-0.5 m-auto w-fit backdrop-blur-xs">
      <span>{t('stats.account')}</span>
      <p className="statsRow">
        {t('stats.tuneCoinsRequired', { starsGoal: settings.starGoal, totalTuneCoinsNeeded: formatBigNumber(totalTuneCoinsNeeded) })}
      </p>
      <p className="statsRow">{t('stats.racerShardsLeft', { totalRacerShardsNeeded: formatBigNumber(totalRacerShardsNeeded) })}</p>
      <p className="statsRow">{t('stats.crewShardsLeft', { totalCrewShardsNeeded: formatBigNumber(totalCrewShardsNeeded) })}</p>
      <p className="statsRow">{t('stats.superChargeTokensLeft', { totalSuperChargeTokensNeeded: formatBigNumber(totalSuperChargeTokensNeeded) })}</p>
      <p className="statsRow">
        {t('stats.shardsLeftInUniBox', { totalUniBoxShardsNeeded: formatBigNumber(totalUniBoxShardsNeeded) })}
        <br />
        {t('stats.racers', { totalUniBoxRacerShardsNeeded: formatBigNumber(totalUniBoxRacerShardsNeeded) })}
        <br />
        {t('stats.crews', { totalUniBoxCrewShardsNeeded: formatBigNumber(totalUniBoxCrewShardsNeeded) })}
      </p>
      <p className="statsRow">
        {t('stats.rewards')}
        <br />
        {t('stats.tuneCoins', { total: formatBigNumber(totalTuneCoinsToGetInMPL) })}
        <br />
        {t('stats.tokens', { total: formatBigNumber(totalTokensToGetInMPL) })}
        <br />
        {t('stats.vanity', { total: formatBigNumber(totalCosmeticToGetInMPL) })}
        <br />
        {t('stats.seasonCoins', { total: formatBigNumber(totalSeasonCoinsToGetInMPL) })}
      </p>
      <p className="statsRow">{t('stats.MPL40Left', { MPLGoal: settings.MPLGoal, MPL40Count: formatBigNumber(MPL40Count) })}</p>
    </div>
  );
}
