import { getAllCrews } from '../data/collections';

const crews = getAllCrews();

function buildCrewTableBodyData() {
  return crews.map((crew) => {
    const universalBox = {
      true: '✔',
      false: '✖',
      seasonal: '🟣',
    }[crew.universalBox];
    return {
      universalBox,
      exclusiveTo: crew.exclusiveTo,
      collection: crew.collection,
      rarity: crew.rarity,
      name: crew.name,
      currentStars: crew.currentStars,
      currentShards: crew.currentShards,
      shardsNeededToMax: 'ShardsNeeded (to max) Calcul',
    };
  });
}
const crewData = buildCrewTableBodyData();

const crewList = crewData.map((crew, index) => {
  return <Crew key={index} {...crew} />;
});

export function CrewTableBody() {
  return (
    <>
      <tbody>{crewList}</tbody>
    </>
  );
}

function Crew({
  exclusiveTo,
  collection,
  rarity,
  name,
  currentStars,
  currentShards,
  universalBox,
}: ReturnType<typeof buildCrewTableBodyData>[number]) {
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
      <td>ShardsNeeded (to max) Calcul</td>
      <td>{universalBox}</td>
      <td>
        <button data-trad="modify" data-index="${index}">
          Modify
        </button>
      </td>
    </tr>
  );
}
