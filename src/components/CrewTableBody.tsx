import { getAllCrews } from '../data/collections';
import { calculateCrewShardsNeeded } from '../compute/Calculs';
import type { ICrew } from '../types/types';

const crews = getAllCrews();

function buildCrewTableBodyData() {
  return crews.map((crew) => {
    const shardsNeededToMax = calculateCrewShardsNeeded(crew);
    return {
      collection: crew.collection,
      currentShards: crew.currentShards,
      currentStars: crew.currentStars,
      exclusiveTo: crew.exclusiveTo,
      name: crew.name,
      rarity: crew.rarity,
      universalBox: crew.universalBox,
      shardsNeededToMax: shardsNeededToMax > 0 ? shardsNeededToMax : ('Maxed' as const),
    };
  });
}
const crewData = buildCrewTableBodyData();

const crewList = crewData.map((crew, index) => {
  return <Crew key={index} {...crew} />;
});

function Crew({ exclusiveTo, collection, rarity, name, currentStars, currentShards, universalBox, shardsNeededToMax }: ICrew) {
  return (
    <tr>
      <td>
        <img src={`/img/crews/${name}.webp`} />
      </td>
      <td data-trad={exclusiveTo}>{exclusiveTo}</td>
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

export function CrewTableBody() {
  return (
    <>
      <tbody>{crewList}</tbody>
    </>
  );
}
