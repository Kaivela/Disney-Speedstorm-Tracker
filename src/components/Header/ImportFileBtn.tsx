import { useContext, useRef, useState, type ChangeEvent } from 'react';
import { StorageService } from '../../services/storage';
import { AppContext } from '../../context/AppContext';
import { migrateCrewsSave, migrateRacersSave } from '../../services/migration';

const storage = StorageService.getInstance();

export function ImportRacerBtn() {
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

export function ImportCrewBtn() {
  // LOGIC
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setCrews } = useContext(AppContext);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const crews = JSON.parse(content) as Record<string, unknown>[];
          const migratedCrews = migrateCrewsSave(crews);
          storage.saveCrews(migratedCrews);
          setCrews(migratedCrews);
          console.log('Crews imported successfully');
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
