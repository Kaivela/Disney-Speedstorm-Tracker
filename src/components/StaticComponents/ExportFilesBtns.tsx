import { useContext } from 'react';
import { StorageService } from '../../services/storage';
import type { CrewSaved, RacerSaved } from '../../types/types';
import { AppContext } from '../../context/AppContext';

const storage = StorageService.getInstance();

// Fonction pour export les data dans un fichier json
function download(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function exportFile(fileName: string, fileData: RacerSaved[] | CrewSaved[]) {
  const fileDataStr = JSON.stringify(fileData, null, 2);
  download(fileName, fileDataStr);
}

// export function ExportFileBtn({ mode }: { mode: Mode }) {
export function ExportFileBtn() {
  const mode = useContext(AppContext).mode;
  const fileName = mode === 'crew' ? 'crews.json' : 'racers.json';

  return (
    <button
      onClick={() => {
        const data = mode === 'crew' ? storage.getCrews() : storage.getRacers();
        exportFile(fileName, data);
      }}
      className="btn">
      Export
    </button>
  );
}
