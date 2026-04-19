import { getAllCrews } from '../data/collections';
import { calculateCrewShardsNeeded } from '../compute/calculs';
import type { ICrew } from '../types/types';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const crewsBlank = getAllCrews();

function Crew({ exclusiveTo, collection, rarity, name, currentStars, currentShards, universalBox, shardsNeededToMax, releaseSeason }: ICrew) {
  return (
    <tr>
      <td>{releaseSeason}</td>
      <td data-trad={exclusiveTo}>{exclusiveTo}</td>
      <td>
        <img src={`/img/crews/${name}.webp`} />
      </td>
      <td data-trad={collection}>{collection}</td>
      <td data-trad={rarity}>{rarity}</td>
      <td data-trad={name}>{name}</td>
      <td>{currentStars}</td>
      <td>{currentShards}</td>
      <td>{shardsNeededToMax}</td>
      <td>{universalBox}</td>
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
  const crewsData = crews.map((crew) => {
    const found = crewsBlank.find((crewBlank) => crewBlank.name === crew.name);
    return {
      ...found,
      ...crew,
    };
  });
  //TEMPLATE
  return crewsData.map((crew, index) => {
    const computed = {
      shardsNeededToMax: calculateCrewShardsNeeded(crew),
    };
    return <Crew key={index} {...{ ...crew, ...computed }} />;
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
