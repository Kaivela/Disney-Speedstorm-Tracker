ajouter icone de role a gauche du text dans la td "role" pour les racer

## Migrations

--Racers--
franchise : "STRING" ==> collection : "STRING"
universal box : true, false, "season" ==> universal box : '✔' | '✘' | '🟣'
currentRMJ : "NUMBER" ==> currentMPL : "NUMBER"
highestRMJ : "NUMBER" ==> highestMPL : "NUMBER"
rmjTokenOld : true, false, "S10", "S10Mid" ==> MPLTokenReward : "old" | "new" | "S10" | "S10Mid"
rmjCoin : true, false, "S10", "S10Mid" ==> MPLTuneCoinReward : "old" | "new" | "S10" | "S10Mid"
currentSuperShards : "NUMBER" ==> currentSuperChargeShards : "NUMBER"
EMPTY ==> currentStarFragment : "NUMBER"
EMPTY ==> currentSuperChargeLevel : "NUMBER"

--Crews--
universal box : true, false, "season" ==> universal box : '✔' | '✘' | '🟣'
