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

const superChargedPilotsName = ["Mickey Mouse", "Elizabeth Swann", "Hans", "Kristoff", "Lilo", "Donald Duck","Mike Wazowski","Meg","Jessie","Stitch","Hercules","Goofy"] 

// Fonction pour calculer les shards nécessaires en fonction du niveau actuel
function calculatePilotShardsNeeded(currentLevel, currentShards, levelGoal) {
  let totalShardsNeeded = 0;
  
    for (let level = currentLevel + 1; level <= levelGoal; level++) {
      if (level <= pilotShardCosts.length) {
        totalShardsNeeded += pilotShardCosts[level - 1];
      }
    }

    return Math.max(totalShardsNeeded - currentShards, 0); // Assure que les shards nécessaires ne sont pas négatifs
}

// Fonction pour calculer les superShards nécessaires pour activer la superCharge
function calculatePilotSuperShards(name, currentSuperShards) {
  const superChargedPilots = superChargedPilotsName.includes(name);

  if (!superChargedPilots) {
    currentSuperShards = "❌"
  }

  return currentSuperShards;
}

//Fonction pour calculer le nombre de supershards nécéssaire a collecter au total
function calculatePilotSuperShardsNeeded(currentStars, currentSuperShards) {
  let totalSuperShardsNeeded = 0;

  for (let star = currentStars +1; star <= 7; star++) {
     if (star <= superChargeCost.length) {
      totalSuperShardsNeeded += superChargeCost[star - 1];
     }    
  }

  return Math.max(totalSuperShardsNeeded - currentSuperShards, 0)
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
function calculateCoinsNeeded(currentLevel, levelGoal) {
  let totalCoinsNeeded = 0;

  for (let level = currentLevel + 1; level <= levelGoal; level++) {
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
  let allSuperShardsNeeded = 0;

  pilots.forEach((pilot) => {
    const pilotBlank = pilotsBlank.find((pilotBlank) => pilotBlank.name === pilot.name);

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
  });

  const totalFreeCrewShardsNeeded = calculateFreeCrewShardsNeeded(crews);

  allFreeShards =
    totalFreeCrewShardsNeeded.totalCommonShardsNeeded +
    totalFreeCrewShardsNeeded.totalRareShardsNeeded +
    totalFreeCrewShardsNeeded.totalEpicShardsNeeded +
    allRegularShards;
  // Calculer les universalBoxCount
  universalBoxCount = Math.ceil(allFreeShards / 3);

  let totalFreeCrewShardsNeededCalculated = totalFreeCrewShardsNeeded.totalCommonShardsNeeded +
      totalFreeCrewShardsNeeded.totalRareShardsNeeded +
      totalFreeCrewShardsNeeded.totalEpicShardsNeeded

  // formater les nombres avec des points pour l'affichage
  allCoins = formatNumberWithDots(allCoins);
  allShardsNeeded = formatNumberWithDots(allShardsNeeded);
  allFreeShards = formatNumberWithDots(allFreeShards);
  universalBoxCount = formatNumberWithDots(universalBoxCount);
  seasonCoins = formatNumberWithDots(seasonCoins);
  upgradeCoins = formatNumberWithDots(upgradeCoins);
  tokensToGet = formatNumberWithDots(tokensToGet);
  cosmeticToGet = formatNumberWithDots(cosmeticToGet);
  totalFreeCrewShardsNeeded.totalCommonShardsNeeded =
    formatNumberWithDots(totalFreeCrewShardsNeeded.totalCommonShardsNeeded);
  totalFreeCrewShardsNeeded.totalRareShardsNeeded =
    formatNumberWithDots(totalFreeCrewShardsNeeded.totalRareShardsNeeded);
  totalFreeCrewShardsNeeded.totalEpicShardsNeeded =
    formatNumberWithDots(totalFreeCrewShardsNeeded.totalEpicShardsNeeded);
  totalFreeCrewShardsNeededCalculated = formatNumberWithDots(totalFreeCrewShardsNeededCalculated);

  // Afficher les résultats dans le HTML
  document.getElementById("allCoins").textContent = allCoins;
  document.getElementById("levelGoal").textContent = levelGoal + " : ";
  document.getElementById("allShards").textContent = allShardsNeeded;
  document.getElementById("allSuperShards").textContent = allSuperShardsNeeded;
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
    totalFreeCrewShardsNeededCalculated;
}

// Fonction pour mettre un point tous les 3 caractères pour les calculs a afficher
function formatNumberWithDots(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Fonction pour reset les données du formulaire caclPilotLevelGoal
function resetForm() {
  document.getElementById("calcPilotName").value = "";
  document.getElementById("calcPilotLevelGoal").value = "";
  document.getElementById("calcResult").textContent = "";
  document.getElementById("calcResult").style = "display: none;";
}

function calculateRacerGoal(lang) {
  const getTrad = createGetTrad(lang);
  const racerName = document.getElementById("calcPilotName").value;
  const racerLevelGoal = document.getElementById("calcPilotLevelGoal").value;
  const pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  document.getElementById("calcResult").style = "display: block;";


  const pilot = pilots.find((pilot) => pilot.name === racerName);
  if (!pilot) {
    document.getElementById("calcResult").textContent = getTrad("pilot_not_found");
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
    document.getElementById("calcResult").innerHTML =
      `${racer} ${racerName} ${already1} ${racerLevelGoal} ${more}`;
  } else if (shardNeeded <= 0) {
    document.getElementById("calcResult").innerHTML =
      `${racer} ${racerName} ${already2} ${racerLevelGoal}
      <br>${need} ${coinsNeeded} ${upCoins}`
  } else if (5 > shardNeeded > 0 && shardsToGet > 0) {
    document.getElementById("calcResult").innerHTML = 
      `${reach} ${racerLevelGoal}${need} ${shardNeeded} ${shards}
      <br>${farm1} ${shardNeeded} ${shards} ${boost} ${farm2} ${shardsToGet} ${rmj}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  } else if (shardsToFarm <= 0) {
    document.getElementById("calcResult").innerHTML = 
      `${reach} ${racerLevelGoal}${need} ${shardNeeded} ${shards}
      <br>${shardsToGet} ${shards} ${rmj}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  } else if (shardsToGet <= 0) {
    document.getElementById("calcResult").innerHTML = 
      `${reach} ${racerLevelGoal}${need} ${shardNeeded} ${shards}
      <br>${shardsToFarm} ${farm3} ${boost}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  } else {
    document.getElementById("calcResult").innerHTML = 
      `${reach} ${racerLevelGoal}${need} ${shardNeeded} ${shards}
      <br>${shardsToGet} ${shards} ${rmj} ${and} ${shardsToFarm} ${farm3} ${boost}
      <br>${need} ${coinsNeeded} ${upCoins}`;
  }
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
  calculateRacerGoal
};
