import fr from "./data/lang/FR.json";
import en from "./data/lang/EN.json";
import { Language, TranslationData } from "./types";

const trad: Record<Language, TranslationData> = { fr: fr as TranslationData, en: en as TranslationData };

function createGetTrad(lang: Language) {
  // Fonction pour obtenir une traduction
  return function getTrad(key: string): string {
    return trad[lang][key] || key;
  };
}

function getTradKey(translation: string, lang: Language): string | undefined {
  // Fonction pour obtenir la clé d'une traduction
  return Object.keys(trad[lang]).find((key) => trad[lang][key] === translation);
}

//fonction pour changer de language
function translate(lang: Language): void {
  const currentTrad = trad[lang];
  const nodes = window.document.querySelectorAll("[data-trad]");
  nodes.forEach((node) => {
    const element = node as HTMLElement;
    if (element.dataset.trad && currentTrad[element.dataset.trad]) {
      element.textContent = currentTrad[element.dataset.trad];
    }
  });
}

export { createGetTrad, getTradKey, translate };
