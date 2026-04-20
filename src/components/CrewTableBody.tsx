import { getAllCrews } from '../data/collections';
import { calculateCrewShardsNeeded } from '../compute/calculs';
import type { CrewComputed, ICrew } from '../types/types';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const crewsBlank = getAllCrews();

function Crew(crew: ICrew) {
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
        <button data-trad="modify" data-index="${index}">
          Modify
        </button>
      </td>
    </tr>
  );
}

function CrewList() {
  //LOGIC
  const { crews } = useContext(AppContext);
  const crewsSaved = crews.map((crewSaved) => {
    const crewBlank = crewsBlank.find((crewBlank) => crewBlank.name === crewSaved.name);
    // to prevent crewBlank from being undefined
    if (!crewBlank) throw new Error(`No crew blank found for name: ${crewSaved.name}`);
    return {
      ...crewBlank,
      ...crewSaved,
    };
  });
  //TEMPLATE
  return crewsSaved.map((crewBlankWithSavedData, index) => {
    const computed: CrewComputed = {
      shardsNeededToMax: calculateCrewShardsNeeded(crewBlankWithSavedData),
    };
    return <Crew key={index} {...{ ...crewBlankWithSavedData, ...computed }} />;
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
