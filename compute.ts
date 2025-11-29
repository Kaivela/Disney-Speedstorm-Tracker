import {
  pilotShardCosts,
  coinsCosts,
  rmjOldCoinsReward,
  rmjNewCoinsReward,
  rmjS10CoinsReward,
  rmjS10MidCoinsReward,
  rmjShardsReward,
  rmjOldTokensReward,
  rmjNewTokensReward,
  rmjCosmeticReward,
  normalCrewShardCost,
  epicCrewShardCost,
  starLevel,
  superChargeCost
} from "./data/data";
import { createGetTrad } from "./trad";
import crewsBlank from "./data/crews/crews_blank.json";
import pilotsBlank from "./data/pilots/pilots_blank.json";
import * as HTML from "./ElementById";
import { Pilot, Crew, Language } from "./types";

const superChargedPilotsName = ["Mickey Mouse", "Elizabeth Swann", "Hans", "Kristoff", "Lilo", "Donald Duck", "Mike Wazowski", "Meg", "Jessie", "Stitch", "Hercules", "Goofy", "Elsa", "EVE", "Belle", "Ortensia", "Mulan", "Celia Mae", "Steamboat Pete", "Fear", "Shang", "Vanellope"]

// Fonction pour calculer les shards nécessaires en fonction du niveau actuel
function calculatePilotShardsNeeded(currentLevel: number, currentShards: number, levelGoal: number): number {
  let totalShardsNeeded = 0;

  for (let level = currentLevel + 1; level <= levelGoal; level++) {
    if (level <= pilotShardCosts.length) {
      totalShardsNeeded += pilotShardCosts[level - 1];
    }
  }

  return Math.max(totalShardsNeeded - currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// Fonction pour calculer les superShards nécessaires pour activer la superCharge
function calculatePilotSuperShards(name: string, currentStars: number, currentSuperShards: number | string): string | number {
  const superChargedPilots = superChargedPilotsName.includes(name);

  if (!superChargedPilots) {
    return "❌";
  }

  if (currentStars === 7) {
    return "✔";
  }

  return currentSuperShards;
}

//Fonction pour calculer le nombre de supershards nécéssaire a collecter au total
function calculatePilotSuperShardsNeeded(currentStars: number, currentSuperShards: number): number {
  let totalSuperShardsNeeded = 0;

  for (let star = currentStars + 1; star <= 7; star++) {
    if (star <= superChargeCost.length) {
      totalSuperShardsNeeded += superChargeCost[star - 1];
    }
  }

  return Math.max(totalSuperShardsNeeded - currentSuperShards, 0)
}

// Fonction pour calculer les shards nécéssaires si le joueur farm le RMJ 38
function calculatePilotShardIfMaxMPR(shardsNeeded: number, shardsToGet: number): number {
  const shardIfMaxMPR = shardsNeeded - shardsToGet;
  return Math.max(shardIfMaxMPR, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// Fonction pour calculer les shards nécéssaires pour gagner la prochaine star
function calculatePilotShardsNextStar(currentLevel: number, currentShards: number, currentStars: number): number {
  let shardsToNextStar = 0;
  const nextStarLevel = starLevel[currentStars - 1];
  if (currentStars === 0) {
    shardsToNextStar = 10 - currentShards;
  }
  if (currentStars >= 1 && currentStars < 5) {
    for (let level = currentLevel + 1; level <= nextStarLevel; level++) {
      if (level <= pilotShardCosts.length) {
        shardsToNextStar += pilotShardCosts[level - 1];
      }
    }

    return Math.max(shardsToNextStar - currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
  }
  return 0;
}

// Fonction pour calculer les coins nécessaires en fonction du niveau actuel
function calculateCoinsNeeded(currentLevel: number, levelGoal: number): number {
  let totalCoinsNeeded = 0;

  for (let level = currentLevel + 1; level <= levelGoal; level++) {
    if (level <= coinsCosts.length) {
      totalCoinsNeeded += coinsCosts[level - 1];
    }
  }

  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les coins nécessaires pour gagner la prochaine star
function calculateCoinsNextStar(currentLevel: number, currentStars: number): number {
  let coinsNextStar = 0;
  const nextStarLevel = starLevel[currentStars - 1];
  if (currentStars >= 1 && currentStars < 5) {
    for (let level = currentLevel + 1; level <= nextStarLevel; level++) {
      if (level <= coinsCosts.length) {
        coinsNextStar += coinsCosts[level - 1];
      }
    }

    return Math.max(coinsNextStar, 0); // Assure que les coins nécessaires ne sont pas négatifs
  }
  return 0;
}

// Fonction pour calculer les coins nécessaires pour le goal en fonction du niveau actuel
function calculateCoinsNeededForGoal(currentLevel: number, levelGoal: number, star: number): number {
  let totalCoinsNeeded = 0;
  if (star > 0) {
    for (let level = currentLevel + 1; level <= levelGoal; level++) {
      if (level <= coinsCosts.length) {
        totalCoinsNeeded += coinsCosts[level - 1];
      }
    }
  }

  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// function pour calculer les CoinsToGet en fonction du HighestRMJ
function calculateCoinsToGet(highestRMJ: number, rmjCoin: string, goal: number, star: number): number {
  let totalCoinsToGet = 0;
  let table: number[] = [];

  if (rmjCoin === "old") {
    table = rmjOldCoinsReward;
  } else if (rmjCoin === "new") {
    table = rmjNewCoinsReward;
  } else if (rmjCoin === "S10") {
    table = rmjS10CoinsReward;
  } else if (rmjCoin === "S10Mid") {
    table = rmjS10MidCoinsReward;
  }
  if (star > 0) {
    for (let rmj = highestRMJ + 1; rmj <= goal; rmj++) {
      if (rmj <= table.length) {
        totalCoinsToGet += table[rmj - 1];
      }
    }
  }

  return Math.max(totalCoinsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les coins nécessaires en fonction du HighestRMJ
function calculatePilotShardsToGet(highestRMJ: number, goal: number): number {
  let totalShardsToGet = 0;

  for (let rmj = highestRMJ + 1; rmj <= goal; rmj++) {
    if (rmj <= rmjShardsReward.length) {
      totalShardsToGet += rmjShardsReward[rmj - 1];
    }
  }

  return Math.max(totalShardsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// function pour calculer les TokensToGet en fonction du HighestRMJ
function calculateTokensToGet(highestRMJ: number, rmjTokenOld: boolean, goal: number, star: number): number {
  let totalTokensToGet = 0;

  if (star > 0) {
    if (rmjTokenOld) {
      for (let rmj = highestRMJ + 1; rmj <= goal; rmj++) {
        if (rmj <= rmjOldTokensReward.length) {
          totalTokensToGet += rmjOldTokensReward[rmj - 1];
        }
      }
    } else {
      for (let rmj = highestRMJ + 1; rmj <= goal; rmj++) {
        if (rmj <= rmjNewTokensReward.length) {
          totalTokensToGet += rmjNewTokensReward[rmj - 1];
        }
      }
    }
  }

  return Math.max(totalTokensToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les cosmeticToGet en fonction du HighestRMJ
function calculateCosmeticToGet(highestRMJ: number, goal: number, star: number): number {
  let cosmeticToGet = 0;
  if (star > 0) {
    for (let rmj = highestRMJ + 1; rmj <= goal; rmj++) {
      if (rmj <= rmjCosmeticReward.length) {
        cosmeticToGet += rmjCosmeticReward[rmj - 1];
      }
    }
  }

  return Math.max(cosmeticToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

function calculateCrewShardsNeeded(crew: Crew): number {
  let totalShardsNeeded = 0;
  if (crew.rarity === "Epic") {
    for (let star = crew.currentStars + 1; star <= 5; star++) {
      if (star <= epicCrewShardCost.length) {
        totalShardsNeeded += epicCrewShardCost[star - 1];
      }
    }
  } else {
    for (let star = crew.currentStars + 1; star <= 5; star++) {
      if (star <= normalCrewShardCost.length) {
        totalShardsNeeded += normalCrewShardCost[star - 1];
      }
    }
  }

  return Math.max(totalShardsNeeded - crew.currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// Fonction pour calculer le total des shards nécéssaire pour maxer chaque équipier commun qui est gratuit
function calculateFreeCrewShardsNeeded(crews: Crew[]) {
  let totalCommonShardsNeeded = 0;
  let totalRareShardsNeeded = 0;
  let totalEpicShardsNeeded = 0;
  crews.forEach((crew) => {
    const crewBlank = crewsBlank.find((crewBlank) => crewBlank.name === crew.name);
    if (crewBlank) {
      if (crew.rarity === "Common" && crewBlank.universalBox === true) {
        crew.shardsNeeded = calculateCrewShardsNeeded(crew);
        totalCommonShardsNeeded += crew.shardsNeeded;
      }
      if (crew.rarity === "Rare" && crewBlank.universalBox === true) {
        crew.shardsNeeded = calculateCrewShardsNeeded(crew);
        totalRareShardsNeeded += crew.shardsNeeded;
      }
      if (crew.rarity === "Epic" && crewBlank.universalBox === true) {
        crew.shardsNeeded = calculateCrewShardsNeeded(crew);
        totalEpicShardsNeeded += crew.shardsNeeded;
      }
    }
  });

  return {
    totalCommonShardsNeeded: totalCommonShardsNeeded,
    totalRareShardsNeeded: totalRareShardsNeeded,
    totalEpicShardsNeeded: totalEpicShardsNeeded,
  };
}

// Fonction pour calculer le total des shards nécéssaire pour maxer chaque pilote
function calculateTotal(lang: Language, goal: number, levelGoal: number) {
  const getTrad = createGetTrad(lang);
  const crews = (JSON.parse(localStorage.getItem("crews") || "[]") as Crew[]);
  const pilots = (JSON.parse(localStorage.getItem("pilots") || "[]") as Pilot[]);
  let allCoins = 0;
  let allShardsNeeded = 0;
  let seasonShardsNeeded = 0;
  let midSeasonShardsNeeded = 0;
  let allRegularShards = 0;
  let universalBoxCount = 0;
  let shardsToGet = 0;
  let seasonCoins = 0;
  let upgradeCoins = 0;
  let tokensToGet = 0;
  let cosmeticToGet = 0;
  let allFreeShards = 0;
  let allSuperShardsNeeded = 0;

  pilots.forEach((pilot) => {
    const pilotBlank = pilotsBlank.find((pilotBlank) => pilotBlank.name === pilot.name);

    if (pilotBlank) {
      // Calculer les SuperShardsNeeded pour chaque pilote
      const superChargedPilots = superChargedPilotsName.includes(pilot.name);

      if (superChargedPilots) {
        pilot.superShardsNeeded = calculatePilotSuperShardsNeeded(pilot.currentStars, pilot.currentSuperShards);
        allSuperShardsNeeded = allSuperShardsNeeded + pilot.superShardsNeeded;
      }

      // Calculer les coinsNeeded pour chaque pilote
      pilot.coinsNeeded = calculateCoinsNeededForGoal(pilot.currentLevel, levelGoal, pilot.currentStars);
      allCoins = allCoins + pilot.coinsNeeded;

      // Calculer les shardsNeeded pour chaque pilote
      pilot.shardsNeeded = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards, 50);
      allShardsNeeded = allShardsNeeded + pilot.shardsNeeded;

      if (pilotBlank.universalBox === true) {
        seasonShardsNeeded += pilot.shardsNeeded;
      } else {
        midSeasonShardsNeeded += pilot.shardsNeeded;
      }

      // Calculer les shardsNeeded pour chaque pilote non saisonier
      if (pilot.universalBox === true) {
        pilot.shardsNeeded = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards, 50);
        allRegularShards = allRegularShards + pilot.shardsNeeded;
      }

      // Calculer les shardsToGet pour chaque pilote
      if (pilot.shardsNeeded === 0) {
        pilot.shardsToGet = calculatePilotShardsToGet(pilot.highestRMJ, goal);
        shardsToGet = shardsToGet + pilot.shardsToGet;
      }

      // Calculer les seasonCoins available in rmj
      if (pilot.shardsToGet) {
        if (pilot.rarity === "Common") {
          seasonCoins = seasonCoins + pilot.shardsToGet * 400;
        }
        if (pilot.rarity === "Rare") {
          seasonCoins = seasonCoins + pilot.shardsToGet * 500;
        }
        if (pilot.rarity === "Epic") {
          seasonCoins = seasonCoins + pilot.shardsToGet * 1000;
        }
      }

      // Calculer les upgradeCoins available in rmj
      pilot.upgradeCoins = calculateCoinsToGet(pilot.highestRMJ, pilotBlank.rmjCoin, goal, pilot.currentStars);
      upgradeCoins = upgradeCoins + pilot.upgradeCoins;

      // Calculer les Tokens available in rmj
      pilot.tokensToGet = calculateTokensToGet(pilot.highestRMJ, pilotBlank.rmjTokenOld, goal, pilot.currentStars);
      tokensToGet = tokensToGet + pilot.tokensToGet;

      // Calculer les cosmetic available in rmj
      pilot.cosmeticToGet = calculateCosmeticToGet(pilot.highestRMJ, goal, pilot.currentStars);
      cosmeticToGet = cosmeticToGet + pilot.cosmeticToGet;
    }
  });

  const totalFreeCrewShardsNeeded = calculateFreeCrewShardsNeeded(crews);

  allFreeShards =
    totalFreeCrewShardsNeeded.totalCommonShardsNeeded +
    totalFreeCrewShardsNeeded.totalRareShardsNeeded +
    totalFreeCrewShardsNeeded.totalEpicShardsNeeded +
    allRegularShards;
  // Calculer les universalBoxCount
  universalBoxCount = Math.ceil(allFreeShards / 3);
  const uniBoxCost = Math.ceil(universalBoxCount / 10) * 90000

  const totalFreeCrewShardsNeededCalculated = totalFreeCrewShardsNeeded.totalCommonShardsNeeded +
    totalFreeCrewShardsNeeded.totalRareShardsNeeded +
    totalFreeCrewShardsNeeded.totalEpicShardsNeeded

  // formater les nombres avec des points pour l'affichage
  const allCoinsStr = formatNumberWithDots(allCoins);
  const allShardsNeededStr = formatNumberWithDots(allShardsNeeded);
  const seasonShardsNeededStr = formatNumberWithDots(seasonShardsNeeded);
  const midSeasonShardsNeededStr = formatNumberWithDots(midSeasonShardsNeeded);
  const allFreeShardsStr = formatNumberWithDots(allFreeShards);
  const universalBoxCountStr = formatNumberWithDots(universalBoxCount);
  const seasonCoinsStr = formatNumberWithDots(seasonCoins);
  const upgradeCoinsStr = formatNumberWithDots(upgradeCoins);
  const tokensToGetStr = formatNumberWithDots(tokensToGet);
  const cosmeticToGetStr = formatNumberWithDots(cosmeticToGet);
  const totalCommonShardsNeededStr =
    formatNumberWithDots(totalFreeCrewShardsNeeded.totalCommonShardsNeeded);
  const totalRareShardsNeededStr =
    formatNumberWithDots(totalFreeCrewShardsNeeded.totalRareShardsNeeded);
  const totalEpicShardsNeededStr =
    formatNumberWithDots(totalFreeCrewShardsNeeded.totalEpicShardsNeeded);
  const totalFreeCrewShardsNeededCalculatedStr = formatNumberWithDots(totalFreeCrewShardsNeededCalculated);

  // Afficher les résultats dans le HTML
  HTML.allCoins.textContent = allCoinsStr;
  HTML.levelGoal.textContent = levelGoal + " : ";
  HTML.allShards.textContent = allShardsNeededStr;
  HTML.seasonShards.textContent = seasonShardsNeededStr;
  HTML.midSeasonShards.textContent = midSeasonShardsNeededStr;
  HTML.allSuperShards.textContent = allSuperShardsNeeded.toString();
  HTML.allRegularShards.textContent = allFreeShardsStr;
  HTML.universalBoxCount.textContent = universalBoxCountStr;
  HTML.uniBoxCost.textContent = formatNumberWithDots(uniBoxCost);
  HTML.seasonCoins.textContent = seasonCoinsStr;
  HTML.upgradeCoins.textContent = upgradeCoinsStr;
  HTML.tokens.textContent = tokensToGetStr;
  HTML.cosmetic.textContent = cosmeticToGetStr;
  HTML.crewFreeShards.textContent =
    getTrad("Common") +
    ": " +
    totalCommonShardsNeededStr +
    " " +
    getTrad("Rare") +
    ": " +
    totalRareShardsNeededStr +
    " " +
    getTrad("Epic") +
    ": " +
    totalEpicShardsNeededStr +
    " Total : " +
    totalFreeCrewShardsNeededCalculatedStr;
  HTML.crewSeasonCoinsNeeded.textContent = formatNumberWithDots(calculateTotalSeasonCoinsForCrews().totalCoins);
  HTML.crewSeasonNumber.textContent = formatNumberWithDots(calculateTotalSeasonCoinsForCrews().totalCrew);

  // Calcul du nombre de pilotes à monter RMJ 40
  let rmj40Count = 0;
  pilots.forEach((pilot) => {
    if (pilot.highestRMJ < 40) {
      rmj40Count++;
    }
  });
  HTML.rmj40Count.textContent = rmj40Count.toString();
}

// Fonction pour mettre un point tous les 3 caractères pour les calculs a afficher
function formatNumberWithDots(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Fonction pour reset les données du formulaire caclPilotLevelGoal
function resetForm() {
  HTML.calcPilotName.value = "";
  HTML.calcPilotLevelGoal.value = "";
  HTML.calcResult.textContent = "";
  HTML.calcResult.style.display = "none";
}

function calculateRacerGoal(lang: Language) {
  const getTrad = createGetTrad(lang);
  const racerName = HTML.calcPilotName.value;
  const racerLevelGoal = parseInt(HTML.calcPilotLevelGoal.value, 10);
  const pilots = (JSON.parse(localStorage.getItem("pilots") || "[]") as Pilot[]);
  HTML.calcResult.style.display = "block";


  const pilot = pilots.find((pilot) => pilot.name === racerName);
  if (!pilot) {
    HTML.calcResult.textContent = getTrad("pilot_not_found");
    return;
  }

  const racer = getTrad("racer");
  const already1 = getTrad("already1");
  const already2 = getTrad("already2");
  const more = getTrad("more");
  const reach = getTrad("reach");
  const need = getTrad("need");
  const shards = getTrad("shards");
  const farm1 = getTrad("farm1");
  const farm2 = getTrad("farm2");
  const farm3 = getTrad("farm3");
  const boost = getTrad("boost");
  const rmj = getTrad("rmj");
  const and = getTrad("and");
  const upCoins = getTrad("upCoins");

  const coinsNeeded = calculateCoinsNeeded(pilot.currentLevel, racerLevelGoal);
  const shardNeeded = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards, racerLevelGoal);
  const shardsToGet = calculatePilotShardsToGet(pilot.highestRMJ, racerLevelGoal);
  const shardsToFarm = shardNeeded - shardsToGet

  if (pilot.currentLevel >= racerLevelGoal) {
    HTML.calcResult.innerHTML =
      `${racer} ${racerName} ${already1} ${racerLevelGoal} ${more}`;
  } else if (shardNeeded <= 0) {
    HTML.calcResult.innerHTML =
      `${racer} ${racerName} ${already2} ${racerLevelGoal}
      <br>${need} ${coinsNeeded} ${upCoins}`
  } else if (shardNeeded > 0 && shardNeeded < 5 && shardsToGet > 0) {
    HTML.calcResult.innerHTML =
      `${reach} ${racerLevelGoal} ${need} ${shardNeeded} ${shards}
      <br>${farm1} ${shardNeeded} ${shards} ${boost} ${farm2} ${shardsToGet} ${rmj}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  } else if (shardsToFarm <= 0) {
    HTML.calcResult.innerHTML =
      `${reach} ${racerLevelGoal} ${need} ${shardNeeded} ${shards}
      <br>${shardsToGet} ${shards} ${rmj}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  } else if (shardsToGet <= 0) {
    HTML.calcResult.innerHTML =
      `${reach} ${racerLevelGoal} ${need} ${shardNeeded} ${shards}
      <br>${shardsToFarm} ${farm3} ${boost}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  } else {
    HTML.calcResult.innerHTML =
      `${reach} ${racerLevelGoal} ${need} ${shardNeeded} ${shards}
      <br>${shardsToGet} ${shards} ${rmj} ${and} ${shardsToFarm} ${farm3} ${boost}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  }
}

function calculateTotalSeasonCoinsForCrews() {
  const crews = (JSON.parse(localStorage.getItem("crews") || "[]") as Crew[]);
  // Filter for Walt Disney World and Wall-E, and only Common/Rare
  const targetCollections = ["Walt Disney World", "WALL-E"];
  let totalCoins = 0;
  let totalCrew = 0

  crews.forEach(crew => {
    const isTargetCollection = targetCollections.includes(crew.franchise);
    if (!isTargetCollection) return;
    if (crew.rarity === "Common") {
      totalCoins += calculateCrewShardsNeeded(crew) * 3900;
      totalCrew += calculateCrewShardsNeeded(crew);
    } else if (crew.rarity === "Rare") {
      totalCoins += calculateCrewShardsNeeded(crew) * 4600;
      totalCrew += calculateCrewShardsNeeded(crew);
    }
    // Ignore Epic
  });

  return { totalCoins, totalCrew };
}

//for each 2500 coins in the end of season calc you get 1 token
function calculateTokens() {
  const endOfSeasonCoins = parseInt(HTML.endOfSeasonCoins.value, 10);
  const tokens = Math.floor(endOfSeasonCoins / 2500);
  HTML.endOfSeasonCoinsResult.textContent = "Tokens : " + tokens;
  HTML.endOfSeasonCoinsResult.style.display = "block"
}

export {
  calculatePilotShardsNeeded,
  calculatePilotShardsNextStar,
  calculateCoinsNeeded,
  calculateCoinsNeededForGoal,
  calculatePilotShardsToGet,
  calculateCrewShardsNeeded,
  calculateTotal,
  calculateCoinsNextStar,
  calculatePilotShardIfMaxMPR,
  calculatePilotSuperShards,
  resetForm,
  calculateRacerGoal,
  calculateTotalSeasonCoinsForCrews,
  calculateTokens
};
