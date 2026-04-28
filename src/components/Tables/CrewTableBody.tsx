import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ModifyCrewBtn } from './ModifyCrewBtn';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import type { ICrew } from '../../types/types';

function Crew({ crew }: { crew: ICrew }) {
  const { settings } = useContext(AppContext);

  return (
    <tr>
      {settings.showCrewColumn.releaseSeason && <td>{crew.releaseSeason}</td>}
      {settings.showCrewColumn.exclusive && <td data-trad={crew.exclusiveTo}>{crew.exclusiveTo}</td>}
      {settings.showCrewColumn.image && (
        <td>
          <img className="td-img" src={`/img/crews/${crew.name}.webp`} />
        </td>
      )}
      {settings.showCrewColumn.collection && <td data-trad={crew.collection}>{crew.collection}</td>}
      {settings.showCrewColumn.rarity && <td data-trad={crew.rarity}>{crew.rarity}</td>}
      {settings.showCrewColumn.name && <td data-trad={crew.name}>{crew.name}</td>}
      {settings.showCrewColumn.currentStars && <td>{crew.currentStars}</td>}
      {settings.showCrewColumn.currentShards && <td>{crew.currentStars === 5 ? 'maxed' : crew.currentShards}</td>}
      {settings.showCrewColumn.shardsNeededToMax && <td>{crew.shardsNeededToMax === 0 ? 'maxed' : crew.shardsNeededToMax}</td>}
      {settings.showCrewColumn.free && <td>{crew.universalBox}</td>}
      <td>
        <ModifyCrewBtn crew={crew} />
      </td>
    </tr>
  );
}

function CrewList() {
  //LOGIC
  const { crewsSaved } = useContext(AppContext);
  const iCrews = buildIElementsArray(crewsSaved);

  //TEMPLATE
  return iCrews.map((crew) => {
    return <Crew key={crew.name} crew={crew} />;
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
