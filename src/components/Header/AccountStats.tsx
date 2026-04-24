import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { getAllCrews, getAllRacers } from '../../data/collections';
import {
  calculateCoinsNeeded,
  calculateCoinsNeededToNextStar,
  calculateCoinsToGet,
  calculateCosmeticToGet,
  calculateCrewShardsNeeded,
  calculateRacerShardsIfMaxMPL,
  calculateRacerShardsNeeded,
  calculateRacerShardsNeededToMax,
  calculateRacerShardsToGet,
  calculateRacerSuperChargeTokenSNeeded,
  calculateSeasonCoinsToGet,
  calculateTokensToGet,
} from '../../compute/calculs';
import type { CrewSaved, RacerComputed, RacerSaved } from '../../types/types';

const racersBlank = getAllRacers();
const crewsBlank = getAllCrews();

// function createFusedRacersTable(racers: RacerSaved[]) {
//   return racers.map((racerSaved) => {
//     const racerBlank = racersBlank.find((racerBlank) => racerBlank.name === racerSaved.name);
//     // to prevent racerBlank from being undefined
//     if (!racerBlank) throw new Error(`No racer blank found for name: ${racerSaved.name}`);
//     return {
//       ...racerBlank,
//       ...racerSaved,
//     };
//   });
// }

function createIRacerTable(racers: RacerSaved[]) {
  // LOGIC
  const racersSaved = racers.map((racerSaved) => {
    const racerBlank = racersBlank.find((racerBlank) => racerBlank.name === racerSaved.name);
    // to prevent racerBlank from being undefined
    if (!racerBlank) throw new Error(`No racer blank found for name: ${racerSaved.name}`);
    return {
      ...racerBlank,
      ...racerSaved,
    };
  });
  return racersSaved.map((racerBlankWithSavedData) => {
    const racerComputed: RacerComputed = {
      tuneCoinsNeededToMax: calculateCoinsNeeded(racerBlankWithSavedData),
      shardsNeededToMax: calculateRacerShardsNeeded(racerBlankWithSavedData),
      shardsToGetInMPL: calculateRacerShardsToGet(racerBlankWithSavedData),
      shardsNeededIfMaxMPL: calculateRacerShardsIfMaxMPL(racerBlankWithSavedData),
      superChargeTokensNeeded: racerBlankWithSavedData.superCharge ? calculateRacerSuperChargeTokenSNeeded(racerBlankWithSavedData) : 0,
      tuneCoinsNeededToNextStar: calculateCoinsNeededToNextStar(racerBlankWithSavedData),
      shardsNeededToNextStar: calculateRacerShardsNeededToMax(racerBlankWithSavedData),
    };
    const IRacerTable = { ...{ ...racerBlankWithSavedData, ...racerComputed } };
    return IRacerTable;
  });
}

function createFusedCrewsTable(crews: CrewSaved[]) {
  return crews.map((crewSaved) => {
    const CrewBlank = crewsBlank.find((crewBlank) => crewBlank.name === crewSaved.name);
    // to prevent crewBlank from being undefined
    if (!CrewBlank) throw new Error(`No crew blank found for name: ${crewSaved.name}`);
    return {
      ...CrewBlank,
      ...crewSaved,
    };
  });
}

function sum(element: number[]) {
  return element.reduce((sum, cost) => sum + cost, 0);
}

export function AccountStats() {
  // LOGIC
  const { racers } = useContext(AppContext);
  const { crews } = useContext(AppContext);

  const IRacerTable = createIRacerTable(racers);
  const crewsFused = createFusedCrewsTable(crews);

  const allRacerShardsNeededTable = IRacerTable.map(calculateRacerShardsNeeded);
  const allTuneCoinsNeededTable = IRacerTable.map(calculateCoinsNeeded);
  const allCrewShardsNeededTable = crewsFused.map(calculateCrewShardsNeeded);
  const allSuperChargeTokensNeededTable = IRacerTable.filter((racer) => racer.superCharge).map(calculateRacerSuperChargeTokenSNeeded);
  const allUniBoxRacerShardsNeededTable = IRacerTable.filter((racer) => racer.universalBox === '✔').map(calculateRacerShardsNeeded);
  const allUniBoxCrewShardsNeededTable = crewsFused.filter((crew) => crew.universalBox === '✔').map(calculateCrewShardsNeeded);
  const allTuneCoinsToGetInMPRTable = IRacerTable.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map(calculateCoinsToGet);
  const allTokensToGetInMPRTable = IRacerTable.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map(calculateTokensToGet);
  const allCosmeticToGetInMPRTable = IRacerTable.filter((racer) => racer.currentStars > 0 || racer.currentStarFragment > 0).map(
    calculateCosmeticToGet
  );
  const allSeasonCoinsToGetInMPR = IRacerTable.filter((racer) => racer.shardsToGetInMPL).map(calculateSeasonCoinsToGet);

  // Calcul du nombre de pilotes à monter RMJ 40
  let rmj40Count = 0;
  racers.forEach((racer) => {
    if (racer.highestMPL < 40) {
      rmj40Count++;
    }
  });

  // crewsFused.map((crew) => {
  //   if (crew.universalBox === '✔') {
  //     const valeur = calculateCrewShardsNeeded(crew);
  //     return valeur;
  //   } else {
  //     return 0;
  //   }
  // });

  // if (racer.shardsToGetInMPL)

  const totalTuneCoinsNeeded = sum(allTuneCoinsNeededTable);
  const totalRacerShardsNeeded = sum(allRacerShardsNeededTable);
  const totalCrewShardsNeeded = sum(allCrewShardsNeededTable);
  const totalSuperChargeTokensNeeded = sum(allSuperChargeTokensNeededTable);
  const totalUniBoxRacerShardsNeeded = sum(allUniBoxRacerShardsNeededTable);
  const totalUniBoxCrewShardsNeeded = sum(allUniBoxCrewShardsNeededTable);
  const totalUniBoxShardsNeeded = totalUniBoxCrewShardsNeeded + totalUniBoxRacerShardsNeeded;
  const totalTuneCoinsToGetInMPR = sum(allTuneCoinsToGetInMPRTable);
  const totalTokensToGetInMPR = sum(allTokensToGetInMPRTable);
  const totalCosmeticToGetInMPR = sum(allCosmeticToGetInMPRTable);
  const totalSeasonCoinsToGetInMPR = sum(allSeasonCoinsToGetInMPR);

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
