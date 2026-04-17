ajouter icone de role a gauche du text dans la td "role" pour les racer
ajuster les icones des colonne super charge pour afficher si oui ou non le racer peut etre super charge et si elle est maxé
donner l'info de savoir si le perso est dans e boost pilote
check release season for racers and crew
check uniBox for racer and crew

## Migrations

--Racers--
franchise : "STRING" ==> collection : "STRING" (mais peut etre bien EMPTY car construit)
universal box : true, false, "season" ==> universal box : '✔' | '✘' | '🟣'
currentRMJ : "NUMBER" ==> currentMPL : "NUMBER"
highestRMJ : "NUMBER" ==> highestMPL : "NUMBER"
rmjTokenOld : true, false, "S10", "S10Mid" ==> MPLTokenReward : "old" | "new" | "S10" | "S10Mid"
rmjCoin : true, false, "S10", "S10Mid" ==> MPLTuneCoinReward : "old" | "new" | "S10" | "S10Mid"
currentSuperShards : "NUMBER" ==> currentSuperChargeTokens : "NUMBER"
EMPTY ==> currentStarFragment : "NUMBER"
EMPTY ==> currentSuperChargeLevel : "NUMBER"

--Crews--
EMPTY ==> releaseseason : "NUMBER"
universal box : true, false, "season" ==> universal box : '✔' | '✘' | '🟣'

check all racers rewards
up to date racer/crew data
mettre en place le systeme de save
modify racer/crew
export/Import save
migration de la save

calcul des nextStar racer
ACTIONS - calculate racer
Account Stats
=========> MVP
preload img
Filters
data trad EN
order column

\*Options
-hide column
-dark mode
-transparent
-background
-MPL Goal
-Racer Star Goal
