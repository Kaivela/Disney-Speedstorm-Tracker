ajouter icone de role a gauche du text dans la td "role" pour les racer
ajuster les icones des colonne super charge pour afficher si oui ou non le racer peut etre super charge et si elle est maxé
donner l'info de savoir si le perso est dans e boost pilote

## Migrations

--Crews--
"franchise": 'string' ................==> "collection": 'string'
"rarity": "Common" ...................==> EMPTY
"name": 'string' .....................==> "name": 'string'
"currentStars": 'number' .............==> "currentStars": 'number'
"currentShards": 'number' ............==> "currentShards": 'number'
"universalBox": Boolean ..............==> EMPTY
"shardsNeeded": 'number' .............==> EMPTY

migration de la save
export/Import save
modify racer/crew

=========> MVP
calcul des nextStar racer
ACTIONS - calculate racer
Account Stats
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
