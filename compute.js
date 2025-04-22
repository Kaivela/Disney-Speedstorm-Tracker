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
} from "./data/data.js";
import { createGetTrad } from "./trad.js";
import crewsBlank from "./data/crews/crews_blank.json";
import pilotsBlank from "./data/pilots/pilots_blank.json";

// Fonction pour calculer les shards nécessaires en fonction du niveau actuel
function calculatePilotShardsNeeded(currentLevel, currentShards) {
  let totalShardsNeeded = 0;

  for (let level = currentLevel + 1; level <= 50; level++) {
    if (level <= pilotShardCosts.length) {
      totalShardsNeeded += pilotShardCosts[level - 1];
    }
  }

  return Math.max(totalShardsNeeded - currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// Fonction pour calculer les superShards nécessaires pour activer la superCharge
function calculatePilotSuperShards(name, currentSuperShards) {
  const superChargedPilotsName = ["Mickey Mouse", "Elizabeth Swann", "Hans"] ;
  const superChargedPilots = superChargedPilotsName.includes(name);

  if (!superChargedPilots) {
    currentSuperShards = "❌"
  }

  return currentSuperShards;
}

// Fonction pour calculer les shards nécéssaires si le joueur farm le RMJ 38
function calculatePilotShardIfMaxMPR(shardsNeeded, shardsToGet) {
  const shardIfMaxMPR = shardsNeeded - shardsToGet;
  return Math.max(shardIfMaxMPR, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// Fonction pour calculer les shards nécéssaires pour gagner la prochaine star
function calculatePilotShardsNextStar(currentLevel, currentShards, currentStars) {
  let shardsToNextStar = 0;
  let nextStarLevel = starLevel[currentStars - 1];
  if (currentStars === 0) {
    shardsToNextStar = 10 - currentShards;
  }
  if (1 <= currentStars < 5) {
    for (let level = currentLevel + 1; level <= nextStarLevel; level++) {
      if (level <= pilotShardCosts.length) {
        shardsToNextStar += pilotShardCosts[level - 1];
      }
    }

    return Math.max(shardsToNextStar - currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
  }
}

// Fonction pour calculer les coins nécessaires en fonction du niveau actuel
function calculateCoinsNeeded(currentLevel) {
  let totalCoinsNeeded = 0;

  for (let level = currentLevel + 1; level <= 50; level++) {
    if (level <= coinsCosts.length) {
      totalCoinsNeeded += coinsCosts[level - 1];
    }
  }

  return Math.max(totalCoinsNeeded, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// Fonction pour calculer les coins nécessaires pour gagner la prochaine star
function calculateCoinsNextStar(currentLevel, currentStars) {
  let coinsNextStar = 0;
  let nextStarLevel = starLevel[currentStars - 1];
  if (1 <= currentStars < 5) {
    for (let level = currentLevel + 1; level <= nextStarLevel; level++) {
      if (level <= coinsCosts.length) {
        coinsNextStar += coinsCosts[level - 1];
      }
    }

    return Math.max(coinsNextStar, 0); // Assure que les coins nécessaires ne sont pas négatifs
  }
}

// Fonction pour calculer les coins nécessaires pour le goal en fonction du niveau actuel
function calculateCoinsNeededForGoal(currentLevel, levelGoal, star) {
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
function calculateCoinsToGet(highestRMJ, rmjCoin, goal, star) {
  let totalCoinsToGet = 0;
  let table;

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
function calculatePilotShardsToGet(highestRMJ, goal) {
  let totalShardsToGet = 0;

  for (let rmj = highestRMJ + 1; rmj <= goal; rmj++) {
    if (rmj <= rmjShardsReward.length) {
      totalShardsToGet += rmjShardsReward[rmj - 1];
    }
  }

  return Math.max(totalShardsToGet, 0); // Assure que les coins nécessaires ne sont pas négatifs
}

// function pour calculer les TokensToGet en fonction du HighestRMJ
function calculateTokensToGet(highestRMJ, rmjTokenOld, goal, star) {
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
function calculateCosmeticToGet(highestRMJ, goal, star) {
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

function calculateCrewShardsNeeded(crew) {
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
function calculateFreeCrewShardsNeeded(crews) {
  let totalCommonShardsNeeded = 0;
  let totalRareShardsNeeded = 0;
  let totalEpicShardsNeeded = 0;
  crews.forEach((crew) => {
    const crewBlank = crewsBlank.find((crewBlank) => crewBlank.name === crew.name);
    if (crew.rarity === "Common" && crewBlank.universalBox === true) {
      totalCommonShardsNeeded += crew.shardsNeeded;
    }
    if (crew.rarity === "Rare" && crewBlank.universalBox === true) {
      totalRareShardsNeeded += crew.shardsNeeded;
    }
    if (crew.rarity === "Epic" && crewBlank.universalBox === true) {
      totalEpicShardsNeeded += crew.shardsNeeded;
    }
  });

  return {
    totalCommonShardsNeeded: totalCommonShardsNeeded,
    totalRareShardsNeeded: totalRareShardsNeeded,
    totalEpicShardsNeeded: totalEpicShardsNeeded,
  };
}

// Fonction pour calculer le total des shards nécéssaire pour maxer chaque pilote
function calculateTotal(lang, goal, levelGoal) {
  const getTrad = createGetTrad(lang);
  let crews = JSON.parse(localStorage.getItem("crews")) || [];
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  let allCoins = 0;
  let allShardsNeeded = 0;
  let allRegularShards = 0;
  let universalBoxCount = 0;
  let shardsToGet = 0;
  let seasonCoins = 0;
  let upgradeCoins = 0;
  let tokensToGet = 0;
  let cosmeticToGet = 0;
  let allFreeShards = 0;

  pilots.forEach((pilot) => {
    const pilotBlank = pilotsBlank.find((pilotBlank) => pilotBlank.name === pilot.name);

    // Calculer les coinsNeeded pour chaque pilote
    pilot.coinsNeeded = calculateCoinsNeededForGoal(pilot.currentLevel, levelGoal, pilot.currentStars);
    allCoins = allCoins + pilot.coinsNeeded;

    // Calculer les shardsNeeded pour chaque pilote
    pilot.shardsNeeded = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards);
    allShardsNeeded = allShardsNeeded + pilot.shardsNeeded;

    // Calculer les shardsNeeded pour chaque pilote non saisonier
    if (pilot.universalBox) {
      pilot.shardsNeeded = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards);
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
  });

  const totalFreeCrewShardsNeeded = calculateFreeCrewShardsNeeded(crews);

  allFreeShards =
    totalFreeCrewShardsNeeded.totalCommonShardsNeeded +
    totalFreeCrewShardsNeeded.totalRareShardsNeeded +
    totalFreeCrewShardsNeeded.totalEpicShardsNeeded +
    allRegularShards;
  // Calculer les universalBoxCount
  universalBoxCount = Math.ceil(allFreeShards / 3);

  document.getElementById("allCoins").textContent = allCoins;
  document.getElementById("levelGoal").textContent = levelGoal + " : ";
  document.getElementById("allShards").textContent = allShardsNeeded;
  document.getElementById("allRegularShards").textContent = allFreeShards;
  document.getElementById("universalBoxCount").textContent = universalBoxCount;
  document.getElementById("seasonCoins").textContent = seasonCoins;
  document.getElementById("upgradeCoins").textContent = upgradeCoins;
  document.getElementById("tokens").textContent = tokensToGet;
  document.getElementById("cosmetic").textContent = cosmeticToGet;
  document.getElementById("crewFreeShards").textContent =
    getTrad("Common") +
    ": " +
    totalFreeCrewShardsNeeded.totalCommonShardsNeeded +
    " " +
    getTrad("Rare") +
    ": " +
    totalFreeCrewShardsNeeded.totalRareShardsNeeded +
    " " +
    getTrad("Epic") +
    ": " +
    totalFreeCrewShardsNeeded.totalEpicShardsNeeded +
    " Total : " +
    (totalFreeCrewShardsNeeded.totalCommonShardsNeeded +
      totalFreeCrewShardsNeeded.totalRareShardsNeeded +
      totalFreeCrewShardsNeeded.totalEpicShardsNeeded);
  // console.log({ totalFreeCrewShardsNeeded });
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
};
