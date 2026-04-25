import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ModifyCrewBtn } from './ModifyCrewBtn';
import { buildIElements } from '../../compute/buildElementTable';
import type { ICrew } from '../../types/types';

function Crew({ crew }: { crew: ICrew }) {
  return (
    <tr>
      <td>{crew.releaseSeason}</td>
      <td data-trad={crew.exclusiveTo}>{crew.exclusiveTo}</td>
      <td>
        <img src={`/img/crews/${crew.name}.webp`} />
      </td>
      <td data-trad={crew.collection}>{crew.collection}</td>
      <td data-trad={crew.rarity}>{crew.rarity}</td>
      <td data-trad={crew.name}>{crew.name}</td>
      <td>{crew.currentStars}</td>
      <td>{crew.currentStars === 5 ? 'maxed' : crew.currentShards}</td>
      {/* */}
      <td>{crew.shardsNeededToMax === 0 ? 'maxed' : crew.shardsNeededToMax}</td>
      <td>{crew.universalBox}</td>
      <td>
        <ModifyCrewBtn crew={crew} />
      </td>
    </tr>
  );
}

function CrewList() {
  //LOGIC
  const { crews } = useContext(AppContext);
  const iCrews = buildIElements(crews);

  //TEMPLATE
  return iCrews.map((crew) => {
    return <Crew crew={crew} />;
  });
}

export function CrewTableBody() {
  // TEMPLATE
  return (
    <>
      <tbody>
        <CrewList />
      </tbody>
    </>
  );
}
