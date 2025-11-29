import { calculateRacerGoal, calculateTotal, calculateTokens } from "./compute";
import {
  populateCrewForm,
  updateCrewFormFranchise,
  addCrewsToTable,
  submitCrewForm,
  filterCrewTable,
  updateCrewsWithShardsNeeded,
  sortCrewsBlank,
  emptyCrewsTable,
  sortCrewsByColumn,
} from "./crewTable";
import { updateFilterOptions, updateCalculateOptions } from "./filters";
import {
  populatePilotForm,
  updatePilotFormFranchise,
  addPilotsToTable,
  submitPilotForm,
  filterPilotTable,
  sortPilotsBlank,
  emptyPilotsTable,
  sortPilotsByColumn,
  synchronizeLocalStorageWithPilotsBlank,
  maxPilotForm
} from "./pilotTable";
import pilotsBlank from "./data/pilots/pilots_blank.json";
import crewsBlank from "./data/crews/crews_blank.json";
import { createGetTrad, translate } from "./trad";
import * as HTML from "./ElementById";
import { Pilot, Crew, Settings, Language } from "./types";
import { StorageService } from "./StorageService";
import { UIManager } from "./UIManager";

const storage = StorageService.getInstance();
const uiManager = UIManager.getInstance();
const settings = storage.getSettings();

let theme = "";
let dark = false;
let transparant = true;
let lang: Language = settings.lang || "en";
let getTrad = createGetTrad(lang);
let mode = "pilot";
let goal = 40;
let levelGoal = 50;
// const dev = true;

// Attempt to maximize the window on page load
window.onload = function () {
  window.moveTo(0, 0);
  window.resizeTo(screen.width, screen.height);
};

const sortPilotButtons = document.querySelectorAll("#pilotTable th[data-sort]");
const sortCrewButtons = document.querySelectorAll("#crewTable th[data-sort]");
let editingPilotIndex: number | null = null; // Pour suivre quel pilote est en cours de modification
let editingCrewIndex: number | null = null; // Pour suivre quel equipier est en cours de modification

function resetFilters() {
  if (mode === "pilot") {
    HTML.pilotSearchInput.value = "";
    document.querySelectorAll(".pilotFilter").forEach(select => (select as HTMLSelectElement).selectedIndex = 0);
    filterPilotTable(lang);
  } else {
    HTML.crewSearchInput.value = "";
    document.querySelectorAll(".crewFilter").forEach(select => (select as HTMLSelectElement).selectedIndex = 0);
    filterCrewTable(lang);
  }
}

HTML.resetButton.addEventListener("click", () => { uiManager.resetCalcForm() });
HTML.calcButton.addEventListener("click", () => {
  const racerName = HTML.calcPilotName.value;
  const racerLevelGoal = parseInt(HTML.calcPilotLevelGoal.value, 10);
  const result = calculateRacerGoal(lang, racerName, racerLevelGoal);
  uiManager.displayRacerGoalResult(result);
});
HTML.endOfSeasonCalcButton.addEventListener("click", () => {
  const endOfSeasonCoins = parseInt(HTML.endOfSeasonCoins.value, 10);
  const result = calculateTokens(endOfSeasonCoins);
  uiManager.displayTokensResult(result);
});
HTML.resetPilotFiltersBtn.addEventListener("click", () => { resetFilters() });
HTML.resetCrewFiltersBtn.addEventListener("click", () => { resetFilters() });

function bindSortPilotButtons() {
  sortPilotButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortPilotButtons.forEach((b) => {
        if (b !== button) (b as HTMLElement).dataset.order = "default";
      });
      const btn = button as HTMLElement;
      const column = btn.dataset.sort as keyof Pilot;
      const currentOrder = btn.dataset.order || "default";
      const nextOrder = ({
        default: "desc",
        desc: "asc",
        asc: "default",
      } as const)[currentOrder] || "default";
      btn.dataset.order = nextOrder;
      if (nextOrder === "default") sortPilotsBlank();
      else sortPilotsByColumn(column, nextOrder);
      emptyPilotsTable();
      addPilotsToTable(lang, HTML.pilotTableBody /*, goal */);
      filterPilotTable(lang);
    });
  });
}

function bindSortCrewButtons() {
  sortCrewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortCrewButtons.forEach((b) => {
        if (b !== button) (b as HTMLElement).dataset.order = "default";
      });
      const btn = button as HTMLElement;
      const column = btn.dataset.sort as keyof Crew;
      const currentOrder = btn.dataset.order || "default";
      const nextOrder = ({
        default: "desc",
        desc: "asc",
        asc: "default",
      } as const)[currentOrder] || "default";
      btn.dataset.order = nextOrder;
      if (nextOrder === "default") sortCrewsBlank();
      else sortCrewsByColumn(column, nextOrder);
      emptyCrewsTable();
      addCrewsToTable(lang, HTML.crewTableBody /*, goal */);
      filterCrewTable(lang);
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
  const stats = calculateTotal(goal, levelGoal);
  uiManager.updateTotalStats(stats, levelGoal, lang);
  switchTheme();
  updateCalculateOptions(lang);
  uiManager.resetCalcForm();
  HTML.selectTheme.value = theme;
}

// Gère la soumission du formulaire de pilote
HTML.pilotForm.addEventListener("submit", (event) =>
  submitPilotForm(event, lang, editingPilotIndex, HTML.pilotTableBody, HTML.pilotForm, HTML.pilotSubmitBtn, HTML.pilotMaxBtn, goal, levelGoal)
);

HTML.pilotMaxBtn.addEventListener("click", () => { maxPilotForm() });

HTML.showCalcBtn.addEventListener("click", () => {
  if (HTML.calculateForm.style.display === "none") {
    HTML.calculateForm.style.display = "";
    HTML.endOfSeasonCalc.style.display = "";
  } else {
    HTML.calculateForm.style.display = "none";
    HTML.endOfSeasonCalc.style.display = "none";
  }
});

// Gère la soumission du formulaire de crew
HTML.crewForm.addEventListener("submit", (event) =>
  submitCrewForm(event, lang, editingCrewIndex, HTML.crewTableBody, HTML.crewForm, HTML.crewSubmitBtn, goal, levelGoal)
);

declare global {
  interface Window {
    saveScroll: number;
  }
}
window.saveScroll = 0;
function clickModifyPilot(event: Event) {
  const target = event.target as HTMLElement;
  if (target.classList.contains("edit-btn")) {
    window.saveScroll = document.documentElement.scrollTop;
    HTML.pilotCurrentStars.focus();
    const index = parseInt(target.dataset.index!, 10);
    const pilots = storage.getPilots();
    const pilot = pilots[index];
    populatePilotForm(pilot, lang);
    HTML.pilotSubmitBtn.textContent = getTrad("update_pilot"); // Changer le texte du bouton lors de la modification
    HTML.pilotSubmitBtn.style.display = "";
    HTML.pilotMaxBtn.style.display = "";
    editingPilotIndex = index; // Enregistrer l'index du pilote en cours de modification
  }
}

function clickModifyCrew(event: Event) {
  const target = event.target as HTMLElement;
  if (target.classList.contains("edit-btn")) {
    HTML.crewCurrentStars.focus();
    const index = parseInt(target.dataset.index!, 10);
    const crews = storage.getCrews();
    const crew = crews[index];
    populateCrewForm(crew, lang);
    HTML.crewSubmitBtn.textContent = getTrad("update_crew"); // Changer le texte du bouton lors de la modification
    HTML.crewSubmitBtn.style.display = "";
    editingCrewIndex = index; // Enregistrer l'index de l'Equipier en cours de modification
  }
}

// Gère le clic sur le bouton Modifier de la table pilot
HTML.pilotTableBody.addEventListener("click", (event) => clickModifyPilot(event));

// // Gère le clic sur le bouton Modifier de la table crew
HTML.crewTableBody.addEventListener("click", (event) => clickModifyCrew(event));

function updatePlaceholders() {
  HTML.pilotSearchInput.placeholder = getTrad("search_placeholder");
  HTML.crewSearchInput.placeholder = getTrad("search_placeholder");
}

// Fonction de recherche globale pour les pilotes
HTML.pilotSearchInput.addEventListener("keyup", () => filterPilotTable(lang));

// Fonction de recherche globale pour les crews
HTML.crewSearchInput.addEventListener("keyup", () => filterCrewTable(lang));

// Fonction de filtrage par colonnes pour les pilotes
document.querySelectorAll(".pilotFilter").forEach((filter) => {
  filter.addEventListener("change", () => filterPilotTable(lang));
});

// Fonction de filtrage par colonnes pour les Equipiers
document.querySelectorAll(".crewFilter").forEach((filter) => {
  filter.addEventListener("change", () => filterCrewTable(lang));
});

HTML.pilotMode.addEventListener("click", () => { switchTable("pilot") });
HTML.crewMode.addEventListener("click", () => { switchTable("crew") });
HTML.goalSelect.addEventListener("change", () => switchGoal());
HTML.levelGoalSelect.addEventListener("change", () => switchLevelGoal());
HTML.selectTheme.addEventListener("change", () => {
  HTML.background.style.backgroundImage = `url("img/backgrounds/background season${HTML.selectTheme.value}.webp")`;
  theme = HTML.selectTheme.value;
});
HTML.tradButton.addEventListener("click", () => changeLang());
HTML.saveButton.addEventListener("click", () => saveSettings());
HTML.settingsButton.addEventListener("click", () => openSettings());

// Gérer l'affichage des colonnes pour les Pilots
HTML.togglePilotSeason.addEventListener("click", (e) => togglePilotColumn(0, e));
HTML.togglePilotImage.addEventListener("click", (e) => togglePilotColumn(1, e));
HTML.togglePilotFranchise.addEventListener("click", (e) => togglePilotColumn(2, e));
HTML.togglePilotRarity.addEventListener("click", (e) => togglePilotColumn(3, e));
HTML.togglePilotRole.addEventListener("click", (e) => togglePilotColumn(4, e));
HTML.togglePilotName.addEventListener("click", (e) => togglePilotColumn(5, e));
HTML.togglePilotStar.addEventListener("click", (e) => togglePilotColumn(6, e));
HTML.togglePilotCurrentShard.addEventListener("click", (e) => togglePilotColumn(7, e));
HTML.togglePilotLevel.addEventListener("click", (e) => togglePilotColumn(8, e));
HTML.togglePilotSuperShard.addEventListener("click", (e) => togglePilotColumn(9, e));
HTML.togglePilotCurrentMPR.addEventListener("click", (e) => togglePilotColumn(10, e));
HTML.togglePilotHighestMPR.addEventListener("click", (e) => togglePilotColumn(11, e));
HTML.togglePilotGrade.addEventListener("click", (e) => togglePilotColumn(12, e));
HTML.togglePilotShardNeeded.addEventListener("click", (e) => togglePilotColumn(13, e));
HTML.togglePilotShardMPR.addEventListener("click", (e) => togglePilotColumn(14, e));
HTML.togglePilotUpgrade.addEventListener("click", (e) => togglePilotColumn(15, e));
HTML.togglePilotBox.addEventListener("click", (e) => togglePilotColumn(16, e));
HTML.togglePilotShardNextStar.addEventListener("click", (e: Event) => togglePilotColumn(17, e));
HTML.togglePilotCoinStar.addEventListener("click", (e) => togglePilotColumn(18, e));
HTML.togglePilotShardIfMax.addEventListener("click", (e: Event) => togglePilotColumn(19, e));

// Gérer l'affichage des colonnes pour les Crew
HTML.toggleCrewImage.addEventListener("click", (e) => toggleCrewColumn(0, e));
HTML.toggleCrewFranchise.addEventListener("click", (e) => toggleCrewColumn(1, e));
HTML.toggleCrewRarity.addEventListener("click", (e) => toggleCrewColumn(2, e));
HTML.toggleCrewName.addEventListener("click", (e) => toggleCrewColumn(3, e));
HTML.toggleCrewStar.addEventListener("click", (e) => toggleCrewColumn(4, e));
HTML.toggleCrewCurrentShard.addEventListener("click", (e) => toggleCrewColumn(5, e));
HTML.toggleCrewShardNeeded.addEventListener("click", (e) => toggleCrewColumn(6, e));
HTML.toggleCrewBox.addEventListener("click", (e) => toggleCrewColumn(7, e));

// Import Pilots Button
HTML.pilotImportButton.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const pilots = JSON.parse(text) as Pilot[];
        storage.savePilots(pilots);
        HTML.pilotTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
        addPilotsToTable(lang, HTML.pilotTableBody);
        updatePilotFormFranchise(lang);
      };
      reader.readAsText(file);
    }
  };
  input.click();
});

HTML.pilotExportButton.addEventListener("click", () => {
  const pilots = storage.getPilots();
  const filename = "pilots.json";
  const text = JSON.stringify(pilots, null, 2);
  download(filename, text);
});

HTML.crewImportButton.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const crews = JSON.parse(text) as Crew[];
        storage.saveCrews(crews);
        HTML.crewTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
        addCrewsToTable(lang, HTML.crewTableBody);
        updateCrewFormFranchise(lang);
      };
      reader.readAsText(file);
    }
  };
  input.click();
});

HTML.crewExportButton.addEventListener("click", () => {
  const crews = storage.getCrews();
  const filename = "crews.json";
  const text = JSON.stringify(crews, null, 2);
  download(filename, text);
});

HTML.darkMode.addEventListener("click", () => toggleDarkMode());
HTML.transparantMode.addEventListener("click", () => toggleTransparancy());

// Fonction pour export les data dans un fichier json
function download(filename: string, text: string) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Fonction pour afficher / masquer une colonne du tableau pilot
function togglePilotColumn(index: number, event: Event) {
  const rows = HTML.pilotTable.rows;
  const isHidden = rows[0].cells[index].style.display === "none";

  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[index].style.display = isHidden ? "" : "none";
  }
  // Change the button color
  changeButtonColor(event.target as HTMLElement);
}

// Fonction pour afficher / masquer une colonne du tableau crew
function toggleCrewColumn(index: number, event: Event) {
  const rows = HTML.crewTable.rows;
  const isHidden = rows[0].cells[index].style.display === "none";

  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[index].style.display = isHidden ? "" : "none";
  }
  // Change the button color
  changeButtonColor(event.target as HTMLElement);
}

// Fonction pour changer la couleur du bouton
function changeButtonColor(button: HTMLElement) {
  // Bascule la classe 'active' sur le bouton cliqué
  button.classList.toggle("active");
}

function switchGoal() {
  goal = parseInt(HTML.goalSelect.value, 10);
  // goal = goal === 40 ? (goal = 31) : (goal = 40);
  const stats = calculateTotal(goal, levelGoal);
  uiManager.updateTotalStats(stats, levelGoal, lang);
}

function switchLevelGoal() {
  levelGoal = parseInt(HTML.levelGoalSelect.value, 10);
  const stats = calculateTotal(goal, levelGoal);
  uiManager.updateTotalStats(stats, levelGoal, lang);
}

function switchTheme() {
  HTML.selectTheme.innerHTML = '<option value="" data-trad="select_theme">' + getTrad("select_theme") + "</option>";

  for (let i = 1; i <= 16; i++) {
    const season = document.createElement("option");
    season.value = i.toString();
    season.textContent = getTrad("season" + i);
    HTML.selectTheme.appendChild(season);

    if (i === 11) {
      const seasonAlt = document.createElement("option");
      seasonAlt.value = "11alt";
      seasonAlt.textContent = getTrad("season11alt");
      HTML.selectTheme.appendChild(seasonAlt);
    }
  }
}

function switchTable(newMode: string) {
  mode = newMode;

  if (mode === "pilot") {
    HTML.pilotTable.style.display = "table"; // Affiche le tableau des pilotes
    HTML.pilotForm.style.display = "grid"; // Affiche le formulaire des pilotes
    HTML.pilotFilter.style.display = "flex"; // Affiche le filtrage des pilotes
    HTML.pilothide.style.display = ""; // Affiche le masqueur de colonne des pilotes
    HTML.crewTable.style.display = "none"; // Cache le tableau des Equipiers
    HTML.crewForm.style.display = "none"; // Cache le formulaire des Equipiers
    HTML.crewFilter.style.display = "none"; // Cache le filtrage des Equipiers
    HTML.crewhide.style.display = "none"; // Cache le masqueur de colonne des Equipiers
    HTML.pilotMode.style.backgroundColor = "greenyellow";
    HTML.pilotMode.style.color = "black";
    HTML.crewMode.style.backgroundColor = "";
    HTML.crewMode.style.color = "";
    HTML.crewExportButton.style.display = "none";
    HTML.crewImportButton.style.display = "none";
    HTML.pilotExportButton.style.display = "";
    HTML.pilotImportButton.style.display = "";
  } else {
    HTML.pilotTable.style.display = "none"; // Cache le tableau des pilotes
    HTML.pilotForm.style.display = "none"; // Cache le formulaire des pilotes
    HTML.pilotFilter.style.display = "none"; // Cache le filtrage des pilotes
    HTML.pilothide.style.display = "none"; // Cache le masqueur de colonne des pilotes
    HTML.crewTable.style.display = "table"; // Affiche le tableau des Equipiers
    HTML.crewForm.style.display = "grid"; // Affiche le formulaire des Equipiers
    HTML.crewFilter.style.display = "flex"; // Affiche le filtrage des Equipiers
    HTML.crewhide.style.display = ""; // Affiche le masqueur de colonne des Equipiers
    HTML.crewMode.style.backgroundColor = "greenyellow";
    HTML.crewMode.style.color = "black";
    HTML.pilotMode.style.backgroundColor = "";
    HTML.pilotMode.style.color = "";
    HTML.crewExportButton.style.display = "";
    HTML.crewImportButton.style.display = "";
    HTML.pilotExportButton.style.display = "none";
    HTML.pilotImportButton.style.display = "none";
  }
  translate(lang);
}

function mergePilotsAndCrews() {
  const pilots = storage.getPilots();
  pilotsBlank.forEach((pilot) => {
    const existingPilot = pilots.find((p) => p.name === pilot.name);
    if (!existingPilot) {
      pilots.push(pilot as Pilot);
    }
    storage.savePilots(pilots);
  });
  const crews = storage.getCrews();
  crewsBlank.forEach((crew) => {
    const existingCrew = crews.find((c) => c.name === crew.name);
    if (!existingCrew) {
      crews.push(crew as Crew);
    }
    storage.saveCrews(crews);
  });
}

function openSettings() {
  (document.querySelector("#settingsPanel") as HTMLElement).style.display = "block";
}

function closeSettings(e?: Event) {
  if (e && e.target !== e.currentTarget) return;
  (document.querySelector("#settingsPanel") as HTMLElement).style.display = "none";
}

function bindSettingsEvents() {
  (document.querySelector("#settingsPanel") as HTMLElement).addEventListener("click", closeSettings);
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") closeSettings();
  });
}

function saveSettings() {
  const settings: Settings = {
    lang,
    theme,
    goal,
    levelGoal,
    // dark,
    transparant,
  };
  storage.saveSettings(settings);
  closeSettings();
}

function loadSettings() {
  const settings = storage.getSettings();

  goal = settings.goal || 40;
  HTML.goalSelect.value = goal.toString();

  lang = (settings.lang as Language) || "en";
  translate(lang);

  levelGoal = settings.levelGoal || 50;
  HTML.levelGoalSelect.value = levelGoal.toString();

  const stats = calculateTotal(goal, levelGoal);
  uiManager.updateTotalStats(stats, levelGoal, lang);

  HTML.selectTheme.value = settings.theme || "";
  theme = settings.theme || "";
  HTML.background.style.backgroundImage = `url("img/backgrounds/background season${HTML.selectTheme.value}.webp")`;

  dark = settings.dark || false;

  transparant = settings.transparant || false;
}

function toggleDarkMode() {
  dark = document.documentElement.getAttribute("data-theme") === "dark";
  dark = !dark;
  HTML.darkMode.checked = dark;
  const newTheme = dark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  storage.saveTheme(newTheme);

  if (HTML.transparantMode.checked) {
    activateTransparancy();
  } else {
    deactivateTransparancy();
  }
}

function isDarkModeActive() {
  if (storage.getTheme() === "dark") {
    HTML.darkMode.checked = true;
  }
}

function toggleTransparancy() {
  if (HTML.transparantMode.checked) {
    activateTransparancy();
    transparant = true;
  } else {
    deactivateTransparancy();
    transparant = false;
  }
}

function deactivateTransparancy() {
  if (storage.getTheme() === "dark") {
    document.documentElement.style.setProperty("--bg-color-odd", `#000b1a`);
    document.documentElement.style.setProperty("--bg-color-even", `#001b40`);
  } else {
    document.documentElement.style.setProperty("--bg-color-odd", `#cccccc`);
    document.documentElement.style.setProperty("--bg-color-even", `#ffffff`);
  }
}

function activateTransparancy() {
  if (storage.getTheme() === "dark") {
    document.documentElement.style.setProperty("--bg-color-odd", `#000b1ab3`);
    document.documentElement.style.setProperty("--bg-color-even", `#001b40b3`);
  } else {
    document.documentElement.style.setProperty("--bg-color-odd", `#ccccccb3`);
    document.documentElement.style.setProperty("--bg-color-even", `#ffffffb3`);
  }
}

function isTransparancyActive() {
  if (transparant === true) {
    activateTransparancy();
    HTML.transparantMode.checked = true;
    // if (HTML.darkMode === true) {
    // }
  } else {
    deactivateTransparancy();
  }
}

function applyTheme() {
  const savedTheme = storage.getTheme();
  const userPreferedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const theme = savedTheme || userPreferedTheme;

  document.documentElement.setAttribute("data-theme", theme);
}


// Remonter en haut
HTML.scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Aller en bas
HTML.scrollBottomBtn.addEventListener("click", () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});

// Gérer l'affichage des boutons selon le scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    HTML.scrollTopBtn.classList.remove("hidden");
  } else {
    HTML.scrollTopBtn.classList.add("hidden");
  }

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    HTML.scrollBottomBtn.classList.add("hidden");
  } else {
    HTML.scrollBottomBtn.classList.remove("hidden");
  }
});

function assignPilotProperty<K extends keyof Pilot>(target: Pilot, source: Pilot, key: K) {
  target[key] = source[key];
}

function updateLocalStorage() {
  const newProps = ['currentSuperShards', 'releaseSeason', "superCharge"] as const;
  const pilots = storage.getPilots();
  pilots.forEach(pilot => {
    newProps.forEach(newProp => {
      if (!Object.prototype.hasOwnProperty.call(pilot, newProp)) {
        const pilotBlank = pilotsBlank.find((blank) => blank.name === pilot.name) as Pilot;
        if (pilotBlank) {
          assignPilotProperty(pilot, pilotBlank, newProp);
        }
      }
    })
  })
  storage.savePilots(pilots);
}

// Charger les données des pilotes au démarrage
document.addEventListener("DOMContentLoaded", () => {
  mergePilotsAndCrews();
  updatePilotFormFranchise(lang);
  updateCrewFormFranchise(lang);
  sortPilotsBlank();
  updateLocalStorage();
  addPilotsToTable(lang, HTML.pilotTableBody);
  addCrewsToTable(lang, HTML.crewTableBody);
  updateFilterOptions(lang);
  updateCalculateOptions(lang);
  updatePlaceholders();
  translate(lang);
  updateCrewsWithShardsNeeded();
  synchronizeLocalStorageWithPilotsBlank();
  const stats = calculateTotal(goal, levelGoal);
  uiManager.updateTotalStats(stats, levelGoal, lang);
  switchTheme();
  bindSettingsEvents();
  loadSettings();
  sortCrewsBlank();
  bindSortPilotButtons();
  bindSortCrewButtons();
  isDarkModeActive();
  isTransparancyActive();
  applyTheme();
});
