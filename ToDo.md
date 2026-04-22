ajouter icone de role a gauche du text dans la td "role" pour les racer
ajuster les icones des colonne super charge pour afficher si oui ou non le racer peut etre super charge et si elle est maxé
donner l'info de savoir si le perso est dans le boost pilote (on connait l'info grace a uniBox true)

## Migrations

calcul des nextStar racer
refacto import pour handle both
on va avoir besoin du context de mode pour savoir si on fait un racer ou un crew
avoir un garde fou qui check le format des données pour rejeter l'import en cas de mauvais format (ex: l'utilisateur import des crew au lieu des racers)

refacto migration

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
