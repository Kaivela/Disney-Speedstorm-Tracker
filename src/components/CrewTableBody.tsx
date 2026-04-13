import { getAllCrews } from '../data/collections';

export function CrewTableBody() {
  const crews = getAllCrews();
  return (
    <>
      <tbody>
        {crews.map((crew, index) => (
          <tr key={index}>
            <td>
              <img src={`/img/crews/${crew.name}.webp`} />
            </td>
            <td data-trad={crew.exclusiveTo}>{crew.exclusiveTo}</td>
            <td data-trad={crew.collection}>{crew.collection}</td>
            <td data-trad={crew.rarity}>{crew.rarity}</td>
            <td data-trad={crew.name}>{crew.name}</td>
            <td>{crew.currentStars}</td>
            <td>{crew.currentShards}</td>
            <td>ShardsNeeded (to max) Calcul</td>
            <td>{crew.universalBox ? 'Yes' : 'No'}</td>
            <td>
              <button data-trad="modify" data-index="${index}">
                Modify
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
