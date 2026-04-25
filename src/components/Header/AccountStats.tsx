import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { buildIElements } from '../../compute/buildElementTable';

function sum(element: number[]) {
  return element.reduce((sum, cost) => sum + cost, 0);
}

export function AccountStats() {
  const { racers } = useContext(AppContext);
  const { crews } = useContext(AppContext);
  const iRacers = buildIElements(racers);
  const iCrews = buildIElements(crews);

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
    iRacers.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map((IRacer) => IRacer.vanityToGet)
  );
  const totalSeasonCoinsToGetInMPR = sum(iRacers.filter((racer) => racer.shardsToGetInMPL).map((IRacer) => IRacer.seasonCoinsToGet));

  const totalCrewShardsNeeded = sum(iCrews.map((ICrew) => ICrew.shardsNeededToMax));
  const totalUniBoxCrewShardsNeeded = sum(iCrews.filter((crew) => crew.universalBox === '✔').map((ICrew) => ICrew.shardsNeededToMax));
  const totalUniBoxShardsNeeded = totalUniBoxCrewShardsNeeded + totalUniBoxRacerShardsNeeded;

  // Calcul du nombre de pilotes à monter RMJ 40
  const rmj40Count = racers.filter((racer) => racer.highestMPL < 40).reduce((count) => count + 1, 0);

  // TEMPLATE
  return (
    <div className="AccountStats">
      <span>Account Stats</span>
      <p className="statsRow">Tune Coins required to have each Racer at 6 Stars : {totalTuneCoinsNeeded}</p>
      <p className="statsRow">Racer Shards left to collect : {totalRacerShardsNeeded}</p>
      <p className="statsRow">Crew Shards left to collect : {totalCrewShardsNeeded}</p>
      <p className="statsRow">Supercharge tokens left to collect : {totalSuperChargeTokensNeeded}</p>
      <p className="statsRow">
        Shards left in the Universal Box : {totalUniBoxShardsNeeded}
        <br />
        Racers : {totalUniBoxRacerShardsNeeded}
        <br />
        Crews : {totalUniBoxCrewShardsNeeded}
      </p>
      <p className="statsRow">
        Rewards you can collect in MPR :
        <br />
        Tune Coins : {totalTuneCoinsToGetInMPR}
        <br />
        Tokens : {totalTokensToGetInMPR}
        <br />
        Vanity Coins : {totalCosmeticToGetInMPR}
        <br />
        Season Coins : {totalSeasonCoinsToGetInMPR}
      </p>
      <p className="statsRow">Number of racers that need to reach MPR 40 : {rmj40Count}</p>
    </div>
  );
}
