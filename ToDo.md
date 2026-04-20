ajouter icone de role a gauche du text dans la td "role" pour les racer
ajuster les icones des colonne super charge pour afficher si oui ou non le racer peut etre super charge et si elle est maxé
donner l'info de savoir si le perso est dans e boost pilote

## Migrations

pour refacto le dernier calcul : besoin d'un nouveau type racerBlankWithSavedData qui sera un agrégat des type RacerBlank et RacerSaved
car on doit donner des éléments comme la rarity ou le MPLRewardOld a certaines fonction : props non accessibles dans un RacerSaved
fix crew typing and mimic racer typing
sort crew when new entry et update pour new crew
calcul des nextStar racer

export/Import save
modify racer/crew

=========> MVP
mettre en place les settings
\*Options
-hide column
-dark mode
-transparent
-background
-MPL Goal
-Racer Star Goal

migration des settings

preload img
Account Stats
data trad EN
order column
Filters
ACTIONS - calculate racer
