// Définir le coût des shards pour chaque fragment d'étoile d'un pilot
const racerShardsCost: number[] = [0, 5, 5, 5, 5, 8, 6, 6, 6, 6, 10, 7, 7, 7, 7, 12, 8, 8, 8, 8, 14, 9, 9, 9, 9, 16, 10, 10, 10, 10, 20];

// Définir le coût des pièces pour chaque niveau
const tunesCoinsCosts: number[] = [
  0, 500, 500, 500, 500, 800, 600, 600, 600, 600, 1000, 700, 700, 700, 700, 1200, 800, 800, 800, 800, 1400, 900, 900, 900, 900, 1600, 1000, 1000,
  1000, 1000, 2000,
];

// Définir le nombre de star fragment nécéssaire pour gagner une étoile
const racerStarFragment: number[] = [28, 34, 40, 46, 52, 60];

// Définir les tunes coins rewards en LMJ pour chaque Rang (OLD PILOTS)
const multiPlayerLeagueOldCoinsReward: number[] = [
  30, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 30, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 70, 70, 0, 100, 0,
];

// Définir les upgrade coins rewards en multiPlayerLeague pour chaque Rang (NEW PILOTS)
const multiPlayerLeagueNewCoinsReward: number[] = [
  30, 0, 0, 30, 30, 0, 0, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 0, 50, 0, 70, 70, 70, 70, 0, 100, 0,
];

// Définir les upgrade coins rewards en multiPlayerLeague pour chaque Rang (S10)
const multiPlayerLeagueS10CoinsReward: number[] = [
  30, 0, 0, 30, 30, 0, 0, 0, 30, 30, 0, 90, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 0, 50, 0, 70, 70, 70, 70, 0, 100, 0,
];

// Définir les upgrade coins rewards en multiPlayerLeague pour chaque Rang (S10 Mid)
const multiPlayerLeagueS10MidCoinsReward: number[] = [
  30, 0, 0, 30, 30, 0, 0, 0, 30, 30, 0, 90, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 0, 150, 0, 70, 70, 70, 70, 0, 100, 0,
];

// Définir les shards rewards en multiPlayerLeague pour chaque Rang (NEW PILOTS)
const multiPlayerLeagueShardsReward: number[] = [
  0, 4, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 8, 0, 0,
];

// Définir les tokens rewards en multiPlayerLeague pour chaque Rang (NEW PILOTS)
const multiPlayerLeagueOldTokensReward: number[] = [
  5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 20, 7, 7, 7, 7, 20, 7, 7, 7, 7, 30, 7, 7, 7, 7, 30, 10, 10, 10, 10, 40, 10, 10, 10, 120,
];

// Définir les tokens rewards en multiPlayerLeague pour chaque Rang (NEW PILOTS)
const multiPlayerLeagueNewTokensReward: number[] = [
  5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 120,
];

// Définir les cosmetic coins rewards en multiPlayerLeague pour chaque Rang (ALL PILOTS)
const multiPlayerLeagueCosmeticReward: number[] = [
  50, 50, 50, 50, 50, 50, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 80, 80, 80, 80, 80, 80, 100, 100, 100, 100, 100, 100, 120, 120,
  120, 120, 120, 120, 140,
];

// Définir le nombre de shards nécéssaire pour un crew (common and rare) pour gagner une étoile
const normalCrewShardCost: number[] = [5, 15, 25, 45, 75];

// Définir le nombre de shards nécéssaire pour un crew (epic) pour gagner une étoile
const epicCrewShardCost: number[] = [10, 20, 35, 50, 100];

// Définir le nombre de superShards nécéssaire pour activer la superCharge
const superChargeCost: number[] = [0, 0, 0, 0, 0, 20, 40];

export {
  racerShardsCost,
  tunesCoinsCosts,
  racerStarFragment,
  multiPlayerLeagueOldCoinsReward,
  multiPlayerLeagueNewCoinsReward,
  multiPlayerLeagueS10CoinsReward,
  multiPlayerLeagueS10MidCoinsReward,
  multiPlayerLeagueShardsReward,
  multiPlayerLeagueOldTokensReward,
  multiPlayerLeagueNewTokensReward,
  multiPlayerLeagueCosmeticReward,
  normalCrewShardCost,
  epicCrewShardCost,
  superChargeCost,
};
