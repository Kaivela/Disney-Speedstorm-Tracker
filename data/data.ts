// Définir les coûts des shards pour chaque niveau d'un pilot
const pilotShardCosts: number[] = [
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7,
  7, 9, 9, 9, 10, 10, 10,
];

// Définir les coûts des coins pour chaque niveau
const coinsCosts: number[] = [
  0, 150, 170, 190, 210, 230, 250, 270, 300, 320, 350, 380, 400, 450, 500, 540, 580, 630, 700, 750, 820, 900, 970, 1050, 1150,
  1250, 1350, 1450, 1550, 1700, 1850, 2000, 2150, 2300, 2500, 2700, 3000, 3300, 3600, 4000, 4300, 4750, 5200, 5700, 6200, 6700,
  7300, 8000, 8900, 10000,
];

// Définir le passage de star pour les pilotes
const starLevel: number[] = [20, 30, 40, 50];

// Définir les upgrade coins rewards en RMJ pour chaque Rang (OLD PILOTS)
const rmjOldCoinsReward: number[] = [
  300, 300, 0, 300, 300, 0, 300, 0, 300, 300, 0, 300, 0, 300, 300, 0, 300, 0, 300, 300, 300, 300, 0, 300, 300, 0, 300, 0, 300,
  300, 0, 500, 0, 500, 500, 700, 700, 0, 1000, 0,
];

// Définir les upgrade coins rewards en RMJ pour chaque Rang (NEW PILOTS)
const rmjNewCoinsReward: number[] = [
  300, 0, 0, 300, 300, 0, 0, 0, 300, 300, 0, 300, 0, 300, 300, 0, 300, 0, 300, 300, 0, 300, 0, 300, 300, 0, 500, 0, 500, 500, 0,
  500, 0, 700, 700, 700, 700, 0, 1000, 0,
];

// Définir les upgrade coins rewards en RMJ pour chaque Rang (S10)
const rmjS10CoinsReward: number[] = [
  300, 0, 0, 300, 300, 0, 0, 0, 300, 300, 0, 900, 0, 300, 300, 0, 300, 0, 300, 300, 0, 300, 0, 300, 300, 0, 500, 0, 500, 500, 0,
  500, 0, 700, 700, 700, 700, 0, 1000, 0,
];

// Définir les upgrade coins rewards en RMJ pour chaque Rang (S10 Mid)
const rmjS10MidCoinsReward: number[] = [
  300, 0, 0, 300, 300, 0, 0, 0, 300, 300, 0, 900, 0, 300, 300, 0, 300, 0, 300, 300, 0, 300, 0, 300, 300, 0, 500, 0, 500, 500, 0,
  1500, 0, 700, 700, 700, 700, 0, 1000, 0,
];

// Définir les shards rewards en RMJ pour chaque Rang (NEW PILOTS)
const rmjShardsReward: number[] = [
  0, 4, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 8, 0, 0,
];

// Définir les tokens rewards en RMJ pour chaque Rang (NEW PILOTS)
const rmjOldTokensReward: number[] = [
  5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 20, 7, 7, 7, 7, 20, 7, 7, 7, 7, 30, 7, 7, 7, 7, 30, 10, 10, 10, 10, 40, 10, 10,
  10, 120,
];

// Définir les tokens rewards en RMJ pour chaque Rang (NEW PILOTS)
const rmjNewTokensReward: number[] = [
  5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 5, 10, 5, 5, 5, 120,
];

// Définir les cosmetic coins rewards en RMJ pour chaque Rang (ALL PILOTS)
const rmjCosmeticReward: number[] = [
  50, 50, 50, 50, 50, 50, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 80, 80, 80, 80, 80, 80, 100, 100, 100, 100,
  100, 100, 120, 120, 120, 120, 120, 120, 140,
];

// Définir le nombre de shards nécéssaire pour un crew (common and rare) pour gagner une étoile
const normalCrewShardCost: number[] = [5, 15, 25, 45, 75];

// Définir le nombre de shards nécéssaire pour un crew (epic) pour gagner une étoile
const epicCrewShardCost: number[] = [10, 20, 35, 50, 100];

// Définir le nombre de superShards nécéssaire pour activer la superCharge
const superChargeCost: number[] = [0, 0, 0, 0, 0, 20, 40];

export {
  pilotShardCosts,
  coinsCosts,
  rmjOldCoinsReward,
  rmjNewCoinsReward,
  rmjS10CoinsReward,
  rmjS10MidCoinsReward,
  rmjShardsReward,
  rmjOldTokensReward,
  rmjNewTokensReward,
  rmjCosmeticReward,
  normalCrewShardCost,
  epicCrewShardCost,
  starLevel,
  superChargeCost,
};
