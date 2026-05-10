import { useContext } from 'react';
import type { ICrew, IRacer } from '../../types/types';
import { AppContext } from '../../context/AppContext';

export function ElementImgHtml({ element }: { element: IRacer | ICrew }) {
  // LOGIC
  const { mode } = useContext(AppContext);
  let elementtype;
  if (mode === 'racer') elementtype = 'racers';
  else elementtype = 'crews';
  // TEMPLATE
  return (
    <img
      className="m-auto"
      src={`/img/${elementtype}/${element.name}.webp`}
      onError={(e) => {
        e.currentTarget.onerror = null; // évite une boucle infinie
        e.currentTarget.src = '/img/Locked.webp';
      }}
    />
  );
}
