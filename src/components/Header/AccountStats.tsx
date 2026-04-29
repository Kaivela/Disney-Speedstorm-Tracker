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

export function AccountStats() {
  const { racersSaved, crewsSaved, settings } = useContext(AppContext);
  const iRacers = buildIElementsArray(racersSaved);
  const iCrews = buildIElementsArray(crewsSaved);

  // LOGIC
  const totalRacerShardsNeeded = sum(iRacers.map((IRacer) => IRacer.shardsNeededToMax));
  const totalTuneCoinsNeeded = sum(iRacers.map((IRacer) => calculateCoinsNeeded(IRacer, settings.starGoal)));
  const totalSuperChargeTokensNeeded = sum(
    iRacers.filter((racer) => racer.superCharge).map((IRacer) => calculateRacerSuperChargeTokenSNeeded(IRacer, settings.superChargeLevelGoal))
  );
  const totalUniBoxRacerShardsNeeded = sum(iRacers.filter((racer) => racer.universalBox === '✔').map((IRacer) => IRacer.shardsNeededToMax));
  const totalTuneCoinsToGetInMPL = sum(
    iRacers.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map((IRacer) => calculateCoinsToGet(IRacer, settings.MPLGoal))
  );
  const totalTokensToGetInMPL = sum(
    iRacers.filter((racer) => racer.currentMPL > 0 || racer.currentStarFragment > 0).map((IRacer) => calculateTokensToGet(IRacer, settings.MPLGoal))
  );
  const totalCosmeticToGetInMPL = sum(
    iRacers
      .filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0)
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
  const MPL40Count = racersSaved.filter((racer) => racer.highestMPL < 40).reduce((count) => count + 1, 0);

  // TEMPLATE
  return (
    <div className="rounded-2xl bg-black/60 py-4 px-8 text-sm flex flex-col gap-0.5 m-auto w-fit backdrop-blur-xs">
      <span>Account Stats</span>
      <p className="statsRow">Tune Coins required to have each Racer at 6 Stars : {formatBigNumber(totalTuneCoinsNeeded)}</p>
      <p className="statsRow">Racer Shards left to collect : {formatBigNumber(totalRacerShardsNeeded)}</p>
      <p className="statsRow">Crew Shards left to collect : {formatBigNumber(totalCrewShardsNeeded)}</p>
      <p className="statsRow">Supercharge tokens left to collect : {formatBigNumber(totalSuperChargeTokensNeeded)}</p>
      <p className="statsRow">
        Shards left in the Universal Box : {formatBigNumber(totalUniBoxShardsNeeded)}
        <br />
        Racers : {formatBigNumber(totalUniBoxRacerShardsNeeded)}
        <br />
        Crews : {formatBigNumber(totalUniBoxCrewShardsNeeded)}
      </p>
      <p className="statsRow">
        Rewards you can collect in MPL :
        <br />
        Tune Coins : {formatBigNumber(totalTuneCoinsToGetInMPL)}
        <br />
        Tokens : {formatBigNumber(totalTokensToGetInMPL)}
        <br />
        Vanity Coins : {formatBigNumber(totalCosmeticToGetInMPL)}
        <br />
        Season Coins : {formatBigNumber(totalSeasonCoinsToGetInMPL)}
      </p>
      <p className="statsRow">
        Number of racers that need to reach MPL {settings.MPLGoal} : {formatBigNumber(MPL40Count)}
      </p>
    </div>
  );
}
