import * as HTML from "./ElementById";
import { TotalStats, Language } from "./types";
import { createGetTrad } from "./trad";

export class UIManager {
    private static instance: UIManager;

    private constructor() { }

    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }

    public updateTotalStats(stats: TotalStats, levelGoal: number, lang: Language): void {
        const getTrad = createGetTrad(lang);

        // formater les nombres avec des points pour l'affichage
        const formatNumberWithDots = (number: number): string => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };

        const allCoinsStr = formatNumberWithDots(stats.allCoins);
        const allShardsNeededStr = formatNumberWithDots(stats.allShardsNeeded);
        const seasonShardsNeededStr = formatNumberWithDots(stats.seasonShardsNeeded);
        const midSeasonShardsNeededStr = formatNumberWithDots(stats.midSeasonShardsNeeded);
        const allFreeShardsStr = formatNumberWithDots(stats.allRegularShards);
        const universalBoxCountStr = formatNumberWithDots(stats.universalBoxCount);
        const seasonCoinsStr = formatNumberWithDots(stats.seasonCoins);
        const upgradeCoinsStr = formatNumberWithDots(stats.upgradeCoins);
        const tokensToGetStr = formatNumberWithDots(stats.tokensToGet);
        const cosmeticToGetStr = formatNumberWithDots(stats.cosmeticToGet);
        const totalCommonShardsNeededStr = formatNumberWithDots(stats.totalCommonShardsNeeded);
        const totalRareShardsNeededStr = formatNumberWithDots(stats.totalRareShardsNeeded);
        const totalEpicShardsNeededStr = formatNumberWithDots(stats.totalEpicShardsNeeded);
        const totalFreeCrewShardsNeededCalculatedStr = formatNumberWithDots(stats.totalFreeCrewShardsNeededCalculated);

        // Afficher les résultats dans le HTML
        HTML.allCoins.textContent = allCoinsStr;
        HTML.levelGoal.textContent = levelGoal + " : ";
        HTML.allShards.textContent = allShardsNeededStr;
        HTML.seasonShards.textContent = seasonShardsNeededStr;
        HTML.midSeasonShards.textContent = midSeasonShardsNeededStr;
        HTML.allSuperShards.textContent = stats.allSuperShardsNeeded.toString();
        HTML.allRegularShards.textContent = allFreeShardsStr;
        HTML.universalBoxCount.textContent = universalBoxCountStr;
        HTML.uniBoxCost.textContent = formatNumberWithDots(stats.uniBoxCost);
        HTML.seasonCoins.textContent = seasonCoinsStr;
        HTML.upgradeCoins.textContent = upgradeCoinsStr;
        HTML.tokens.textContent = tokensToGetStr;
        HTML.cosmetic.textContent = cosmeticToGetStr;
        HTML.crewFreeShards.textContent =
            getTrad("Common") +
            ": " +
            totalCommonShardsNeededStr +
            " " +
            getTrad("Rare") +
            ": " +
            totalRareShardsNeededStr +
            " " +
            getTrad("Epic") +
            ": " +
            totalEpicShardsNeededStr +
            " Total : " +
            totalFreeCrewShardsNeededCalculatedStr;
        HTML.crewSeasonCoinsNeeded.textContent = formatNumberWithDots(stats.crewSeasonCoinsNeeded);
        HTML.crewSeasonNumber.textContent = formatNumberWithDots(stats.crewSeasonNumber);
        HTML.rmj40Count.textContent = stats.rmj40Count.toString();
    }

    public displayRacerGoalResult(result: string): void {
        HTML.calcResult.innerHTML = result;
        HTML.calcResult.style.display = "block";
    }

    public displayTokensResult(result: string): void {
        HTML.endOfSeasonCoinsResult.textContent = result;
        HTML.endOfSeasonCoinsResult.style.display = "block";
    }

    public resetCalcForm(): void {
        HTML.calcPilotName.value = "";
        HTML.calcPilotLevelGoal.value = "";
        HTML.calcResult.textContent = "";
        HTML.calcResult.style.display = "none";
    }
}
