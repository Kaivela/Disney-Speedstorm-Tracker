import { calculatePilotShardsNeeded, calculateCrewShardsNeeded } from "./compute";
import { createGetTrad } from "./trad";
import pilotsBlank from "./data/pilots/pilots_blank.json";
import crewsBlank from "./data/crews/crews_blank.json";
import * as HTML from "./ElementById.js";

// Mise à jour dynamique des options de filtre
function updateFilterOptions(lang) {
  const getTrad = createGetTrad(lang);
  const pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  const crews = JSON.parse(localStorage.getItem("crews")) || [];

  // Calculer les shardsNeeded pour chaque pilote avant de mettre à jour les options de filtre
  pilots.forEach((pilot) => {
    pilot.shardsNeeded = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards, 50);
  });

  // Calculer les shardsNeeded pour chaque equipier avant de mettre à jour les options de filtre
  crews.forEach((crew) => {
    crew.shardsNeeded = calculateCrewShardsNeeded(crew);
  });

  // Extraire les valeurs uniques pour chaque filtre
  const pilotSeasons = [...new Set(pilotsBlank.map((pilot) => pilot.releaseSeason))];
  const pilotFranchises = [...new Set(pilots.map((pilot) => pilot.franchise))];
  const pilotRarities = [...new Set(pilots.map((pilot) => pilot.rarity))];
  const roles = [...new Set(pilots.map((pilot) => pilot.role))];
  const pilotShardsNeededValues = [...new Set(pilots.map((pilot) => parseInt(pilot.shardsNeeded, 10)))];
  const pilotBoxes = [...new Set(pilotsBlank.map((pilot) => pilot.universalBox))];
  const rmj = [...new Set(pilots.map((pilot) => parseInt(pilot.currentRMJ, 10)))];
  const level = [...new Set(pilots.map((pilot) => parseInt(pilot.currentLevel, 10)))];
  const crewFranchises = [...new Set(crews.map((crew) => crew.franchise))];
  const crewRarities = [...new Set(crews.map((crew) => crew.rarity))];
  const crewStars = [...new Set(crews.map((crew) => parseInt(crew.currentStars, 10)))];
  const crewShardsNeededValues = [...new Set(crews.map((crew) => parseInt(crew.shardsNeeded, 10)))];
  const crewBoxes = [...new Set(crewsBlank.map((crew) => crew.universalBox))];

  // Mettre à jour les options de filtre
  HTML.pilotSeasonFilter.innerHTML = '<option value="" data-trad="season_filter">' + getTrad("season_filter") + "</option>";
  for (let season = 0; season <= Math.max(...pilotSeasons); season++) {
    const option = document.createElement("option");
    option.value = season.toString();
    option.textContent = season.toString();
    HTML.pilotSeasonFilter.appendChild(option);
  }

  HTML.pilotFranchiseFilter.innerHTML = '<option value="" data-trad="franchise_filter">' + getTrad("franchise_filter") + "</option>";
  pilotFranchises.forEach((franchise) => {
    const option = document.createElement("option");
    option.value = franchise;
    option.textContent = getTrad(franchise);
    HTML.pilotFranchiseFilter.appendChild(option);
  });

  HTML.pilotRarityFilter.innerHTML = '<option value="" data-trad="rarity_filter">' + getTrad("rarity_filter") + "</option>";
  pilotRarities.forEach((rarity) => {
    const option = document.createElement("option");
    option.value = rarity;
    option.textContent = getTrad(rarity);
    HTML.pilotRarityFilter.appendChild(option);
  });

  HTML.roleFilter.innerHTML = '<option value="" data-trad="role_filter">' + getTrad("role_filter") + "</option>";
  roles.forEach((role) => {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = getTrad(role);
    HTML.roleFilter.appendChild(option);
  });

  HTML.pilotShardsFilter.innerHTML =
    '<option value="" data-trad="shards_needed_filter">' + getTrad("shards_needed_filter") + "</option>";
  if (pilotShardsNeededValues.length > 0) {
    if (pilotShardsNeededValues.some((value) => value > 50)) {
      const optionAbove50 = document.createElement("option");
      optionAbove50.value = "above50";
      optionAbove50.textContent = getTrad("above50");
      HTML.pilotShardsFilter.appendChild(optionAbove50);
    }
    if (pilotShardsNeededValues.some((value) => value > 20 && value <= 50)) {
      const option50 = document.createElement("option");
      option50.value = "between21and50";
      option50.textContent = getTrad("between21and50");
      HTML.pilotShardsFilter.appendChild(option50);
    }
    if (pilotShardsNeededValues.some((value) => value > 0 && value <= 20)) {
      const option20 = document.createElement("option");
      option20.value = "between1and20";
      option20.textContent = getTrad("between1and20");
      HTML.pilotShardsFilter.appendChild(option20);
    }
    if (pilotShardsNeededValues.some((value) => value >= 1)) {
      const optionNot0 = document.createElement("option");
      optionNot0.value = "not_finished";
      optionNot0.textContent = getTrad("not_finished");
      HTML.pilotShardsFilter.appendChild(optionNot0);
    }
    if (pilotShardsNeededValues.some((value) => value === 0)) {
      const option0 = document.createElement("option");
      option0.value = "0";
      option0.textContent = "0";
      HTML.pilotShardsFilter.appendChild(option0);
    }
  }

  HTML.pilotBoxesFilter.innerHTML = '<option value="" data-trad="box_filter">' + getTrad("box_filter") + "</option>";
  pilotBoxes.forEach((universalBox) => {
    const option = document.createElement("option");
    if (universalBox === "season") {
      option.value = "🟣";
      option.textContent = "🟣";
    } else {
      option.value = universalBox ? "✔️" : "❌";
      option.textContent = universalBox ? "✔️" : "❌";
    }
    HTML.pilotBoxesFilter.appendChild(option);
  });

  HTML.rmjFilter.innerHTML = '<option value="" data-trad="MPR_filter">' + getTrad("MPR_filter") + "</option>";
  if (rmj.length > 0) {
    if (rmj.some((value) => value === 0)) {
      const option0 = document.createElement("option");
      option0.value = "0";
      option0.textContent = getTrad("rookie");
      HTML.rmjFilter.appendChild(option0);
    }
    if (rmj.some((value) => value > 0 && value < 6)) {
      const optionBronze = document.createElement("option");
      optionBronze.value = "bronze";
      optionBronze.textContent = getTrad("bronze");
      HTML.rmjFilter.appendChild(optionBronze);
    }
    if (rmj.some((value) => value >= 6 && value < 11)) {
      const optionArgent = document.createElement("option");
      optionArgent.value = "argent";
      optionArgent.textContent = getTrad("silver");
      HTML.rmjFilter.appendChild(optionArgent);
    }
    if (rmj.some((value) => value >= 11 && value < 16)) {
      const optionGold = document.createElement("option");
      optionGold.value = "gold";
      optionGold.textContent = getTrad("gold");
      HTML.rmjFilter.appendChild(optionGold);
    }
    if (rmj.some((value) => value >= 16 && value < 21)) {
      const optionPlatine = document.createElement("option");
      optionPlatine.value = "platine";
      optionPlatine.textContent = getTrad("platinum");
      HTML.rmjFilter.appendChild(optionPlatine);
    }
    if (rmj.some((value) => value >= 21 && value < 26)) {
      const optionEmeraude = document.createElement("option");
      optionEmeraude.value = "emeraude";
      optionEmeraude.textContent = getTrad("emerald");
      HTML.rmjFilter.appendChild(optionEmeraude);
    }
    if (rmj.some((value) => value >= 26 && value < 31)) {
      const optionDiamant = document.createElement("option");
      optionDiamant.value = "diamant";
      optionDiamant.textContent = getTrad("diamond");
      HTML.rmjFilter.appendChild(optionDiamant);
    }
    if (rmj.some((value) => value >= 31 && value < 36)) {
      const optionChampion = document.createElement("option");
      optionChampion.value = "champion";
      optionChampion.textContent = getTrad("champion");
      HTML.rmjFilter.appendChild(optionChampion);
    }
    if (rmj.some((value) => value >= 36 && value < 40)) {
      const optionGrandChampion = document.createElement("option");
      optionGrandChampion.value = "grandChampion";
      optionGrandChampion.textContent = getTrad("grandChampion");
      HTML.rmjFilter.appendChild(optionGrandChampion);
    }
    if (rmj.some((value) => value === 40)) {
      const optionUltime = document.createElement("option");
      optionUltime.value = "ultime";
      optionUltime.textContent = getTrad("ultimateChampion");
      HTML.rmjFilter.appendChild(optionUltime);
    }
    if (rmj.some((value) => value >= 0 && value < 31)) {
      const option30 = document.createElement("option");
      option30.value = "30";
      option30.textContent = getTrad("30_or_less");
      HTML.rmjFilter.appendChild(option30);
    }
    if (rmj.some((value) => value >= 31 && value <= 40)) {
      const option31 = document.createElement("option");
      option31.value = "31";
      option31.textContent = getTrad("31_or_more");
      HTML.rmjFilter.appendChild(option31);
    }
  }

  HTML.levelFilter.innerHTML = '<option value="" data-trad="level_filter">' + getTrad("level_filter") + "</option>";
  if (level.length > 0) {
    if (level.some((value) => value === 0)) {
      const option0 = document.createElement("option");
      option0.value = "0";
      option0.textContent = getTrad("not_unlocked");
      HTML.levelFilter.appendChild(option0);
    }
    if (level.some((value) => value > 0 && value < 20)) {
      const option19 = document.createElement("option");
      option19.value = "19";
      option19.textContent = getTrad("less_than_20");
      HTML.levelFilter.appendChild(option19);
    }
    if (level.some((value) => value > 19 && value < 30)) {
      const option20 = document.createElement("option");
      option20.value = "20";
      option20.textContent = getTrad("between_20_and_29");
      HTML.levelFilter.appendChild(option20);
    }
    if (level.some((value) => value > 29 && value < 40)) {
      const option30 = document.createElement("option");
      option30.value = "30";
      option30.textContent = getTrad("between_30_and_39");
      HTML.levelFilter.appendChild(option30);
    }
    if (level.some((value) => value > 39 && value < 45)) {
      const option40 = document.createElement("option");
      option40.value = "40";
      option40.textContent = getTrad("between_40_and_44");
      HTML.levelFilter.appendChild(option40);
    }
    if (level.some((value) => value > 44 && value < 50)) {
      const option45 = document.createElement("option");
      option45.value = "45";
      option45.textContent = getTrad("between_45_and_49");
      HTML.levelFilter.appendChild(option45);
    }
    if (level.some((value) => value === 50)) {
      const option50 = document.createElement("option");
      option50.value = "50";
      option50.textContent = "50";
      HTML.levelFilter.appendChild(option50);
    }
  }

  HTML.crewFranchiseFilter.innerHTML = '<option value="" data-trad="franchise_filter">' + getTrad("franchise_filter") + "</option>";
  crewFranchises.forEach((franchise) => {
    const option = document.createElement("option");
    option.value = franchise;
    option.textContent = getTrad(franchise);
    HTML.crewFranchiseFilter.appendChild(option);
  });

  HTML.crewRarityFilter.innerHTML = '<option value="" data-trad="rarity_filter">' + getTrad("rarity_filter") + "</option>";
  crewRarities.forEach((rarity) => {
    const option = document.createElement("option");
    option.value = rarity;
    option.textContent = getTrad(rarity);
    HTML.crewRarityFilter.appendChild(option);
  });

  HTML.crewStarsFilter.innerHTML = '<option value="" data-trad="level_filter">' + getTrad("level_filter") + "</option>";
  if (crewStars.length > 0) {
    for (let level = 0; level <= 5; level++) {
      if (crewStars.some((value) => value === level)) {
        const option = document.createElement("option");
        option.value = level.toString();
        option.textContent = level.toString();
        HTML.crewStarsFilter.appendChild(option);
      }
    }
  }

  HTML.crewShardsFilter.innerHTML =
    '<option value="" data-trad="shards_needed_filter">' + getTrad("shards_needed_filter") + "</option>";
  if (crewShardsNeededValues.length > 0) {
    if (crewShardsNeededValues.some((value) => value > 50)) {
      const optionAbove50 = document.createElement("option");
      optionAbove50.value = "above50";
      optionAbove50.textContent = getTrad("above50");
      HTML.crewShardsFilter.appendChild(optionAbove50);
    }
    if (crewShardsNeededValues.some((value) => value > 20 && value <= 50)) {
      const option50 = document.createElement("option");
      option50.value = "between21and50";
      option50.textContent = getTrad("between21and50");
      HTML.crewShardsFilter.appendChild(option50);
    }
    if (crewShardsNeededValues.some((value) => value > 0 && value <= 20)) {
      const option20 = document.createElement("option");
      option20.value = "between1and20";
      option20.textContent = getTrad("between1and20");
      HTML.crewShardsFilter.appendChild(option20);
    }
    if (crewShardsNeededValues.some((value) => value >= 1)) {
      const optionMoreThan0 = document.createElement("option");
      optionMoreThan0.value = "not_finished";
      optionMoreThan0.textContent = getTrad("not_finished");
      HTML.crewShardsFilter.appendChild(optionMoreThan0);
    }
    if (crewShardsNeededValues.some((value) => value === 0)) {
      const option0 = document.createElement("option");
      option0.value = "0";
      option0.textContent = "0";
      HTML.crewShardsFilter.appendChild(option0);
    }
  }

  HTML.crewBoxesFilter.innerHTML = '<option value="" data-trad="box_filter">' + getTrad("box_filter") + "</option>";
  crewBoxes.forEach((universalBox) => {
    const option = document.createElement("option");
    if (universalBox === "season") {
      option.value = "🟣";
      option.textContent = "🟣";
    } else {
      option.value = universalBox ? "✔️" : "❌";
      option.textContent = universalBox ? "✔️" : "❌";
    }
    HTML.crewBoxesFilter.appendChild(option);
  });
}

function updateCalculateOptions(lang) {
  const getTrad = createGetTrad(lang);
  const pilots = JSON.parse(localStorage.getItem("pilots")) || [];

  const pilotName = [...new Set(pilots.map((pilot) => pilot.name))];

  HTML.calcPilotName.innerHTML = '<option value="" data-trad="name_filter">' + getTrad("name_filter") + "</option>";
  pilotName.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = getTrad(name);
    HTML.calcPilotName.appendChild(option);
  });
}

export { updateFilterOptions, updateCalculateOptions };
