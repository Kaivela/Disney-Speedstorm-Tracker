import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import { calculateSeasonCoinsToGet, formatBigNumber, sum } from '../../compute/calculs';

export function AccountStats() {
  const { racersSaved } = useContext(AppContext);
  const { crewsSaved } = useContext(AppContext);
  const iRacers = buildIElementsArray(racersSaved);
  const iCrews = buildIElementsArray(crewsSaved);

  // LOGIC
  const totalRacerShardsNeeded = sum(iRacers.map((IRacer) => IRacer.shardsNeededToMax));
  const totalTuneCoinsNeeded = sum(iRacers.map((IRacer) => IRacer.tuneCoinsNeededToMax));
  const totalSuperChargeTokensNeeded = sum(iRacers.filter((racer) => racer.superCharge).map((IRacer) => IRacer.superChargeTokensNeeded));
  const totalUniBoxRacerShardsNeeded = sum(iRacers.filter((racer) => racer.universalBox === '✔').map((IRacer) => IRacer.shardsNeededToMax));
  const totalTuneCoinsToGetInMPR = sum(
    iRacers.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map((IRacer) => IRacer.tuneCoinsToGet)
  );
  const totalTokensToGetInMPR = sum(
    iRacers.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map((IRacer) => IRacer.tokensToGet)
  );
  const totalCosmeticToGetInMPR = sum(
    iRacers.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map((IRacer) => IRacer.vanityCoinsToGet)
  );
  const totalSeasonCoinsToGetInMPR = sum(iRacers.filter((racer) => racer.shardsToGetInMPL).map(calculateSeasonCoinsToGet));
  const totalCrewShardsNeeded = sum(iCrews.map((ICrew) => ICrew.shardsNeededToMax));
  const totalUniBoxCrewShardsNeeded = sum(iCrews.filter((crew) => crew.universalBox === '✔').map((ICrew) => ICrew.shardsNeededToMax));
  const totalUniBoxShardsNeeded = totalUniBoxCrewShardsNeeded + totalUniBoxRacerShardsNeeded;
  const rmj40Count = racersSaved.filter((racer) => racer.highestMPL < 40).reduce((count) => count + 1, 0);

  // TEMPLATE
  return (
    <div className="AccountStats">
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
        Rewards you can collect in MPR :
        <br />
        Tune Coins : {formatBigNumber(totalTuneCoinsToGetInMPR)}
        <br />
        Tokens : {formatBigNumber(totalTokensToGetInMPR)}
        <br />
        Vanity Coins : {formatBigNumber(totalCosmeticToGetInMPR)}
        <br />
        Season Coins : {formatBigNumber(totalSeasonCoinsToGetInMPR)}
      </p>
      <p className="statsRow">Number of racers that need to reach MPR 40 : {formatBigNumber(rmj40Count)}</p>
    </div>
  );
}
