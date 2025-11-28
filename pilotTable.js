import {
  calculatePilotShardsNeeded,
  calculateCoinsNeeded,
  calculatePilotShardsToGet,
  calculateTotal,
  calculatePilotShardsNextStar,
  calculateCoinsNextStar,
  calculatePilotShardIfMaxMPR,
  calculatePilotSuperShards
} from "./compute";
import { createGetTrad, translate, getTradKey } from "./trad";
import pilotsBlank from "./data/pilots/pilots_blank.json";
import * as HTML from "./ElementById.js";

const pilotTableBody = document.getElementById("pilotTableBody");

// Fonction utilitaire pour déterminer si le style doit être caché
function getStyleIfActive(toggleElement) {
  return toggleElement.classList.contains("active") ? 'style="display: none;"' : "";
}

// Fonction pour ajouter un pilote à la table
function addPilotToTable(pilot, index, lang, pilotTableBody) {
  const getTrad = createGetTrad(lang);
  const shardsNeeded = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards, 50);
  const shardsToNextStar = calculatePilotShardsNextStar(pilot.currentLevel, pilot.currentShards, pilot.currentStars);
  const coinsToNextStar = calculateCoinsNextStar(pilot.currentLevel, pilot.currentStars);
  const coinsNeeded = calculateCoinsNeeded(pilot.currentLevel, 50);
  const shardsToGet = calculatePilotShardsToGet(pilot.highestRMJ, 40);
  const shardsIfMaxMPR = calculatePilotShardIfMaxMPR(shardsNeeded, shardsToGet);
  const superCharge = calculatePilotSuperShards(pilot.name, pilot.currentStars, pilot.currentSuperShards);

  // Déterminez la classe en fonction de shardsNeeded
  let shardsClass = "";
  if (shardsNeeded === 0) {
    shardsClass = "shards-needed-zero";
  } else if (shardsNeeded > 20 && shardsNeeded <= 50) {
    shardsClass = "shards-needed-close";
  } else if (shardsNeeded > 0 && shardsNeeded <= 20) {
    shardsClass = "shards-needed-warning";
  }

  // Déterminer la classe de couleur en fonction du nombre d'étoiles
  let starClass = "";
  if (pilot.currentStars === 0) {
    starClass = "star-locked";
  } else if (pilot.currentStars === 5) {
    starClass = "star-5";
  } else if (pilot.currentStars === 6) {
    starClass = "star-6";
  } else if (pilot.currentStars === 7) {
    starClass = "star-7";
  }

  let superChargeClass = ""
  if (pilot.currentStars === 7) {
    superChargeClass = "superCharge";
  }
  // Déterminer la classe de couleur en fonction du niveau actuel
  let levelClass;
  if (pilot.currentLevel === 0) {
    levelClass = "level-gray";
  } else if (pilot.currentLevel >= 1 && pilot.currentLevel <= 10) {
    levelClass = "level-light-red";
  } else if (pilot.currentLevel >= 11 && pilot.currentLevel <= 19) {
    levelClass = "level-yellow";
  } else if (pilot.currentLevel >= 20 && pilot.currentLevel <= 29) {
    levelClass = "level-green";
  } else if (pilot.currentLevel >= 30 && pilot.currentLevel <= 34) {
    levelClass = "level-light-blue";
  } else if (pilot.currentLevel >= 35 && pilot.currentLevel <= 39) {
    levelClass = "level-dark-blue";
  } else if (pilot.currentLevel >= 40 && pilot.currentLevel <= 44) {
    levelClass = "level-purple";
  } else if (pilot.currentLevel >= 45 && pilot.currentLevel <= 49) {
    levelClass = "level-violet";
  } else if (pilot.currentLevel === 50) {
    levelClass = "level-black";
  }

  let RMJClass;
  if (pilot.highestRMJ >= 1 && pilot.highestRMJ < 6) {
    RMJClass = "rmj-bronze";
  } else if (pilot.highestRMJ >= 6 && pilot.highestRMJ < 11) {
    RMJClass = "rmj-argent";
  } else if (pilot.highestRMJ >= 11 && pilot.highestRMJ < 16) {
    RMJClass = "rmj-gold";
  } else if (pilot.highestRMJ >= 16 && pilot.highestRMJ < 21) {
    RMJClass = "rmj-platine";
  } else if (pilot.highestRMJ >= 21 && pilot.highestRMJ < 26) {
    RMJClass = "rmj-emeraude";
  } else if (pilot.highestRMJ >= 26 && pilot.highestRMJ < 31) {
    RMJClass = "rmj-diamant";
  } else if (pilot.highestRMJ >= 31 && pilot.highestRMJ < 36) {
    RMJClass = "rmj-champion";
  } else if (pilot.highestRMJ >= 36 && pilot.highestRMJ < 40) {
    RMJClass = "rmj-grand-champion";
  } else if (pilot.highestRMJ === 40) {
    RMJClass = "rmj-ultime";
  }

  //  Cette fonction crée et ajoute une nouvelle ligne dans un tableau HTML représentant les détails d'un pilote.
  const row = document.createElement("tr");
  row.classList.add("pilot-row");
  const pilotBlank = pilotsBlank.find((blank) => blank.name === pilot.name);
  let universalBox;
  if (pilotBlank.universalBox === "season") universalBox = "🟣";
  else universalBox = pilotBlank.universalBox ? "✔️" : "❌";

  // Tableau des propriétés à appliquer
  const styles = {
    pilotSeason: getStyleIfActive(HTML.togglePilotSeason),
    pilotImage: HTML.togglePilotImage.classList.contains("active") ? "display: none;" : "",
    pilotFranchise: getStyleIfActive(HTML.togglePilotFranchise),
    pilotRarity: getStyleIfActive(HTML.togglePilotRarity),
    pilotRole: getStyleIfActive(HTML.togglePilotRole),
    pilotName: getStyleIfActive(HTML.togglePilotName),
    pilotStar: getStyleIfActive(HTML.togglePilotStar),
    pilotCurrentShard: getStyleIfActive(HTML.togglePilotCurrentShard),
    pilotLevel: getStyleIfActive(HTML.togglePilotLevel),
    pilotSuperShard: getStyleIfActive(HTML.togglePilotSuperShard),
    pilotCurrentMPR: getStyleIfActive(HTML.togglePilotCurrentMPR),
    pilotHighestMPR: getStyleIfActive(HTML.togglePilotHighestMPR),
    pilotGrade: getStyleIfActive(HTML.togglePilotGrade),
    pilotShardNeeded: getStyleIfActive(HTML.togglePilotShardNeeded),
    pilotShardMPR: getStyleIfActive(HTML.togglePilotShardMPR),
    pilotUpgrade: getStyleIfActive(HTML.togglePilotUpgrade),
    pilotBox: getStyleIfActive(HTML.togglePilotBox),
    pilotShardStar: getStyleIfActive(HTML.togglePilotShardNextStar),
    pilotCoinStar: getStyleIfActive(HTML.togglePilotCoinStar),
    pilotShardIfMaxMPR: getStyleIfActive(HTML.togglePilotShardIfMax),
  };

  row.innerHTML = `
  <td ${styles.pilotSeason}>${pilot.releaseSeason}</td>
  <td style="padding: 0; border: none; display: block; height: 80px; ${styles.pilotImage}">
      <img src="img/pilots/${pilot.name}.webp" style="width: 80px; height: auto;">
  </td>
  <td data-trad="${pilot.franchise}" ${styles.pilotFranchise}>${getTrad(pilot.franchise)}</td>
  <td data-trad="${pilot.rarity}" ${styles.pilotRarity} class="${pilot.rarity}">${getTrad(pilot.rarity)}</td>
  <td data-trad="${pilotBlank.role}" ${styles.pilotRole} class="${pilotBlank.role}">${getTrad(pilotBlank.role)}</td>
  <td data-trad="${pilot.name}" ${styles.pilotName}>${getTrad(pilot.name)}</td>
  <td class="${starClass}" ${styles.pilotStar}>${pilot.currentStars}</td>
  <td class="${shardsClass}" ${styles.pilotCurrentShard}>${pilot.currentShards}</td>
  <td class="${levelClass}" ${styles.pilotLevel}>${pilot.currentLevel}</td>
  <td Class="${superChargeClass}">${superCharge}</td>
  <td ${styles.pilotCurrentMPR}>${pilot.currentRMJ}</td>
  <td ${styles.pilotHighestMPR}>${pilot.highestRMJ}</td>
  <td class="${RMJClass}" ${styles.pilotGrade}></td>
  <td class="${shardsClass}" ${styles.pilotShardNeeded}>${shardsNeeded}</td>
  <td class="${shardsClass}" ${styles.pilotShardMPR}>${shardsToGet}</td>
  <td ${styles.pilotUpgrade}>${coinsNeeded}</td>
  <td ${styles.pilotBox}>${universalBox}</td>
  <td ${styles.pilotShardStar}>${shardsToNextStar}</td>
  <td ${styles.pilotCoinStar}>${coinsToNextStar}</td>
  <td ${styles.pilotShardIfMaxMPR}>${shardsIfMaxMPR}</td>
  <td><button data-trad="modify" class="edit-btn" data-index="${index}"></button></td>
`;

  pilotTableBody.appendChild(row);
  // Applique le `onerror` dynamiquement à l'image pour qu'elle affiche une image de secours si besoin
  const img = row.querySelector("img");
  img.onerror = function () {
    this.src = "img/Locked.webp";
  };
  translate(lang);
}

function addPilotsToTable(lang, pilotTableBody, goal) {
  let pilots;
  pilots = JSON.parse(localStorage.getItem("pilots")) || [];

  pilots.forEach((pilot, index) => {
    addPilotToTable(pilot, index, lang, pilotTableBody, goal);
  });
}

// Fonction pour enregistrer les données pilots dans le stockage local
function savePilotData(pilot, editingPilotIndex) {
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  if (editingPilotIndex !== null) {
    pilots[editingPilotIndex] = pilot;
  } else {
    pilots.push(pilot);
  }
  localStorage.setItem("pilots", JSON.stringify(pilots));
}

// fonction pour ordonner les pilotes automatiquement selon l'ordre du fichier pilots_blank
function sortPilotsBlank() {
  // load pilots
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  let orderedPilots = {};
  pilotsBlank.forEach((pilot, index) => {
    orderedPilots[pilot.name] = index;
  });
  pilots.sort((pilotA, pilotB) => {
    return orderedPilots[pilotA.name] - orderedPilots[pilotB.name];
  });

  localStorage.setItem("pilots", JSON.stringify(pilots));
}

// Fonction pour pré-remplir le formulaire avec les données du pilote sélectionné
function populatePilotForm(pilot, lang) {
  const getTrad = createGetTrad(lang);
  HTML.pilotFranchise.value = getTrad(pilot.franchise);
  HTML.pilotRarity.value = pilot.rarity;
  HTML.role.value = pilot.role;
  HTML.pilotName.value = getTrad(pilot.name);
  HTML.pilotCurrentStars.value = pilot.currentStars;
  HTML.pilotCurrentShards.value = pilot.currentShards;
  HTML.pilotSuperShards.value = pilot.currentSuperShards;
  HTML.currentLevel.value = pilot.currentLevel;
  HTML.currentRMJ.value = pilot.currentRMJ;
  HTML.highestRMJ.value = pilot.highestRMJ;
  HTML.pilotUniversalBox.checked = pilot.universalBox;
}

//franchise list pour le pilotForm
function updatePilotFormFranchise(lang) {
  const getTrad = createGetTrad(lang);
  const franchiseNames = HTML.pilotFranchise2;
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  const franchises = new Set();
  pilots.forEach((pilot) => {
    franchises.add(pilot.franchise);
  });
  // Récupérer les clés de la map
  franchiseNames.innerHTML = '<option value="" data-trad="all_franchises"></option>';
  for (const name of franchises) {
    const option = document.createElement("option");
    option.value = name; // Utiliser la clé comme valeur de l'option
    option.textContent = getTrad(name); // Utiliser la clé comme texte visible de l'option
    franchiseNames.appendChild(option);
  }
}

function submitPilotForm(event, lang, editingPilotIndex, pilotTableBody, pilotForm, pilotSubmitBtn, pilotMaxBtn, goal, levelGoal) {
  const getTrad = createGetTrad(lang);
  event.preventDefault();
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  const pilot =
    pilotsBlank.find((pilot) => {
      return getTrad(pilot.name) === HTML.pilotName.value;
    }) || {};

  // Récupérer les valeurs du formulaire
  const franchise = getTradKey(HTML.pilotFranchise.value, lang);
  const pilotName = getTradKey(HTML.pilotName.value, lang);
  const pilotcurrentStars = parseInt(HTML.pilotCurrentStars.value, 10);
  const pilotCurrentShards = parseInt(HTML.pilotCurrentShards.value, 10);
  const pilotCurrentSuperShards = parseInt(HTML.pilotSuperShards.value, 10);
  const currentLevel = parseInt(HTML.currentLevel.value, 10);

  let isValid = checkFormValidity(
    pilotName,
    editingPilotIndex,
    pilots,
    pilotcurrentStars,
    currentLevel,
    pilotCurrentShards,
    franchise,
    pilotCurrentSuperShards
  );

  if (isValid) {
    // Créer l'objet pilote
    const editPilot = {
      franchise:
        HTML.pilotFranchise2.value === "" ? franchise : HTML.pilotFranchise2.value,
      rarity: HTML.pilotRarity.value,
      role: HTML.role.value,
      name: pilotName,
      currentStars: pilotcurrentStars,
      currentShards: pilotCurrentShards,
      currentSuperShards: pilotCurrentSuperShards,
      currentLevel: currentLevel,
      currentRMJ: parseInt(HTML.currentRMJ.value, 10),
      highestRMJ: parseInt(HTML.highestRMJ.value, 10),
      universalBox: pilot.universalBox,
      releaseSeason: pilot.releaseSeason,
    };
    savePilotData(editPilot, editingPilotIndex);
    const sortColumn = document.querySelector("th[data-order]:not([data-order='default'])");
    if (sortColumn) {
      sortPilotsByColumn(sortColumn.dataset.sort, sortColumn.dataset.order);
    } else {
      sortPilotsBlank();
    }
    updatePilotFormFranchise(lang);
    pilotTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
    addPilotsToTable(lang, pilotTableBody);
    filterPilotTable(lang);
    pilotForm.reset();
    calculateTotal(lang, goal, levelGoal);
    pilotSubmitBtn.textContent = getTrad("add_pilot"); // Réinitialiser le texte du bouton après ajout
    pilotSubmitBtn.style.display = "none";
    pilotMaxBtn.style.display = "none";
    editingPilotIndex = null; // Réinitialiser l'index d'édition

    document.documentElement.scrollTop = window.saveScroll;
  }
}

function checkFormValidity(pilotName, editingPilotIndex, pilots, pilotCurrentStars, currentLevel, pilotCurrentShards, franchise, pilotCurrentSuperShards) {
  let isValid = true;
  const currentRMJ = parseInt(HTML.currentRMJ.value, 10);
  const highestRMJ = parseInt(HTML.highestRMJ.value, 10);

  if (pilotName === "") {
    HTML.pilotNameError.style.display = "block";
    isValid = false;
  } else {
    HTML.pilotNameError.style.display = "none";
  }
  if (editingPilotIndex === null) {
    const duplicatePilot = pilots.find((pilot) => pilot.name === pilotName);
    if (duplicatePilot) {
      HTML.pilotDuplicateError.style.display = "block";
      isValid = false;
    } else {
      HTML.pilotDuplicateError.style.display = "none";
    }
  }
  if (pilotCurrentStars < 0 || pilotCurrentStars > 7 || isNaN(pilotCurrentStars)) {
    showElement(HTML.pilotcurrentStarsError);
    isValid = false;
  } else {
    hideElement(HTML.pilotcurrentStarsError);
  }
  if (currentLevel < 0 || currentLevel > 50 || isNaN(currentLevel)) {
    showElement(HTML.currentLevelError);
    isValid = false;
  } else {
    hideElement(HTML.currentLevelError);
  }
  if (pilotCurrentShards < 0 || pilotCurrentShards > 200 || isNaN(pilotCurrentShards)) {
    showElement(HTML.pilotCurrentShardsError);
    isValid = false;
  } else {
    hideElement(HTML.pilotCurrentShardsError);
  }
  if (pilotCurrentSuperShards < 0 || pilotCurrentSuperShards > 60 || isNaN(pilotCurrentSuperShards)) {
    showElement(HTML.pilotSuperShardsError);
    isValid = false;
  } else {
    hideElement(HTML.pilotSuperShardsError);
  }
  if (currentRMJ < 0 || currentRMJ > 40 || isNaN(currentRMJ)) {
    showElement(HTML.currentRMJError);
    isValid = false;
  } else {
    hideElement(HTML.currentRMJError);
  }
  if (highestRMJ < 0 || highestRMJ > 40 || isNaN(highestRMJ)) {
    showElement(HTML.highestRMJError);
    isValid = false;
  } else {
    hideElement(HTML.highestRMJError);
  }

  return isValid;
}

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}

function applyPilotSearch(searchTerm) {
  const rows = document.querySelectorAll("#pilotTableBody tr");

  rows.forEach((row) => {
    const rowText = row.textContent.toLowerCase();
    if (rowText.includes(searchTerm)) {
      row.style.display = "";
    }
  });
}

function filterPilotTable(lang) {
  const getTrad = createGetTrad(lang);
  const seasonFilter = HTML.pilotSeasonFilter.value;
  const franchiseFilter = HTML.pilotFranchiseFilter.value;
  const rarityFilter = HTML.pilotRarityFilter.value;
  const roleFilter = HTML.roleFilter.value;
  const shardsFilter = HTML.pilotShardsFilter.value;
  const boxesFilter = HTML.pilotBoxesFilter.value;
  const rmjFilter = HTML.rmjFilter.value;
  const levelFilter = HTML.levelFilter.value;

  const rows = document.querySelectorAll("#pilotTableBody tr");

  const searchTerms = HTML.pilotSearchInput.value
    .split("/")
    .map(term => term.trim().toLowerCase())
    .filter(term => term.length > 0);

  rows.forEach((row) => {
    row.style.display = "none";
    const seasonText = row.cells[0].textContent;
    const franchiseText = row.cells[2].textContent;
    const rarityText = row.cells[3].textContent;
    const roleText = row.cells[4].textContent;
    const levelText = row.cells[8].textContent;
    const rmjText = row.cells[10].textContent;
    const shardsNeededText = row.cells[13].textContent;
    const boxesText = row.cells[16].textContent;
    const matchesSeason = seasonText === seasonFilter || seasonFilter === "";
    const matchesFranchise = franchiseText.includes(getTrad(franchiseFilter)) || franchiseFilter === "";
    const matchesRarity = rarityText.includes(getTrad(rarityFilter)) || rarityFilter === "";
    const matchesRole = roleText.includes(getTrad(roleFilter)) || roleFilter === "";

    let matchesShards = true;
    if (shardsFilter === "above50") {
      matchesShards = parseInt(shardsNeededText, 10) > 50;
    } else if (shardsFilter === "between21and50") {
      matchesShards = parseInt(shardsNeededText, 10) <= 50 && parseInt(shardsNeededText, 10) > 20;
    } else if (shardsFilter === "between1and20") {
      matchesShards = parseInt(shardsNeededText, 10) > 0 && parseInt(shardsNeededText, 10) <= 20;
    } else if (shardsFilter === "not_finished") {
      matchesShards = parseInt(shardsNeededText, 10) >= 1;
    } else if (shardsFilter !== "") {
      matchesShards = parseInt(shardsNeededText, 10) <= parseInt(shardsFilter, 10);
    }

    const matchesBoxes = boxesText.includes(boxesFilter) || boxesFilter === "";

    let matchesRMJ = true;
    if (rmjFilter === "0") {
      matchesRMJ = parseInt(rmjText, 10) === 0;
    } else if (rmjFilter === "bronze") {
      matchesRMJ = parseInt(rmjText, 10) >= 1 && parseInt(rmjText, 10) < 6;
    } else if (rmjFilter === "argent") {
      matchesRMJ = parseInt(rmjText, 10) >= 6 && parseInt(rmjText, 10) < 11;
    } else if (rmjFilter === "gold") {
      matchesRMJ = parseInt(rmjText, 10) >= 11 && parseInt(rmjText, 10) < 16;
    } else if (rmjFilter === "platine") {
      matchesRMJ = parseInt(rmjText, 10) >= 16 && parseInt(rmjText, 10) < 21;
    } else if (rmjFilter === "emeraude") {
      matchesRMJ = parseInt(rmjText, 10) >= 21 && parseInt(rmjText, 10) < 26;
    } else if (rmjFilter === "diamant") {
      matchesRMJ = parseInt(rmjText, 10) >= 26 && parseInt(rmjText, 10) < 31;
    } else if (rmjFilter === "champion") {
      matchesRMJ = parseInt(rmjText, 10) >= 31 && parseInt(rmjText, 10) < 36;
    } else if (rmjFilter === "grandChampion") {
      matchesRMJ = parseInt(rmjText, 10) >= 36 && parseInt(rmjText, 10) < 40;
    } else if (rmjFilter === "ultime") {
      matchesRMJ = parseInt(rmjText, 10) === 40;
    } else if (rmjFilter === "30") {
      matchesRMJ = parseInt(rmjText, 10) >= 0 && parseInt(rmjText, 10) < 31;
    } else if (rmjFilter === "31") {
      matchesRMJ = parseInt(rmjText, 10) >= 31 && parseInt(rmjText, 10) <= 40;
    }

    let matchesLevel = true;
    if (levelFilter === "0") {
      matchesLevel = parseInt(levelText, 10) === 0;
    } else if (levelFilter === "19") {
      matchesLevel = parseInt(levelText, 10) > 0 && parseInt(levelText, 10) < 20;
    } else if (levelFilter === "20") {
      matchesLevel = parseInt(levelText, 10) > 19 && parseInt(levelText, 10) < 30;
    } else if (levelFilter === "30") {
      matchesLevel = parseInt(levelText, 10) > 29 && parseInt(levelText, 10) < 40;
    } else if (levelFilter === "40") {
      matchesLevel = parseInt(levelText, 10) > 39 && parseInt(levelText, 10) < 45;
    } else if (levelFilter === "45") {
      matchesLevel = parseInt(levelText, 10) > 44 && parseInt(levelText, 10) < 50;
    } else if (levelFilter === "50") {
      matchesLevel = parseInt(levelText, 10) === 50;
    }

    let matchesSearch = true;
    if (searchTerms.length > 0) {
      const pilotName = row.cells[5].textContent.toLowerCase();
      matchesSearch = searchTerms.some(term => pilotName.includes(term));
    }
    if (
      matchesSeason &&
      matchesFranchise &&
      matchesRarity &&
      matchesRole &&
      matchesShards &&
      matchesBoxes &&
      matchesRMJ &&
      matchesLevel &&
      matchesSearch
    ) {
      row.style.display = "";
    }
  });
}

export function sortPilotsByColumn(column, order) {
  // load pilots
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];

  // Map column keys to calculation functions
  const computedColumns = {
    shardsNeeded: (pilot) => calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards, 50),
    shardsToGet: (pilot) => calculatePilotShardsToGet(pilot.highestRMJ, 40),
    upgradeCoins: (pilot) => calculateCoinsNeeded(pilot.currentLevel, 50),
    shardStar: (pilot) => calculatePilotShardsNextStar(pilot.currentLevel, pilot.currentShards, pilot.currentStars),
    coinStar: (pilot) => calculateCoinsNextStar(pilot.currentLevel, pilot.currentStars),
    shardMaxMPR: (pilot) => {
      const needed = calculatePilotShardsNeeded(pilot.currentLevel, pilot.currentShards, 50);
      const toGet = calculatePilotShardsToGet(pilot.highestRMJ, 40);
      return calculatePilotShardIfMaxMPR(needed, toGet);
    },
  };

  if (computedColumns[column]) {
    pilots.sort((pilotA, pilotB) => {
      const aVal = computedColumns[column](pilotA);
      const bVal = computedColumns[column](pilotB);
      return order === "asc" ? aVal - bVal : bVal - aVal;
    });
  } else {
    // Default: sort by property
    pilots.sort((pilotA, pilotB) => {
      if (order === "asc") return pilotA[column] - pilotB[column];
      return pilotB[column] - pilotA[column];
    });
  }

  localStorage.setItem("pilots", JSON.stringify(pilots));
}

export function emptyPilotsTable() {
  pilotTableBody.innerHTML = "";
}

function synchronizeLocalStorageWithPilotsBlank() {
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];

  pilots.forEach((pilot) => {
    const pilotBlank = pilotsBlank.find((blank) => blank.name === pilot.name);
    if (pilotBlank) {
      pilot.universalBox = pilotBlank.universalBox; // Update universalBox to match pilots_blank.json
    }
  });

  pilots.forEach((pilot) => {
    const pilotBlank = pilotsBlank.find((blank) => blank.name === pilot.name);
    if (pilotBlank) {
      pilot.superCharge = pilotBlank.superCharge; // Update superCharge to match pilots_blank.json
    }
  });

  localStorage.setItem("pilots", JSON.stringify(pilots)); // Save updated pilots back to local storage
}

// Fonction pour pré-remplir le formulaire avec les données du pilote sélectionné
function maxPilotForm() {
  HTML.pilotCurrentStars.value = 5
  HTML.currentLevel.value = 50
  HTML.currentRMJ.value = 40
  HTML.highestRMJ.value = 40
}

export {
  sortPilotsBlank,
  populatePilotForm,
  updatePilotFormFranchise,
  addPilotsToTable,
  submitPilotForm,
  filterPilotTable,
  applyPilotSearch,
  synchronizeLocalStorageWithPilotsBlank,
  maxPilotForm
};
