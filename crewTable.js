import { calculateCrewShardsNeeded, calculateTotal } from "./compute";
import { createGetTrad, translate, getTradKey } from "./trad";
import crewsBlank from "./data/crews/crews_blank.json";

const crewSearchInput = document.getElementById("crewSearchInput");
const toggleCrewImage = document.getElementById("toggleCrewImage");
const toggleCrewFranchise = document.getElementById("toggleCrewFranchise");
const toggleCrewRarity = document.getElementById("toggleCrewRarity");
const toggleCrewName = document.getElementById("toggleCrewName");
const toggleCrewLevel = document.getElementById("toggleCrewStar");
const toggleCrewCurrentShard = document.getElementById("toggleCrewCurrentShard");
const toggleCrewShardNeeded = document.getElementById("toggleCrewShardNeeded");
const toggleCrewBox = document.getElementById("toggleCrewBox");

// Fonction utilitaire pour déterminer si le style doit être caché
function getStyleIfActive(toggleElement) {
  return toggleElement.classList.contains("active") ? 'style="display: none;"' : "";
}

function updateCrewWithShardsNeeded(crew, index) {
  const shardsNeeded = calculateCrewShardsNeeded(crew);
  crew.shardsNeeded = shardsNeeded;
  saveCrewData(crew, index);
}

function updateCrewsWithShardsNeeded() {
  const crews = JSON.parse(localStorage.getItem("crews")) || [];
  crews.forEach((crew, index) => {
    updateCrewWithShardsNeeded(crew, index);
  });
}

// Fonction pour ajouter un crew à la table
function addCrewToTable(crew, index, lang, crewTableBody) {
  const getTrad = createGetTrad(lang);

  // Déterminez la classe en fonction de shardsNeeded
  let shardsClass = "";
  if (crew.shardsNeeded === 0) {
    shardsClass = "shards-needed-zero";
  } else if (crew.rarity === "Epic" && crew.shardsNeeded > 0 && crew.shardsNeeded <= 25) {
    shardsClass = "shards-needed-warning";
  } else if (crew.shardsNeeded > 20 && crew.shardsNeeded <= 50) {
    shardsClass = "shards-needed-close";
  } else if (crew.shardsNeeded > 0 && crew.shardsNeeded <= 20) {
    shardsClass = "shards-needed-warning";
  }

  // Déterminer la classe de couleur en fonction du nombre d'étoiles
  let starclass;
  if (crew.currentStars === 0) {
    starclass = "level-gray";
  } else if (crew.currentStars === 1) {
    starclass = "level-light-red";
  } else if (crew.currentStars === 2) {
    starclass = "level-yellow";
  } else if (crew.currentStars === 3) {
    starclass = "level-green";
  } else if (crew.currentStars === 4) {
    starclass = "level-dark-blue";
  } else if (crew.currentStars === 5) {
    starclass = "level-violet";
  }

  //  Cette fonction crée et ajoute une nouvelle ligne dans un tableau HTML représentant les détails d'un equipier.
  const row = document.createElement("tr");
  row.classList.add("crew-row");

  const crewBlank = crewsBlank.find((blank) => blank.name === crew.name);
  let universalBox;
  if (crewBlank.universalBox === "season") universalBox = "🟣";
  else universalBox = crewBlank.universalBox ? "✔️" : "❌";

  // Tableau des propriétés à appliquer
  const styles = {
    crewImage: toggleCrewImage.classList.contains("active") ? "display: none;" : "",
    crewFranchise: getStyleIfActive(toggleCrewFranchise),
    crewRarity: getStyleIfActive(toggleCrewRarity),
    crewName: getStyleIfActive(toggleCrewName),
    crewCurrentShard: getStyleIfActive(toggleCrewCurrentShard),
    crewLevel: getStyleIfActive(toggleCrewLevel),
    crewShardNeeded: getStyleIfActive(toggleCrewShardNeeded),
    crewBox: getStyleIfActive(toggleCrewBox),
  };

  let outOf = ""
  if (crew.currentStars === 0 && crew.rarity !== "Epic") {
    outOf = " / 5"
  } else if (crew.currentStars === 1 && crew.rarity !== "Epic") {
    outOf = " / 15"
  } else if (crew.currentStars === 2 && crew.rarity !== "Epic") {
    outOf = " / 25"
  } else if (crew.currentStars === 3 && crew.rarity !== "Epic") {
    outOf = " / 45"
  } else if (crew.currentStars === 4 && crew.rarity !== "Epic") {
    outOf = " / 75"
  } else if (crew.currentStars === 0 && crew.rarity === "Epic") {
    outOf = " / 10"
  } else if (crew.currentStars === 1 && crew.rarity === "Epic") {
    outOf = " / 20"
  } else if (crew.currentStars === 2 && crew.rarity === "Epic") {
    outOf = " / 35"
  } else if (crew.currentStars === 3 && crew.rarity === "Epic") {
    outOf = " / 50"
  } else if (crew.currentStars === 4 && crew.rarity === "Epic") {
    outOf = " / 100"
  }

  row.innerHTML = `
    <td style="padding: 0; border: none; display: block; height: 80px; ${styles.crewImage}">
      <img onerror="this.src='img/Locked.webp'" src="img/crews/${crew.name}.webp" style="width: 80px; height: auto;">
    </td>
    <td data-trad="${crew.franchise}" ${styles.crewFranchise}>${getTrad(crew.franchise)}</td>
    <td data-trad="${crew.rarity}" ${styles.crewRarity} class="${crew.rarity}">${getTrad(crew.rarity)}</td>
    <td data-trad="${crew.name}" ${styles.crewName}>${getTrad(crew.name)}</td>
    <td class="${starclass}" ${styles.crewLevel}>${crew.currentStars}</td>
    <td class="${shardsClass}" ${styles.crewCurrentShard}>${crew.currentShards}${outOf}</td>
    <td class="${shardsClass}" ${styles.crewShardNeeded}>${crew.shardsNeeded}</td>
    <td ${styles.crewBox}>${universalBox}</td>
    <td><button data-trad="modify" class="edit-btn" data-index="${index}"></button></td>
    `;
  crewTableBody.appendChild(row);
  translate(lang);
}

function addCrewsToTable(lang, crewTableBody) {
  let crews = JSON.parse(localStorage.getItem("crews")) || [];
  crews.forEach((crew, index) => {
    addCrewToTable(crew, index, lang, crewTableBody);
  });
}

// Fonction pour enregistrer les données crews dans le stockage local
function saveCrewData(crew, editingCrewIndex) {
  let crews = JSON.parse(localStorage.getItem("crews")) || [];
  if (editingCrewIndex !== null) {
    crews[editingCrewIndex] = crew;
  } else {
    crews.push(crew);
  }
  localStorage.setItem("crews", JSON.stringify(crews));
}

// Fonction pour pré-remplir le formulaire avec les données de l'équipier sélectionné
function populateCrewForm(crew, lang) {
  const getTrad = createGetTrad(lang);
  document.getElementById("crewFranchise").value = getTrad(crew.franchise);
  document.getElementById("crewRarity").value = crew.rarity;
  document.getElementById("crewName").value = getTrad(crew.name);
  document.getElementById("crewCurrentStars").value = crew.currentStars;
  document.getElementById("crewCurrentShards").value = crew.currentShards;
  document.getElementById("crewUniversalBox").checked = crew.universalBox;
}

//franchise list pour le crewForm
function updateCrewFormFranchise(lang) {
  const getTrad = createGetTrad(lang);
  const franchiseNames = document.getElementById("crewFranchise2");
  let crews = JSON.parse(localStorage.getItem("crews")) || [];
  const franchises = new Set();
  crews.forEach((crew) => {
    franchises.add(crew.franchise);
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

function submitCrewForm(event, lang, editingCrewIndex, crewTableBody, crewForm, crewSubmitBtn, goal, levelGoal) {
  const getTrad = createGetTrad(lang);
  event.preventDefault();

  // Récupérer les valeurs du formulaire
  const franchise = getTradKey(document.getElementById("crewFranchise").value, lang);
  const crewName = getTradKey(document.getElementById("crewName").value, lang);
  const crewCurrentStars = parseInt(document.getElementById("crewCurrentStars").value, 10);
  const crewCurrentShards = parseInt(document.getElementById("crewCurrentShards").value, 10);

  let isValid = checkFormValidity(crewName, editingCrewIndex, crewCurrentStars, franchise, crewCurrentShards);

  if (isValid) {
    // Créer l'objet crew
    const editCrew = {
      franchise:
        document.getElementById("crewFranchise2").value === "" ? franchise : document.getElementById("crewFranchise2").value,
      rarity: document.getElementById("crewRarity").value,
      name: crewName,
      currentStars: crewCurrentStars,
      currentShards: crewCurrentShards,
      universalBox: document.getElementById("crewUniversalBox").checked,
    };
    updateCrewWithShardsNeeded(editCrew, editingCrewIndex);
    updateCrewFormFranchise(lang);
    crewTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
    addCrewsToTable(lang, crewTableBody);
    filterCrewTable(lang);
    crewForm.reset();
    calculateTotal(lang, goal, levelGoal);
    crewSubmitBtn.textContent = getTrad("add_crew"); // Réinitialiser le texte du bouton après ajout
    crewSubmitBtn.style.display = "none";
    editingCrewIndex = null; // Réinitialiser l'index d'édition

    document.documentElement.scrollTop = window.saveScroll;
  }
}

function checkFormValidity(crewName, editingCrewIndex, crewCurrentStars, franchise, crewCurrentShards) {
  let isValid = true;
  let crews = JSON.parse(localStorage.getItem("crews")) || [];
  const franchise2 = document.getElementById("crewFranchise2").value;
  const crewFranchiseError = document.getElementById("crewFranchiseError");
  const crewcurrentStarsError = document.getElementById("crewCurrentStarsError");
  const crewNameError = document.getElementById("crewNameError");
  const crewDuplicateError = document.getElementById("crewDuplicateError");
  const crewCurrentShardsError = document.getElementById("crewCurrentShardsError");

  // Valider les champs
  if (franchise === "" && franchise2 === "") {
    showElement(crewFranchiseError);
    isValid = false;
  } else {
    hideElement(crewFranchiseError);
  }
  if (crewName === "") {
    crewNameError.style.display = "block";
    isValid = false;
  } else {
    crewNameError.style.display = "none";
  }
  if (editingCrewIndex === null) {
    const duplicateCrew = crews.find((crew) => crew.name === crewName);
    if (duplicateCrew) {
      crewDuplicateError.style.display = "block";
      isValid = false;
    } else {
      crewDuplicateError.style.display = "none";
    }
  }
  if (crewCurrentStars < 0 || crewCurrentStars > 5 || isNaN(crewCurrentStars)) {
    showElement(crewcurrentStarsError);
    isValid = false;
  } else {
    hideElement(crewcurrentStarsError);
  }
  if (crewCurrentShards < 0 || crewCurrentShards > 100 || isNaN(crewCurrentShards)) {
    showElement(crewCurrentShardsError);
    isValid = false;
  } else {
    hideElement(crewCurrentShardsError);
  }

  return isValid;
}

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}

function applyCrewSearch(searchTerm) {
  const rows = document.querySelectorAll("#crewTableBody tr");

  rows.forEach((row) => {
    const rowText = row.textContent.toLowerCase();
    if (rowText.includes(searchTerm)) {
      row.style.display = "";
    }
  });
}

// fonction pour ordonner les équipiers automatiquement selon l'ordre du fichier crews_blank
function sortCrewsBlank() {
  // load crews
  let crews = JSON.parse(localStorage.getItem("crews")) || [];
  let orderedCrews = {};
  crewsBlank.forEach((crew, index) => {
    orderedCrews[crew.name] = index;
  });
  crews.sort((crewA, crewB) => {
    return orderedCrews[crewA.name] - orderedCrews[crewB.name];
  });

  localStorage.setItem("crews", JSON.stringify(crews));
}

function filterCrewTable(lang) {
  const getTrad = createGetTrad(lang);
  const franchiseFilter = document.getElementById("crewFranchiseFilter").value;
  const rarityFilter = document.getElementById("crewRarityFilter").value;
  const starsFilter = document.getElementById("crewStarsFilter").value;
  const shardsFilter = document.getElementById("crewShardsFilter").value;
  const boxesFilter = document.getElementById("crewBoxesFilter").value;
  const rows = document.querySelectorAll("#crewTableBody tr");

  const searchTerms = crewSearchInput.value
    .split("/")
    .map(term => term.trim().toLowerCase())
    .filter(term => term.length > 0);

  rows.forEach((row) => {
    row.style.display = "none";
    const franchiseText = row.cells[1].textContent;
    const rarityText = row.cells[2].textContent;
    const starsText = row.cells[4].textContent;
    const shardsNeededText = row.cells[6].textContent;
    const boxesText = row.cells[7].textContent;
    const matchesFranchise = franchiseText.includes(getTrad(franchiseFilter)) || franchiseFilter === "";
    const matchesRarity = rarityText.includes(getTrad(rarityFilter)) || rarityFilter === "";
    const matchesStars = starsText.includes(starsFilter) || starsFilter === "";
    const matchesBoxes = boxesText.includes(boxesFilter) || boxesFilter === "";
    let matchesSearch = true;
    if (searchTerms.length > 0) {
      const crewName = row.cells[3].textContent.toLowerCase();
      matchesSearch = searchTerms.some(term => crewName.includes(term));
    }
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

    if (matchesFranchise && matchesRarity && matchesStars && matchesShards && matchesBoxes && matchesSearch) {
      row.style.display = "";
    }
  });
}

export function sortCrewsByColumn(column, order) {
  // load pilots
  let crews = JSON.parse(localStorage.getItem("crews")) || [];

  crews.sort((crewA, crewB) => {
    if (order === "asc") return crewA[column] - crewB[column];
    return crewB[column] - crewA[column];
  });
  localStorage.setItem("crews", JSON.stringify(crews));
}

export function emptyCrewsTable() {
  crewTableBody.innerHTML = "";
}

export {
  updateCrewsWithShardsNeeded,
  addCrewToTable,
  saveCrewData,
  populateCrewForm,
  addCrewsToTable,
  updateCrewFormFranchise,
  submitCrewForm,
  filterCrewTable,
  applyCrewSearch,
  sortCrewsBlank,
};
