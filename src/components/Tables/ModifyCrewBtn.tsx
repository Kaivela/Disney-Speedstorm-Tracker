import { useContext, useState } from 'react';
import type { ICrew } from '../../types/types';
import { AppContext } from '../../context/AppContext';
import Modal from '../Modal';

export function ModifyCrewBtn({ crew }: { crew: ICrew }) {
  // LOGIC
  const [isOpen, setIsOpen] = useState(false);
  const [currentStars, setCurrentStars] = useState(crew.currentStars);
  const [currentShards, setCurrentShards] = useState(crew.currentShards);

  const { crewsSaved, updateCrews } = useContext(AppContext);

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
    updateCrews(editedCrews);
  }

  // TEMPLATE
  return (
    <>
      <button className="btn btn-sm preset-filled-primary-50-950" data-trad="modify" onClick={() => setIsOpen(true)}>
        Edit
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <div className="mb-5">
            <img className="edit-element-img" src={`/img/crews/${crew.name}.webp`} />
            <h2 className="h4">Edit {crew.name}</h2>
          </div>
          <form
            className="grid grid-cols-2 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              saveCrewStateAndStorage();
              setIsOpen(false);
            }}>
            <label htmlFor="crewCurrentStars">Current Stars :</label>
            <input
              className="input"
              type="number"
              min="0"
              max="5"
              defaultValue={crew.currentStars}
              onChange={(event) => setCurrentStars(Number(event.currentTarget.value))}
              required
              autoFocus
            />

            <label htmlFor="crewCurrentShards">Current Shards :</label>
            <input
              className="input"
              type="number"
              min="0"
              max={crew.rarity === 'Epic' ? '100' : '75'}
              defaultValue={crew.currentShards}
              onChange={(event) => setCurrentShards(Number(event.currentTarget.value))}
              required
            />
            <div className="mt-5 flex justify-around gap-2 col-span-full">
              <button className="btn preset-filled-error-50-950" type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="btn preset-filled-primary-50-950" type="submit" data-trad="saveCrew">
                Save Crew
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
