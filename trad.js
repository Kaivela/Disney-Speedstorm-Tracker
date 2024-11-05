import fr from "./data/lang/FR.json";
import en from "./data/lang/EN.json";
const trad = { fr, en };

function createGetTrad(lang) {
  // Fonction pour obtenir une traduction
  return function getTrad(key) {
    return trad[lang][key];
  };
}

function getTradKey(translation, lang) {
  // Fonction pour obtenir la clé d'une traduction
  return Object.keys(trad[lang]).find((key) => trad[lang][key] === translation);
}

//fonction pour changer de language
function translate(lang) {
  const currentTrad = trad[lang];
  const nodes = window.document.querySelectorAll("[data-trad]");
  nodes.forEach((node) => {
    node.textContent = currentTrad[node.dataset.trad];
  });
}

export { createGetTrad, getTradKey, translate };
