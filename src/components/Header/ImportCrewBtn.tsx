export function ImportCrewBtn() {
  return <button className="btn">Import</button>;
}

// HTML.crewImportButton.addEventListener('click', () => {
//   const input = document.createElement('input');
//   input.type = 'file';
//   input.accept = '.json';
//   input.onchange = (event) => {
//     const target = event.target as HTMLInputElement;
//     if (target.files && target.files.length > 0) {
//       const file = target.files[0];
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const text = event.target?.result as string;
//         const crews = JSON.parse(text) as Crew[];
//         storage.saveCrews(crews);
//         HTML.crewTableBody.innerHTML = ''; // Vide le tableau avant de le remplir
//         addCrewsToTable(lang, HTML.crewTableBody);
//         updateCrewFormFranchise(lang);
//         const stats = calculateTotal(goal, levelGoal);
//         uiManager.updateTotalStats(stats, levelGoal, lang);
//       };
//       reader.readAsText(file);
//     }
//   };
//   input.click();
// });
