import { calculateTotal } from "./compute.js";
import {
  populateCrewForm,
  updateCrewFormFranchise,
  addCrewsToTable,
  submitCrewForm,
  filterCrewTable,
  updateCrewsWithShardsNeeded,
  sortCrews,
} from "./crewTable.js";
import { updateFilterOptions } from "./filters.js";
import {
  populatePilotForm,
  updatePilotFormFranchise,
  addPilotsToTable,
  submitPilotForm,
  filterPilotTable,
  sortPilotsBlank,
  emptyPilotsTable,
  sortPilotsByColumn,
} from "./pilotTable.js";
import pilotsBlank from "./data/pilots/pilots_blank.json";
import crewsBlank from "./data/crews/crews_blank.json";
import { createGetTrad, translate } from "./trad.js";

let getTrad = createGetTrad("fr");

let theme = "";
let lang = "en";
let mode = "pilot";
let goal = 40;
let levelGoal = 50;
// const dev = true;

// Attempt to maximize the window on page load
window.onload = function () {
  window.moveTo(0, 0);
  window.resizeTo(screen.width, screen.height);
};

// Récupère le formulaire et le corps du tableau
const pilotForm = document.getElementById("pilotForm");
const crewForm = document.getElementById("crewForm");
let pilotTableBody = document.getElementById("pilotTableBody");
let crewTableBody = document.getElementById("crewTableBody");
const pilotSubmitBtn = document.getElementById("pilotSubmitBtn");
const crewSubmitBtn = document.getElementById("crewSubmitBtn");
const pilotExportButton = document.getElementById("pilotDownloadJSON");
const pilotImportButton = document.getElementById("pilotImportJSON");
const crewExportButton = document.getElementById("crewDownloadJSON");
const crewImportButton = document.getElementById("crewImportJSON");
const tradButton = document.getElementById("tradButton");
const buttonMode = document.getElementById("buttonMode");
const selectTheme = document.getElementById("selectTheme");
const background = document.getElementById("background");
const saveButton = document.getElementById("saveSetting");
const settingsButton = document.getElementById("settings");
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
const toggleCrewImage = document.getElementById("toggleCrewImage");
const toggleCrewFranchise = document.getElementById("toggleCrewFranchise");
const toggleCrewRarity = document.getElementById("toggleCrewRarity");
const toggleCrewName = document.getElementById("toggleCrewName");
const toggleCrewStar = document.getElementById("toggleCrewStar");
const toggleCrewCurrentShard = document.getElementById(
  "toggleCrewCurrentShard"
);
const toggleCrewShardNeeded = document.getElementById("toggleCrewShardNeeded");
const toggleCrewBox = document.getElementById("toggleCrewBox");
const pilotSearchInput = document.getElementById("pilotSearchInput");
const goalSelect = document.getElementById("goalSelect");
const levelGoalSelect = document.getElementById("levelGoalSelect");
const sortButtons = document.querySelectorAll("th[data-sort]");
let editingPilotIndex = null; // Pour suivre quel pilote est en cours de modification
let editingCrewIndex = null; // Pour suivre quel equipier est en cours de modification

function bindSortButtons() {
  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((b) => {
        if (b !== button) b.dataset.order = "default";
      });
      const column = button.dataset.sort;
      const currentOrder = button.dataset.order || "default";
      const nextOrder = {
        default: "desc",
        desc: "asc",
        asc: "default",
      }[currentOrder];
      button.dataset.order = nextOrder;
      if (nextOrder === "default") sortPilotsBlank();
      else sortPilotsByColumn(column, nextOrder);
      emptyPilotsTable();
      addPilotsToTable(lang, pilotTableBody /*, goal */);
    });
  });
}

//Fonction pour changer de language
function changeLang() {
  lang = lang === "fr" ? (lang = "en") : (lang = "fr");
  getTrad = createGetTrad(lang);
  updateFilterOptions(lang);
  updatePilotFormFranchise(lang);
  updateCrewFormFranchise(lang);
  updatePlaceholders();
  translate(lang);
  calculateTotal(lang, goal, levelGoal);
  switchTheme();
  selectTheme.value = theme;
}

// Gère la soumission du formulaire de pilote
pilotForm.addEventListener("submit", (event) =>
  submitPilotForm(
    event,
    lang,
    editingPilotIndex,
    pilotTableBody,
    pilotForm,
    pilotSubmitBtn,
    goal,
    levelGoal
  )
);

// Gère la soumission du formulaire de crew
crewForm.addEventListener("submit", (event) =>
  submitCrewForm(
    event,
    lang,
    editingCrewIndex,
    crewTableBody,
    crewForm,
    crewSubmitBtn,
    goal,
    levelGoal
  )
);

function clickModifyPilot(event) {
  if (event.target.classList.contains("edit-btn")) {
    const index = event.target.dataset.index;
    let pilots = JSON.parse(localStorage.getItem("pilots")) || [];
    const pilot = pilots[index];
    populatePilotForm(pilot, lang);
    pilotSubmitBtn.textContent = getTrad("update_pilot"); // Changer le texte du bouton lors de la modification
    pilotSubmitBtn.style.display = "";
    editingPilotIndex = index; // Enregistrer l'index du pilote en cours de modification
  }
}

function clickModifyCrew(event) {
  if (event.target.classList.contains("edit-btn")) {
    const index = event.target.dataset.index;
    let crews = JSON.parse(localStorage.getItem("crews")) || [];
    const crew = crews[index];
    populateCrewForm(crew, lang);
    crewSubmitBtn.textContent = getTrad("update_crew"); // Changer le texte du bouton lors de la modification
    crewSubmitBtn.style.display = "";
    editingCrewIndex = index; // Enregistrer l'index de l'Equipier en cours de modification
  }
}

// Gère le clic sur le bouton Modifier de la table pilot
pilotTableBody.addEventListener("click", (event) => clickModifyPilot(event));

// // Gère le clic sur le bouton Modifier de la table crew
crewTableBody.addEventListener("click", (event) => clickModifyCrew(event));

function updatePlaceholders() {
  const crewSearchInput = document.getElementById("crewSearchInput");
  pilotSearchInput.placeholder = getTrad("search_placeholder");
  crewSearchInput.placeholder = getTrad("search_placeholder");
}

// Fonction de recherche globale pour les pilotes
document
  .getElementById("pilotSearchInput")
  .addEventListener("keyup", () => filterPilotTable(lang));

// Fonction de recherche globale pour les crews
document
  .getElementById("crewSearchInput")
  .addEventListener("keyup", function () {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll("#crewTableBody tr");

    rows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(searchTerm) ? "" : "none";
    });
  });

// Fonction de filtrage par colonnes pour les pilotes
document.querySelectorAll(".pilotFilter").forEach((filter) => {
  filter.addEventListener("change", () => filterPilotTable(lang));
});

// Fonction de filtrage par colonnes pour les Equipiers
document.querySelectorAll(".crewFilter").forEach((filter) => {
  filter.addEventListener("change", () => filterCrewTable(lang));
});

buttonMode.addEventListener("click", () => switchTable());
goalSelect.addEventListener("change", () => switchGoal());
levelGoalSelect.addEventListener("change", () => switchLevelGoal());
selectTheme.addEventListener("change", () => {
  background.style.backgroundImage = `url("img/backgrounds/background season${selectTheme.value}.webp")`;
  theme = selectTheme.value;
});
tradButton.addEventListener("click", () => changeLang());
saveButton.addEventListener("click", () => saveSettings());
settingsButton.addEventListener("click", () => openSettings());

// Gérer l'affichage des colonnes pour les Pilots
togglePilotImage.addEventListener("click", (e) => togglePilotColumn(0, e));
togglePilotFranchise.addEventListener("click", (e) => togglePilotColumn(1, e));
togglePilotRarity.addEventListener("click", (e) => togglePilotColumn(2, e));
togglePilotRole.addEventListener("click", (e) => togglePilotColumn(3, e));
togglePilotName.addEventListener("click", (e) => togglePilotColumn(4, e));
togglePilotStar.addEventListener("click", (e) => togglePilotColumn(5, e));
togglePilotCurrentShard.addEventListener("click", (e) =>
  togglePilotColumn(6, e)
);
togglePilotLevel.addEventListener("click", (e) => togglePilotColumn(7, e));
togglePilotCurrentMPR.addEventListener("click", (e) => togglePilotColumn(8, e));
togglePilotHighestMPR.addEventListener("click", (e) => togglePilotColumn(9, e));
togglePilotGrade.addEventListener("click", (e) => togglePilotColumn(10, e));
togglePilotShardNeeded.addEventListener("click", (e) =>
  togglePilotColumn(11, e)
);
togglePilotShardMPR.addEventListener("click", (e) => togglePilotColumn(12, e));
togglePilotUpgrade.addEventListener("click", (e) => togglePilotColumn(13, e));
togglePilotBox.addEventListener("click", (e) => togglePilotColumn(14, e));
togglePilotShardStar.addEventListener("click", (e) => togglePilotColumn(15, e));
togglePilotCoinStar.addEventListener("click", (e) => togglePilotColumn(16, e));

// Gérer l'affichage des colonnes pour les Crew
toggleCrewImage.addEventListener("click", () => toggleCrewColumn(0));
toggleCrewFranchise.addEventListener("click", () => toggleCrewColumn(1));
toggleCrewRarity.addEventListener("click", () => toggleCrewColumn(2));
toggleCrewName.addEventListener("click", () => toggleCrewColumn(3));
toggleCrewStar.addEventListener("click", () => toggleCrewColumn(4));
toggleCrewCurrentShard.addEventListener("click", () => toggleCrewColumn(5));
toggleCrewShardNeeded.addEventListener("click", () => toggleCrewColumn(6));
toggleCrewBox.addEventListener("click", () => toggleCrewColumn(7));

// Import Pilots Button
pilotImportButton.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const pilots = JSON.parse(text);
      localStorage.setItem("pilots", JSON.stringify(pilots));
      pilotTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
      addPilotsToTable(lang, pilotTableBody);
      updatePilotFormFranchise(lang);
    };
    reader.readAsText(file);
  };
  input.click();
});

pilotExportButton.addEventListener("click", () => {
  const pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  const filename = "pilots.json";
  const text = JSON.stringify(pilots, null, 2);
  download(filename, text);
});

crewImportButton.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const crews = JSON.parse(text);
      localStorage.setItem("crews", JSON.stringify(crews));
      crewTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
      addCrewsToTable(lang, crewTableBody);
      updateCrewFormFranchise(lang);
    };
    reader.readAsText(file);
  };
  input.click();
});

crewExportButton.addEventListener("click", () => {
  const crews = JSON.parse(localStorage.getItem("crews")) || [];
  const filename = "crews.json";
  const text = JSON.stringify(crews, null, 2);
  download(filename, text);
});

// Fonction pour export les data dans un fichier json
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Fonction pour afficher / masquer une colonne du tableau pilot
function togglePilotColumn(index, event) {
  const table = document.getElementById("pilotTable");
  const rows = table.rows;
  const isHidden = rows[0].cells[index].style.display === "none";

  for (var i = 0; i < rows.length; i++) {
    rows[i].cells[index].style.display = isHidden ? "" : "none";
  }
  // Change the button color
  changeButtonColor(event.target);
}

// Fonction pour afficher / masquer une colonne du tableau crew
function toggleCrewColumn(index) {
  const table = document.getElementById("crewTable");
  const rows = table.rows;
  const isHidden = rows[0].cells[index].style.display === "none";

  for (var i = 0; i < rows.length; i++) {
    rows[i].cells[index].style.display = isHidden ? "" : "none";
  }
  // Change the button color
  changeButtonColor(event.target);
}

// Fonction pour changer la couleur du bouton
function changeButtonColor(button) {
  // Bascule la classe 'active' sur le bouton cliqué
  button.classList.toggle("active");
}

function switchGoal() {
  goal = goalSelect.value;
  // goal = goal === 40 ? (goal = 31) : (goal = 40);
  calculateTotal(lang, goal, levelGoal);
}

function switchLevelGoal() {
  levelGoal = levelGoalSelect.value;
  calculateTotal(lang, goal, levelGoal);
}

function switchTheme() {
  selectTheme.innerHTML =
    '<option value="" data-trad="select_theme">' +
    getTrad("select_theme") +
    "</option>";

  for (let i = 1; i <= 10; i++) {
    const season = document.createElement("option");
    season.value = i;
    season.textContent = getTrad("season" + i);
    selectTheme.appendChild(season);
  }
}

function switchTable() {
  mode = mode === "pilot" ? "crew" : "pilot";
  const pilotTable = document.getElementById("pilotTable");
  const pilotForm = document.getElementById("pilotForm");
  const pilotFilter = document.getElementById("pilot-filter-container");
  const pilothide = document.getElementById("pilotHide");
  const crewTable = document.getElementById("crewTable");
  const crewForm = document.getElementById("crewForm");
  const crewFilter = document.getElementById("crew-filter-container");
  const crewhide = document.getElementById("crewHide");

  if (mode === "pilot") {
    pilotTable.style.display = "table"; // Affiche le tableau des pilotes
    pilotForm.style.display = "grid"; // Affiche le formulaire des pilotes
    pilotFilter.style.display = "flex"; // Affiche le filtrage des pilotes
    pilothide.style.display = ""; // Affiche le masqueur de colonne des pilotes
    crewTable.style.display = "none"; // Cache le tableau des Equipiers
    crewForm.style.display = "none"; // Cache le formulaire des Equipiers
    crewFilter.style.display = "none"; // Cache le filtrage des Equipiers
    crewhide.style.display = "none"; // Cache le masqueur de colonne des Equipiers
    buttonMode.dataset.trad = "Pilots";
  } else {
    pilotTable.style.display = "none"; // Cache le tableau des pilotes
    pilotForm.style.display = "none"; // Cache le formulaire des pilotes
    pilotFilter.style.display = "none"; // Cache le filtrage des pilotes
    pilothide.style.display = "none"; // Cache le masqueur de colonne des pilotes
    crewTable.style.display = "table"; // Affiche le tableau des Equipiers
    crewForm.style.display = "grid"; // Affiche le formulaire des Equipiers
    crewFilter.style.display = "flex"; // Affiche le filtrage des Equipiers
    crewhide.style.display = ""; // Affiche le masqueur de colonne des Equipiers
    buttonMode.dataset.trad = "Crews";
  }
  translate(lang);
}

function mergePilotsAndCrews() {
  const pilots = JSON.parse(localStorage.getItem("pilots")) || [];
  pilotsBlank.forEach((pilot) => {
    const existingPilot = pilots.find((p) => p.name === pilot.name);
    if (!existingPilot) {
      pilots.push(pilot);
    }
    localStorage.setItem("pilots", JSON.stringify(pilots));
  });
  const crews = JSON.parse(localStorage.getItem("crews")) || [];
  crewsBlank.forEach((crew) => {
    const existingCrew = crews.find((c) => c.name === crew.name);
    if (!existingCrew) {
      crews.push(crew);
    }
    localStorage.setItem("crews", JSON.stringify(crews));
  });
}

function openSettings() {
  document.querySelector("#settingsPanel").style.display = "block";
}

function closeSettings(e) {
  if (e && e.target !== e.currentTarget) return;
  document.querySelector("#settingsPanel").style.display = "none";
}

function bindSettingsEvents() {
  document
    .querySelector("#settingsPanel")
    .addEventListener("click", closeSettings);
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") closeSettings();
  });
  // document.querySelector("").addEventListener("click", closeSettings);
}

function saveSettings() {
  const settings = {
    lang,
    theme,
    goal,
    levelGoal,
  };
  localStorage.setItem("settings", JSON.stringify(settings));
  closeSettings();
}

function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("settings")) || {};

  goal = settings.goal || 40;
  goalSelect.value = goal;

  lang = settings.lang || "en";
  translate(lang);

  levelGoal = settings.levelGoal || 50;
  levelGoalSelect.value = levelGoal;

  calculateTotal(lang, goal, levelGoal);

  selectTheme.value = settings.theme || "";
  theme = settings.theme || "";
  background.style.backgroundImage = `url("img/backgrounds/background season${selectTheme.value}.webp")`;
}

// Charger les données des pilotes au démarrage
document.addEventListener("DOMContentLoaded", () => {
  mergePilotsAndCrews();
  updatePilotFormFranchise(lang);
  updateCrewFormFranchise(lang);
  sortPilotsBlank();
  addPilotsToTable(lang, pilotTableBody);
  addCrewsToTable(lang, crewTableBody);
  updateFilterOptions(lang);
  updatePlaceholders();
  translate(lang);
  updateCrewsWithShardsNeeded();
  calculateTotal(lang, goal, levelGoal);
  switchTheme();
  bindSettingsEvents();
  loadSettings();
  sortCrews();
  bindSortButtons();
});
