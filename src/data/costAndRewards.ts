// Définir le coût des shards pour chaque fragment d'étoile d'un pilot
export const racerShardsCost = [5, 5, 5, 5, 8, 6, 6, 6, 6, 10, 7, 7, 7, 7, 12, 8, 8, 8, 8, 14, 9, 9, 9, 9, 16, 10, 10, 10, 10, 20];

// Définir le coût des pièces pour chaque niveau
export const tuneCoinsCosts = [
  500, 500, 500, 500, 800, 600, 600, 600, 600, 1000, 700, 700, 700, 700, 1200, 800, 800, 800, 800, 1400, 900, 900, 900, 900, 1600, 1000, 1000, 1000,
  1000, 2000,
];

// Définir les tunes coins rewards en LMJ pour chaque Rang (Season 0 to 4)
export const MPLS0To4CoinsReward = [
  30, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 30, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 70, 70, 0, 100, 0,
];

// Définir les upgrade coins rewards en MPL pour chaque Rang (Season 5 to 9)
export const MPLS5To9CoinsReward = [
  30, 0, 0, 30, 30, 0, 0, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 0, 50, 0, 70, 70, 70, 70, 0, 100, 0,
];

// Définir les upgrade coins rewards en MPL pour chaque Rang (Season 10 to Latest)
export const MPLS10ToLatestCoinsReward = [
  30, 0, 0, 30, 30, 0, 0, 0, 30, 30, 0, 90, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 0, 50, 0, 70, 70, 70, 70, 0, 100, 0,
];

// Définir les upgrade coins rewards en MPL pour chaque Rang (Season 10 to 14 Mid Season)
export const MPLS10To14MidCoinsReward = [
  30, 0, 0, 30, 30, 0, 0, 0, 30, 30, 0, 90, 0, 30, 30, 0, 30, 0, 30, 30, 0, 30, 0, 30, 30, 0, 50, 0, 50, 50, 0, 15, 0, 70, 70, 70, 70, 0, 100, 0,
];

// Définir les shards rewards en multiPlayerLeague pour chaque Rang (Season 0 to 4)
export const MPLOldShardsReward = [
  0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 8, 0, 0,
];

// Définir les shards rewards en multiPlayerLeague pour chaque Rang (Season 5 to Latest)
export const MPLNewShardsReward = [
  0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 8, 0, 0,
];

// Définir les tokens rewards en multiPlayerLeague pour chaque Rang (NEW PILOTS)
export const MPLOldTokensReward = [
  5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 20, 7, 7, 7, 7, 20, 7, 7, 7, 7, 30, 7, 7, 7, 7, 30, 10, 10, 10, 10, 40, 10, 10, 10, 120,
];

// Définir les tokens rewards en multiPlayerLeague pour chaque Rang (NEW PILOTS)
export const MPLNewTokensReward = [
  5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 120,
];

// Définir les cosmetic coins rewards en multiPlayerLeague pour chaque Rang (ALL PILOTS)
export const MPLCosmeticReward = [
  50, 50, 50, 50, 50, 50, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 80, 80, 80, 80, 80, 80, 100, 100, 100, 100, 100, 100, 120, 120,
  120, 120, 120, 120, 140,
];

// Définir le nombre de shards nécéssaire pour un crew (common and rare) pour gagner une étoile
export const normalCrewShardCost = [5, 15, 25, 45, 75];

// Définir le nombre de shards nécéssaire pour un crew (epic) pour gagner une étoile
export const epicCrewShardCost = [10, 20, 35, 50, 100];

// Définir le nombre de superShards nécéssaire pour activer la superCharge
export const superChargeCost = [20, 40];
