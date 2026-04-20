export function ImportRacerBtn() {
  return <button className="btn">Import</button>;
}

// Import Pilots Button
// HTML.pilotImportButton.addEventListener('click', () => {
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
//         const pilots = JSON.parse(text) as Pilot[];
//         storage.savePilots(pilots);
//         HTML.pilotTableBody.innerHTML = ''; // Vide le tableau avant de le remplir
//         addPilotsToTable(lang, HTML.pilotTableBody);
//         updatePilotFormFranchise(lang);
//         const stats = calculateTotal(goal, levelGoal);
//         uiManager.updateTotalStats(stats, levelGoal, lang);
//       };
//       reader.readAsText(file);
//     }
//   };
//   input.click();
// });
