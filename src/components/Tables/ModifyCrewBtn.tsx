import { useContext, useState } from 'react';
import type { ICrew } from '../../types/types';
import { AppContext } from '../../context/AppContext';
import { StorageService } from '../../services/storage';
type ModalProps = {
  onClose: () => void;
  crew: ICrew;
};

const storage = StorageService.getInstance();

function Modal({ onClose, crew }: ModalProps) {
  // on créé un state local pour chaque champ du formulaire
  // on les initialise avec le crew en props
  const [currentStars, setCurrentStars] = useState(crew.currentStars);
  const [currentShards, setCurrentShards] = useState(crew.currentShards);
  // on doit avoir un tableau de save crews mis à jour avec notre crew modifié
  // on récupère le tableau des save crews non modifié
  const { crewsSaved, setCrewsSaved } = useContext(AppContext);

  // avec findIndex, on récupère l'index du crew qu'on souhaite modifier
  function saveCrewStateAndStorage() {
    const editedCrews = structuredClone(crewsSaved);
    const oldCrewIndex = editedCrews.findIndex((oldCrew) => oldCrew.name === crew.name);
    // on modifie l'item du tableau qui correspond à notre crew modifié
    // crews[index].maprop = ma nouvelle valeur
    editedCrews[oldCrewIndex] = { ...editedCrews[oldCrewIndex], currentStars: currentStars };
    editedCrews[oldCrewIndex] = { ...editedCrews[oldCrewIndex], currentShards: currentShards };

    editedCrews[oldCrewIndex].currentStars = currentStars;
    editedCrews[oldCrewIndex].currentShards = currentShards;
    // on sauvegarde le tableau modifié dans le local storage et le contexte
    setCrewsSaved(editedCrews);
    storage.saveCrews(editedCrews);
  }

  // on l'édite dans les onchange des inputs
  return (
    <div className="overlay">
      <div className="modal">
        <div>
          <img src={`/img/crews/${crew.name}.webp`} />
          <h2>Modify {crew.name}</h2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveCrewStateAndStorage();
            onClose();
          }}>
          <label htmlFor="crewCurrentStars">current stars</label>
          <input
            type="number"
            min="0"
            max="5"
            defaultValue={crew.currentStars}
            onChange={(event) => setCurrentStars(Number(event.currentTarget.value))}
            required
            autoFocus
          />

          <label htmlFor="crewCurrentShards">current shards</label>
          <input
            type="number"
            min="0"
            max={crew.rarity === 'Epic' ? '100' : '75'}
            defaultValue={crew.currentShards}
            onChange={(event) => setCurrentShards(Number(event.currentTarget.value))}
            required
          />

          <div style={{ marginTop: '10px' }}>
            <button type="button" onClick={onClose}>
              Fermer
            </button>
          </div>
          <button className="btn" type="submit" data-trad="saveCrew">
            Save Crew
          </button>
        </form>
      </div>
    </div>
  );
}

export function ModifyCrewBtn({ crew }: { crew: ICrew }) {
  // LOGIC
  const [isOpen, setIsOpen] = useState(false);
  // TEMPLATE
  return (
    <>
      <button data-trad="modify" onClick={() => setIsOpen(true)}>
        Modify
      </button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} crew={crew} />}
    </>
  );
}
