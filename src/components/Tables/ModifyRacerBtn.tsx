import { useContext, useState } from 'react';
import type { IRacer } from '../../types/types';
import { StorageService } from '../../services/storage';
import { AppContext } from '../../context/AppContext';
import Modal from '../Modal';

const storage = StorageService.getInstance();

export function ModifyRacerBtn({ racer }: { racer: IRacer }) {
  // LOGIC
  const [isOpen, setIsOpen] = useState(false);
  const [currentStars, setCurrentStars] = useState(racer.currentStars);
  const [currentStarFragment, setCurrentStarFragment] = useState(racer.currentStarFragment);
  const [currentSuperChargeLevel, setCurrentSuperChargeLevel] = useState(racer.currentSuperChargeLevel);
  const [currentShards, setCurrentShards] = useState(racer.currentShards);
  const [currentSuperChargeTokens, setCurrentSuperChargeTokens] = useState(racer.currentSuperChargeTokens);
  const [currentMPL, setCurrentMPL] = useState(racer.currentMPL);
  const [highestMPL, setHighestMPL] = useState(racer.highestMPL);

  // on doit avoir un tableau de save racers mis à jour avec notre racer modifié
  // on récupère le tableau des save racers non modifié
  const { racersSaved, setRacersSaved } = useContext(AppContext);

  // avec findIndex, on récupère l'index du racer qu'on souhaite modifier
  function saveRacerStateAndStorage() {
    const editedRacers = structuredClone(racersSaved);
    const oldRacerIndex = editedRacers.findIndex((oldRacer) => oldRacer.name === racer.name);
    // on modifie l'item du tableau qui correspond à notre racer modifié
    // racers[index].maprop = ma nouvelle valeur
    editedRacers[oldRacerIndex] = { ...editedRacers[oldRacerIndex], currentStars: currentStars };
    editedRacers[oldRacerIndex] = { ...editedRacers[oldRacerIndex], currentStarFragment: currentStarFragment };
    editedRacers[oldRacerIndex] = { ...editedRacers[oldRacerIndex], currentSuperChargeLevel: currentSuperChargeLevel };
    editedRacers[oldRacerIndex] = { ...editedRacers[oldRacerIndex], currentShards: currentShards };
    editedRacers[oldRacerIndex] = { ...editedRacers[oldRacerIndex], currentSuperChargeTokens: currentSuperChargeTokens };
    editedRacers[oldRacerIndex] = { ...editedRacers[oldRacerIndex], currentMPL: currentMPL };
    editedRacers[oldRacerIndex] = { ...editedRacers[oldRacerIndex], highestMPL: highestMPL };

    // on sauvegarde le tableau modifié dans le local storage et le contexte
    setRacersSaved(editedRacers);
    storage.saveRacers(editedRacers);
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
            <img className="edit-element-img" src={`/img/racers/${racer.name}.webp`} />
            <h2>Modify {racer.name}</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveRacerStateAndStorage();
              // onClose();
              setIsOpen(false);
            }}>
            <label htmlFor="racerCurrentStars">current stars</label>
            <input
              type="number"
              min="0"
              max="6"
              defaultValue={racer.currentStars}
              onChange={(event) => setCurrentStars(Number(event.currentTarget.value))}
              required
              autoFocus
            />

            <label htmlFor="racerCurrentStarFragment">current starFragments</label>
            <input
              type="number"
              min="0"
              max="5"
              defaultValue={racer.currentStarFragment}
              onChange={(event) => setCurrentStarFragment(Number(event.currentTarget.value))}
              required
            />

            {racer.superCharge && (
              <>
                <label htmlFor="racerCurrentSuperChargeLevel">current superCharge Level</label>
                <input
                  type="number"
                  min="0"
                  max="2"
                  defaultValue={racer.currentSuperChargeLevel}
                  onChange={(event) => setCurrentSuperChargeLevel(Number(event.currentTarget.value))}
                  required
                />
              </>
            )}

            <label htmlFor="racerCurrentShards">current shards</label>
            <input
              type="number"
              min="0"
              max="260"
              defaultValue={racer.currentShards}
              onChange={(event) => setCurrentShards(Number(event.currentTarget.value))}
              required
            />

            {racer.superCharge && (
              <>
                <label htmlFor="racerCurrentSuperChargeTokens">current superCharge Tokens</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  defaultValue={racer.currentSuperChargeTokens}
                  onChange={(event) => setCurrentSuperChargeTokens(Number(event.currentTarget.value))}
                  required
                />
              </>
            )}

            <label htmlFor="racerCurrentMPL">currentMPL</label>
            <input
              type="number"
              min="0"
              max="40"
              defaultValue={racer.currentMPL}
              onChange={(event) => setCurrentMPL(Number(event.currentTarget.value))}
              required
            />

            <label htmlFor="racerHighestMPL">highestMPL</label>
            <input
              type="number"
              id="highestRMJ"
              min="0"
              max="40"
              defaultValue={racer.highestMPL}
              onChange={(event) => setHighestMPL(Number(event.currentTarget.value))}
              required
            />

            <div style={{ marginTop: '10px' }}>
              <button type="button" onClick={() => setIsOpen(false)}>
                Fermer
              </button>
            </div>
            <button className="btn" type="submit" data-trad="saveRacer">
              Save Racer
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
