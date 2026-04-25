règles
les hooks (fonction qui commencent par use...) sont TOUJOURS dans un composant, et on les déclare tout au début
les fonctions composant ne prennent qu'un objet en paramètre, les props
ex: function MyComponent({maProp1, maProp2, maProp3}: {maProp1: string; maProp2: number; maProp3: boolean;})

un .map ne s'utilise que sur un tableau
examples.map((example) => calculatemoncul(example))

OU

examples.map((example) => {
return example.name
})

fonctions sur les tableaux :
map: pour obtenir un tableau de la même taille que le tableau d'origine, mais avec des éléments différents
filter: pour obtenir un tableau de taille inférieure au tableau d'origine, les éléments restent inchangés
forEach: pour faire des trucs sur chaque élément du tableau, mais ne retourne aucune valeur (ex: faire un console.log sur chaque élément, ou les enregistrer en localstorage un par un)
reduce: dès que tu veux avoir autre chose que ce que tu peux obtenir avec map et filter

POUR REFACTO DEUX FONCTIONS EN UNE (ex ModifyRacer/ModifyCrew => ModifyElement)
on identifie ce qui ce répète et on les passent en props
