import { useContext, useRef, useState, type ChangeEvent } from 'react';
import { StorageService } from '../../services/storage';
import { AppContext } from '../../context/AppContext';
import { migrateRacersSave } from '../../services/migration';

const storage = StorageService.getInstance();

export function ImportFileBtn() {
  // LOGIC
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setRacers /*, setCrews */ } = useContext(AppContext);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const racers = JSON.parse(content) as Record<string, unknown>[];
          const migratedRacers = migrateRacersSave(racers);
          storage.saveRacers(migratedRacers);
          setRacers(migratedRacers);
          console.log('Racers imported successfully');
        } catch (error) {
          console.error('Fichier JSON invalide', error);
        }
      };
      reader.readAsText(file);
    }
  }

  // TEMPLATE
  return (
    <>
      <button className="btn" onClick={() => inputRef.current?.click()}>
        Import
      </button>
      <input className="hidden" type="file" ref={inputRef} accept=".json" onChange={handleChange} />
    </>
  );
}

// Import Pilots Button
// HTML.pilotImportButton.addEventListener("click", () => {
//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = ".json";
//   input.onchange = (event) => {
//     const target = event.target as HTMLInputElement;
//     if (target.files && target.files.length > 0) {
//       const file = target.files[0];
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const text = event.target?.result as string;
//         const pilots = JSON.parse(text) as Pilot[];
//         storage.savePilots(pilots);
//         HTML.pilotTableBody.innerHTML = ""; // Vide le tableau avant de le remplir
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

// quand on appuie sur le bouton import
// on crée un tsx input (type:"file" accept:".json" onChange(uneFonction))
// on appuie sur le input
// si (file) {on parse le text ; on save les racer avec cette nouvelle valeur}
