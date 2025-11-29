import { calculateCrewShardsNeeded, calculateTotal } from "./compute";
import { createGetTrad, translate, getTradKey } from "./trad";
import crewsBlank from "./data/crews/crews_blank.json";
import * as HTML from "./ElementById";
import { Crew, Language, Rarity } from "./types";
import { StorageService } from "./StorageService";
import { UIManager } from "./UIManager";

const storage = StorageService.getInstance();

// Fonction utilitaire pour déterminer si le style doit être caché
function getStyleIfActive(toggleElement: HTMLElement) {
  return toggleElement.classList.contains("active") ? 'style="display: none;"' : "";
}

function updateCrewWithShardsNeeded(crew: Crew, index: number) {
  const shardsNeeded = calculateCrewShardsNeeded(crew);
  crew.shardsNeeded = shardsNeeded;
  saveCrewData(crew, index);
}

function updateCrewsWithShardsNeeded() {
  const crews = storage.getCrews();
  crews.forEach((crew, index) => {
    updateCrewWithShardsNeeded(crew, index);
  });
}

// Fonction pour ajouter un crew à la table
function addCrewToTable(crew: Crew, index: number, lang: Language, crewTableBody: HTMLTableSectionElement) {
  const getTrad = createGetTrad(lang);

  // Déterminez la classe en fonction de shardsNeeded
  let shardsClass = "";
  if (crew.shardsNeeded === 0) {
    shardsClass = "shards-needed-zero";
  } else if (crew.rarity === "Epic" && crew.shardsNeeded && crew.shardsNeeded > 0 && crew.shardsNeeded <= 25) {
    shardsClass = "shards-needed-warning";
  } else if (crew.shardsNeeded && crew.shardsNeeded > 20 && crew.shardsNeeded <= 50) {
    shardsClass = "shards-needed-close";
  } else if (crew.shardsNeeded && crew.shardsNeeded > 0 && crew.shardsNeeded <= 20) {
    shardsClass = "shards-needed-warning";
  }

  // Déterminer la classe de couleur en fonction du nombre d'étoiles
  let starclass = "";
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
  if (!crewBlank) return;

  let universalBox;
  if (crewBlank.universalBox === "season") universalBox = "🟣";
  else universalBox = crewBlank.universalBox ? "✔️" : "❌";

  // Tableau des propriétés à appliquer
  const styles = {
    crewImage: HTML.toggleCrewImage.classList.contains("active") ? "display: none;" : "",
    crewFranchise: getStyleIfActive(HTML.toggleCrewFranchise),
    crewRarity: getStyleIfActive(HTML.toggleCrewRarity),
    crewName: getStyleIfActive(HTML.toggleCrewName),
    crewCurrentShard: getStyleIfActive(HTML.toggleCrewCurrentShard),
    crewLevel: getStyleIfActive(HTML.toggleCrewStar),
    crewShardNeeded: getStyleIfActive(HTML.toggleCrewShardNeeded),
    crewBox: getStyleIfActive(HTML.toggleCrewBox),
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

function addCrewsToTable(lang: Language, crewTableBody: HTMLTableSectionElement) {
  const crews = storage.getCrews();
  crews.forEach((crew, index) => {
    addCrewToTable(crew, index, lang, crewTableBody);
  });
}

// Fonction pour enregistrer les données crews dans le stockage local
function saveCrewData(crew: Crew, editingCrewIndex: number | null) {
  const crews = storage.getCrews();
  if (editingCrewIndex !== null) {
    crews[editingCrewIndex] = crew;
  } else {
    crews.push(crew);
  }
  storage.saveCrews(crews);
}

// Fonction pour pré-remplir le formulaire avec les données de l'équipier sélectionné
function populateCrewForm(crew: Crew, lang: Language) {
  const getTrad = createGetTrad(lang);
  HTML.crewFranchise.value = getTrad(crew.franchise);
  HTML.crewRarity.value = crew.rarity;
  HTML.crewName.value = getTrad(crew.name);
  HTML.crewCurrentStars.value = crew.currentStars.toString();
  HTML.crewCurrentShards.value = crew.currentShards.toString();
  HTML.crewUniversalBox.checked = crew.universalBox === true;
}

//franchise list pour le crewForm
function updateCrewFormFranchise(lang: Language) {
  const getTrad = createGetTrad(lang);
  const franchiseNames = HTML.crewFranchise2;
  const crews = storage.getCrews();
  const franchises = new Set<string>();
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

function submitCrewForm(event: Event, lang: Language, editingCrewIndex: number | null, crewTableBody: HTMLTableSectionElement, crewForm: HTMLFormElement, crewSubmitBtn: HTMLButtonElement, goal: number, levelGoal: number) {
  const getTrad = createGetTrad(lang);
  event.preventDefault();

  // Récupérer les valeurs du formulaire
  const franchise = getTradKey(HTML.crewFranchise.value, lang) || "";
  const crewName = getTradKey(HTML.crewName.value, lang) || "";
  const crewCurrentStars = parseInt(HTML.crewCurrentStars.value, 10);
  const crewCurrentShards = parseInt(HTML.crewCurrentShards.value, 10);

  const isValid = checkFormValidity(crewName, editingCrewIndex, crewCurrentStars, franchise, crewCurrentShards);

  if (isValid) {
    // Créer l'objet crew
    const editCrew: Crew = {
      franchise:
        HTML.crewFranchise2.value === "" ? franchise : HTML.crewFranchise2.value,
      rarity: HTML.crewRarity.value as Rarity,
      name: crewName,
      currentStars: crewCurrentStars,
      currentShards: crewCurrentShards,
      universalBox: HTML.crewUniversalBox.checked,
    };
    updateCrewWithShardsNeeded(editCrew, editingCrewIndex!);
    updateCrewFormFranchise(lang);
    crewTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
    addCrewsToTable(lang, crewTableBody);
    filterCrewTable(lang);
    crewForm.reset();
    const stats = calculateTotal(goal, levelGoal);
    UIManager.getInstance().updateTotalStats(stats, levelGoal, lang);
    crewSubmitBtn.textContent = getTrad("add_crew"); // Réinitialiser le texte du bouton après ajout
    crewSubmitBtn.style.display = "none";
    editingCrewIndex = null; // Réinitialiser l'index d'édition

    // document.documentElement.scrollTop = window.saveScroll;
  }
}

function checkFormValidity(crewName: string, editingCrewIndex: number | null, crewCurrentStars: number, franchise: string, crewCurrentShards: number) {
  let isValid = true;
  const crews = storage.getCrews();
  const franchise2 = HTML.crewFranchise2.value;
  const crewFranchiseError = HTML.crewFranchiseError;
  const crewcurrentStarsError = HTML.crewCurrentStarsError;
  const crewNameError = HTML.crewNameError;
  const crewDuplicateError = HTML.crewDuplicateError;
  const crewCurrentShardsError = HTML.crewCurrentShardsError;

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

function hideElement(element: HTMLElement) {
  element.style.display = "none";
}

function showElement(element: HTMLElement) {
  element.style.display = "block";
}

function applyCrewSearch(searchTerm: string) {
  const rows = document.querySelectorAll("#crewTableBody tr");

  rows.forEach((row) => {
    const rowText = row.textContent?.toLowerCase() || "";
    if (rowText.includes(searchTerm)) {
      (row as HTMLElement).style.display = "";
    }
  });
}

// fonction pour ordonner les équipiers automatiquement selon l'ordre du fichier crews_blank
function sortCrewsBlank() {
  // load crews
  const crews = storage.getCrews();
  const orderedCrews: { [key: string]: number } = {};
  crewsBlank.forEach((crew, index) => {
    orderedCrews[crew.name] = index;
  });
  crews.sort((crewA, crewB) => {
    return orderedCrews[crewA.name] - orderedCrews[crewB.name];
  });

  storage.saveCrews(crews);
}

function filterCrewTable(lang: Language) {
  const getTrad = createGetTrad(lang);
  const franchiseFilter = HTML.crewFranchiseFilter.value;
  const rarityFilter = HTML.crewRarityFilter.value;
  const starsFilter = HTML.crewStarsFilter.value;
  const shardsFilter = HTML.crewShardsFilter.value;
  const boxesFilter = HTML.crewBoxesFilter.value;
  const rows = document.querySelectorAll("#crewTableBody tr");

  const searchTerms = HTML.crewSearchInput.value
    .split("/")
    .map(term => term.trim().toLowerCase())
    .filter(term => term.length > 0);

  rows.forEach((row) => {
    const tr = row as HTMLTableRowElement;
    tr.style.display = "none";
    const franchiseText = tr.cells[1].textContent || "";
    const rarityText = tr.cells[2].textContent || "";
    const starsText = tr.cells[4].textContent || "";
    const shardsNeededText = tr.cells[6].textContent || "0";
    const boxesText = tr.cells[7].textContent || "";
    const matchesFranchise = franchiseText.includes(getTrad(franchiseFilter)) || franchiseFilter === "";
    const matchesRarity = rarityText.includes(getTrad(rarityFilter)) || rarityFilter === "";
    const matchesStars = starsText.includes(starsFilter) || starsFilter === "";
    const matchesBoxes = boxesText.includes(boxesFilter) || boxesFilter === "";
    let matchesSearch = true;
    if (searchTerms.length > 0) {
      const crewName = tr.cells[3].textContent?.toLowerCase() || "";
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
      tr.style.display = "";
    }
  });
}

export function sortCrewsByColumn(column: keyof Crew, order: string) {
  // load pilots
  const crews = storage.getCrews();

  crews.sort((crewA, crewB) => {
    const valA = crewA[column];
    const valB = crewB[column];
    if (!valA && !valB) return 0;
    if (!valA) return order === "asc" ? -1 : 1;
    if (!valB) return order === "asc" ? 1 : -1;
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
  storage.saveCrews(crews);
}

export function emptyCrewsTable() {
  HTML.crewTableBody.innerHTML = "";
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
