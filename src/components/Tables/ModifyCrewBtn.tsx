import { useContext, useState } from 'react';
import type { ICrew } from '../../types/types';
import { AppContext } from '../../context/AppContext';
import { StorageService } from '../../services/storage';
import Modal from '../Modal';

const storage = StorageService.getInstance();

export function ModifyCrewBtn({ crew }: { crew: ICrew }) {
  // LOGIC
  const [isOpen, setIsOpen] = useState(false);
  const [currentStars, setCurrentStars] = useState(crew.currentStars);
  const [currentShards, setCurrentShards] = useState(crew.currentShards);

  const { crewsSaved, setCrewsSaved } = useContext(AppContext);

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

  // TEMPLATE
  return (
    <>
      <button data-trad="modify" onClick={() => setIsOpen(true)}>
        Modify
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <div>
            <img className="edit-element-img" src={`/img/crews/${crew.name}.webp`} />
            <h2>Modify {crew.name}</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveCrewStateAndStorage();
              setIsOpen(false);
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
              <button type="button" onClick={() => setIsOpen(false)}>
                Fermer
              </button>
            </div>
            <button className="btn" type="submit" data-trad="saveCrew">
              Save Crew
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
