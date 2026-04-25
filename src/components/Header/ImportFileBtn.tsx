import { useContext, useRef, type ChangeEvent } from 'react';
import { StorageService } from '../../services/storage';
import { AppContext } from '../../context/AppContext';
import { migrateCrewsSave, migrateRacersSave } from '../../services/migration';
import type { Mode } from '../../types/types';

const storage = StorageService.getInstance();

function validateFile(file: Record<string, unknown>[], mode: Mode) {
  const hasStar = 'currentStars' in file[0];
  const hasRMJ = 'currentRMJ' in file[0];
  const hasMPL = 'currentMPL' in file[0];

  if (!file || typeof file !== 'object') {
    throw new Error('Format invalide : objet attendu');
  }

  if (mode === 'racer') {
    // un racer doit contenir au moins la clé currentRMJ ou currentMPL selon la version du site
    if (!hasRMJ && !hasMPL) {
      throw new Error('RacerSaved format expected : missing key "currentRMJ" or "currentMPL"');
    }
  } else {
    // un crew doit ne pas contenir la clé currentRMJ ou currentMPL
    if (hasRMJ || hasMPL) {
      throw new Error('CrewSaved format expected : existing key "currentRMJ" or "currentMPL"');
    }
    // un crew doit contenir au moins la clé currentStars
    if (!hasStar) {
      throw new Error('CrewSaved format expected : missing key "currentStars"');
    }
  }

  return true;
}

export function ImportFileBtn() {
  // LOGIC
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mode, setRacersSaved, setCrewsSaved } = useContext(AppContext);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const element = JSON.parse(content) as Record<string, unknown>[];
          validateFile(element, mode);

          if (mode === 'crew') {
            const migratedCrews = migrateCrewsSave(element);
            storage.saveCrews(migratedCrews);
            setCrewsSaved(migratedCrews);
            console.log('Crews imported successfully');
          } else {
            const migratedRacers = migrateRacersSave(element);
            storage.saveRacers(migratedRacers);
            setRacersSaved(migratedRacers);
            console.log('Racers imported successfully');
          }
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
