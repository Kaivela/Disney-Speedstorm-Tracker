import type { RacerSaved } from '../../types/types';
import { StorageService } from '../../services/storage';
import { useRef } from 'react';

const storage = StorageService.getInstance();

export function ImportRacerBtn() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    fileInputRef.current?.click(); // ouvre la fenêtre de sélection
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const racers = JSON.parse(text) as RacerSaved[];
        storage.saveRacers(racers);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>
        Import
      </button>
      <input className="hidden" type="file" accept="json" ref={fileInputRef} onChange={handleFileChange} />
    </div>
  );
}
