import {
  calculatePilotShardsNeeded,
  calculateCoinsNeeded,
  calculatePilotShardsToGet,
  calculateTotal,
  calculatePilotShardsNextStar,
  calculateCoinsNextStar,
} from "./compute";
import { createGetTrad, translate, getTradKey } from "./trad";
import pilotsBlank from "./data/pilots/pilots_blank.json";

const pilotTableBody = document.getElementById("pilotTableBody");
const pilotSearchInput = document.getElementById("pilotSearchInput");
const togglePilotImage = document.getElementById("togglePilotImage");
const togglePilotFranchise = document.getElementById("togglePilotFranchise");
const togglePilotRarity = document.getElementById("togglePilotRarity");
const togglePilotRole = document.getElementById("togglePilotRole");
const togglePilotName = document.getElementById("togglePilotName");
const togglePilotStar = document.getElementById("togglePilotStar");
const togglePilotCurrentShard = document.getElementById(
  "togglePilotCurrentShard"
);
const togglePilotLevel = document.getElementById("togglePilotLevel");
const togglePilotCurrentMPR = document.getElementById("togglePilotCurrentMPR");
const togglePilotHighestMPR = document.getElementById("togglePilotHighestMPR");
const togglePilotGrade = document.getElementById("togglePilotGrade");
const togglePilotShardNeeded = document.getElementById(
  "togglePilotShardNeeded"
);
const togglePilotShardMPR = document.getElementById("togglePilotShardMPR");
const togglePilotUpgrade = document.getElementById("togglePilotUpgrade");
const togglePilotBox = document.getElementById("togglePilotBox");
const togglePilotShardStar = document.getElementById(
  "togglePilotShardNextStar"
);
const togglePilotCoinStar = document.getElementById("togglePilotCoinStar");

// Fonction utilitaire pour déterminer si le style doit être caché
function getStyleIfActive(toggleElement) {
  return toggleElement.classList.contains("active")
    ? 'style="display: none;"'
    : "";
}

// Fonction pour ajouter un pilote à la table
function addPilotToTable(pilot, index, lang, pilotTableBody) {
  const getTrad = createGetTrad(lang);
  const shardsNeeded = calculatePilotShardsNeeded(
    pilot.currentLevel,
    pilot.currentShards
  );
  const shardsToNextStar = calculatePilotShardsNextStar(
    pilot.currentLevel,
    pilot.currentShards,
    pilot.currentStars
  );
  const coinsToNextStar = calculateCoinsNextStar(
    pilot.currentLevel,
    pilot.currentStars
  );
  const coinsNeeded = calculateCoinsNeeded(pilot.currentLevel);
  const shardsToGet = calculatePilotShardsToGet(pilot.highestRMJ, 40);

  // Déterminez la classe en fonction de shardsNeeded
  let shardsClass = "";
  if (shardsNeeded === 0) {
    shardsClass = "shards-needed-zero";
  } else if (shardsNeeded > 20 && shardsNeeded <= 50) {
    shardsClass = "shards-needed-close";
  } else if (shardsNeeded > 0 && shardsNeeded <= 20) {
    shardsClass = "shards-needed-warning";
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
    pilotImage: togglePilotImage.classList.contains("active")
      ? "display: none;"
      : "",
    pilotFranchise: getStyleIfActive(togglePilotFranchise),
    pilotRarity: getStyleIfActive(togglePilotRarity),
    pilotRole: getStyleIfActive(togglePilotRole),
    pilotName: getStyleIfActive(togglePilotName),
    pilotStar: getStyleIfActive(togglePilotStar),
    pilotCurrentShard: getStyleIfActive(togglePilotCurrentShard),
    pilotLevel: getStyleIfActive(togglePilotLevel),
    pilotCurrentMPR: getStyleIfActive(togglePilotCurrentMPR),
    pilotHighestMPR: getStyleIfActive(togglePilotHighestMPR),
    pilotGrade: getStyleIfActive(togglePilotGrade),
    pilotShardNeeded: getStyleIfActive(togglePilotShardNeeded),
    pilotShardMPR: getStyleIfActive(togglePilotShardMPR),
    pilotUpgrade: getStyleIfActive(togglePilotUpgrade),
    pilotBox: getStyleIfActive(togglePilotBox),
    pilotShardStar: getStyleIfActive(togglePilotShardStar),
    pilotCoinStar: getStyleIfActive(togglePilotCoinStar),
  };

  row.innerHTML = `
  <td style="padding: 0; border: none; display: block; height: 80px; ${
    styles.pilotImage
  }">
      <img src="img/pilots/${
        pilot.name
      }.webp" style="width: 80px; height: auto;">
  </td>
  <td data-trad="${pilot.franchise}" ${styles.pilotFranchise}>${getTrad(
    pilot.franchise
  )}</td>
  <td data-trad="${pilot.rarity}" ${styles.pilotRarity} class="${
    pilot.rarity
  }">${getTrad(pilot.rarity)}</td>
  <td data-trad="${pilot.role}" ${styles.pilotRole} class="${
    pilot.role
  }">${getTrad(pilot.role)}</td>
  <td data-trad="${pilot.name}" ${styles.pilotName}>${getTrad(pilot.name)}</td>
  <td ${styles.pilotStar}>${pilot.currentStars}</td>
  <td class="${shardsClass}" ${styles.pilotCurrentShard}>${
    pilot.currentShards
  }</td>
  <td class="${levelClass}" ${styles.pilotLevel}>${pilot.currentLevel}</td>
  <td ${styles.pilotCurrentMPR}>${pilot.currentRMJ}</td>
  <td ${styles.pilotHighestMPR}>${pilot.highestRMJ}</td>
  <td class="${RMJClass}" ${styles.pilotGrade}></td>
  <td class="${shardsClass}" ${styles.pilotShardNeeded}>${shardsNeeded}</td>
  <td class="${shardsClass}" ${styles.pilotShardMPR}>${shardsToGet}</td>
  <td ${styles.pilotUpgrade}>${coinsNeeded}</td>
  <td ${styles.pilotBox}>${universalBox}</td>
  <td ${styles.pilotShardStar}>${shardsToNextStar}</td>
  <td ${styles.pilotCoinStar}>${coinsToNextStar}</td>
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
  document.getElementById("pilotFranchise").value = getTrad(pilot.franchise);
  document.getElementById("pilotRarity").value = pilot.rarity;
  document.getElementById("role").value = pilot.role;
  document.getElementById("pilotName").value = getTrad(pilot.name);
  document.getElementById("pilotCurrentStars").value = pilot.currentStars;
  document.getElementById("pilotCurrentShards").value = pilot.currentShards;
  document.getElementById("currentLevel").value = pilot.currentLevel;
  document.getElementById("currentRMJ").value = pilot.currentRMJ;
  document.getElementById("highestRMJ").value = pilot.highestRMJ;
  document.getElementById("pilotUniversalBox").checked = pilot.universalBox;
}

//franchise list pour le pilotForm
function updatePilotFormFranchise(lang) {
  const getTrad = createGetTrad(lang);
  const franchiseNames = document.getElementById("pilotFranchise2");
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  const franchises = new Set();
  pilots.forEach((pilot) => {
    franchises.add(pilot.franchise);
  });
  // Récupérer les clés de la map
  franchiseNames.innerHTML =
    '<option value="" data-trad="all_franchises"></option>';
  for (const name of franchises) {
    const option = document.createElement("option");
    option.value = name; // Utiliser la clé comme valeur de l'option
    option.textContent = getTrad(name); // Utiliser la clé comme texte visible de l'option
    franchiseNames.appendChild(option);
  }
}

function submitPilotForm(
  event,
  lang,
  editingPilotIndex,
  pilotTableBody,
  pilotForm,
  pilotSubmitBtn,
  goal,
  levelGoal
) {
  const getTrad = createGetTrad(lang);
  event.preventDefault();
  let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  const pilot =
    pilots.find((pilot) => {
      return getTrad(pilot.name) === document.getElementById("pilotName").value;
    }) || {};

  // Récupérer les valeurs du formulaire
  const franchise = getTradKey(
    document.getElementById("pilotFranchise").value,
    lang
  );
  const pilotName = getTradKey(
    document.getElementById("pilotName").value,
    lang
  );
  const pilotcurrentStars = parseInt(
    document.getElementById("pilotCurrentStars").value,
    10
  );
  const pilotCurrentShards = parseInt(
    document.getElementById("pilotCurrentShards").value,
    10
  );

  const currentLevel = parseInt(
    document.getElementById("currentLevel").value,
    10
  );

  let isValid = checkFormValidity(
    pilotName,
    editingPilotIndex,
    pilots,
    pilotcurrentStars,
    currentLevel,
    pilotCurrentShards,
    franchise
  );

  if (isValid) {
    // Créer l'objet pilote
    const editPilot = {
      franchise:
        document.getElementById("pilotFranchise2").value === ""
          ? franchise
          : document.getElementById("pilotFranchise2").value,
      rarity: document.getElementById("pilotRarity").value,
      role: document.getElementById("role").value,
      name: pilotName,
      currentStars: pilotcurrentStars,
      currentShards: pilotCurrentShards,
      currentLevel: currentLevel,
      currentRMJ: parseInt(document.getElementById("currentRMJ").value, 10),
      highestRMJ: parseInt(document.getElementById("highestRMJ").value, 10),
      universalBox: document.getElementById("pilotUniversalBox").checked,
    };
    savePilotData(editPilot, editingPilotIndex);
    const sortColumn = document.querySelector(
      "th[data-order]:not([data-order='default'])"
    );
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
    editingPilotIndex = null; // Réinitialiser l'index d'édition
  }
}

function checkFormValidity(
  pilotName,
  editingPilotIndex,
  pilots,
  pilotCurrentStars,
  currentLevel,
  pilotCurrentShards,
  franchise
) {
  let isValid = true;
  const pilotCurrentShardsError = document.getElementById(
    "pilotCurrentShardsError"
  );
  const pilotNameError = document.getElementById("pilotNameError");
  const pilotDuplicateError = document.getElementById("pilotDuplicateError");
  const pilotcurrentStarsError = document.getElementById(
    "pilotCurrentStarsError"
  );
  const franchise2 = document.getElementById("pilotFranchise2").value;
  const pilotFranchiseError = document.getElementById("pilotFranchiseError");
  const currentLevelError = document.getElementById("currentLevelError");
  const currentRMJ = parseInt(document.getElementById("currentRMJ").value, 10);
  const currentRMJError = document.getElementById("currentRMJError");
  const highestRMJ = parseInt(document.getElementById("highestRMJ").value, 10);
  const highestRMJError = document.getElementById("highestRMJError");
  if (franchise === "" && franchise2 === "") {
    // pilotFranchiseError.style.display = "block";
    showElement(pilotFranchiseError);
    isValid = false;
  } else {
    // pilotFranchiseError.style.display = "none";
    hideElement(pilotFranchiseError);
  }
  if (pilotName === "") {
    pilotNameError.style.display = "block";
    isValid = false;
  } else {
    pilotNameError.style.display = "none";
  }
  if (editingPilotIndex === null) {
    const duplicatePilot = pilots.find((pilot) => pilot.name === pilotName);
    if (duplicatePilot) {
      pilotDuplicateError.style.display = "block";
      isValid = false;
    } else {
      pilotDuplicateError.style.display = "none";
    }
  }
  if (
    pilotCurrentStars < 0 ||
    pilotCurrentStars > 5 ||
    isNaN(pilotCurrentStars)
  ) {
    showElement(pilotcurrentStarsError);
    isValid = false;
  } else {
    hideElement(pilotcurrentStarsError);
  }
  if (currentLevel < 0 || currentLevel > 50 || isNaN(currentLevel)) {
    showElement(currentLevelError);
    isValid = false;
  } else {
    hideElement(currentLevelError);
  }
  if (
    pilotCurrentShards < 0 ||
    pilotCurrentShards > 200 ||
    isNaN(pilotCurrentShards)
  ) {
    showElement(pilotCurrentShardsError);
    isValid = false;
  } else {
    hideElement(pilotCurrentShardsError);
  }
  if (currentRMJ < 0 || currentRMJ > 40 || isNaN(currentRMJ)) {
    showElement(currentRMJError);
    isValid = false;
  } else {
    hideElement(currentRMJError);
  }
  if (highestRMJ < 0 || highestRMJ > 40 || isNaN(highestRMJ)) {
    showElement(highestRMJError);
    isValid = false;
  } else {
    hideElement(highestRMJError);
  }

  return isValid;
}

function hideElement(element) {
  element.style.opacity = 0;
}

function showElement(element) {
  element.style.opacity = 1;
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
  const franchiseFilter = document.getElementById("pilotFranchiseFilter").value;
  const rarityFilter = document.getElementById("pilotRarityFilter").value;
  const roleFilter = document.getElementById("roleFilter").value;
  const shardsFilter = document.getElementById("pilotShardsFilter").value;
  const boxesFilter = document.getElementById("pilotBoxesFilter").value;
  const rmjFilter = document.getElementById("rmjFilter").value;
  const levelFilter = document.getElementById("levelFilter").value;

  const rows = document.querySelectorAll("#pilotTableBody tr");

  rows.forEach((row) => {
    row.style.display = "none";
    const franchiseText = row.cells[1].textContent;
    const rarityText = row.cells[2].textContent;
    const roleText = row.cells[3].textContent;
    const levelText = row.cells[7].textContent;
    const rmjText = row.cells[8].textContent;
    const shardsNeededText = row.cells[11].textContent;
    const boxesText = row.cells[14].textContent;
    const matchesFranchise =
      franchiseText.includes(getTrad(franchiseFilter)) ||
      franchiseFilter === "";
    const matchesRarity =
      rarityText.includes(getTrad(rarityFilter)) || rarityFilter === "";
    const matchesRole =
      roleText.includes(getTrad(roleFilter)) || roleFilter === "";

    let matchesShards = true;
    if (shardsFilter === "above50") {
      matchesShards = parseInt(shardsNeededText, 10) > 50;
    } else if (shardsFilter === "between21and50") {
      matchesShards =
        parseInt(shardsNeededText, 10) <= 50 &&
        parseInt(shardsNeededText, 10) > 20;
    } else if (shardsFilter === "between1and20") {
      matchesShards =
        parseInt(shardsNeededText, 10) > 0 &&
        parseInt(shardsNeededText, 10) <= 20;
    } else if (shardsFilter === "not_finished") {
      matchesShards = parseInt(shardsNeededText, 10) >= 1;
    } else if (shardsFilter !== "") {
      matchesShards =
        parseInt(shardsNeededText, 10) <= parseInt(shardsFilter, 10);
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
      matchesLevel =
        parseInt(levelText, 10) > 0 && parseInt(levelText, 10) < 20;
    } else if (levelFilter === "20") {
      matchesLevel =
        parseInt(levelText, 10) > 19 && parseInt(levelText, 10) < 30;
    } else if (levelFilter === "30") {
      matchesLevel =
        parseInt(levelText, 10) > 29 && parseInt(levelText, 10) < 40;
    } else if (levelFilter === "40") {
      matchesLevel =
        parseInt(levelText, 10) > 39 && parseInt(levelText, 10) < 45;
    } else if (levelFilter === "45") {
      matchesLevel =
        parseInt(levelText, 10) > 44 && parseInt(levelText, 10) < 50;
    } else if (levelFilter === "50") {
      matchesLevel = parseInt(levelText, 10) === 50;
    }

    const matchesSearch = row.textContent
      .toLowerCase()
      .includes(pilotSearchInput.value.toLowerCase());
    if (
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

  pilots.sort((pilotA, pilotB) => {
    if (order === "asc") return pilotA[column] - pilotB[column];
    return pilotB[column] - pilotA[column];
  });
  localStorage.setItem("pilots", JSON.stringify(pilots));
}

export function emptyPilotsTable() {
  pilotTableBody.innerHTML = "";
}

export {
  sortPilotsBlank,
  populatePilotForm,
  updatePilotFormFranchise,
  addPilotsToTable,
  submitPilotForm,
  filterPilotTable,
  applyPilotSearch,
};
