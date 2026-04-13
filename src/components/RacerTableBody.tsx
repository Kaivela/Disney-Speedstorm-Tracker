import { getAllRacers } from '../data/collections';

export function RacerTableBody() {
  const racers = getAllRacers();
  return (
    <tbody>
      {racers.map((racer, index) => (
        <tr key={index}>
          <td>{racer.releaseSeason}</td>
          <td>
            <img src={`/img/racers/${racer.name}.webp`} />
          </td>
          <td data-trad={racer.collection}>{racer.collection}</td>
          <td data-trad={racer.rarity}>{racer.rarity}</td>
          <td data-trad={racer.role}>{racer.role}</td>
          <td data-trad={racer.name}>{racer.name}</td>
          <td>{racer.currentStars}</td>
          <td>{racer.currentStarFragment}</td>
          <td>{racer.currentShards}</td>
          <td>{racer.currentSuperChargeLevel}</td>
          <td>{racer.currentSuperChargeShards}</td>
          <td>{racer.currentMPL}</td>
          <td>{racer.highestMPL}</td>
          <td>badge max MPL</td>
          <td>ShardsNeeded (to max) Calcul</td>
          <td>ShardsToGet in MPL Calcul</td>
          <td>coinsNeeded (to max) Calcul</td>
          <td>{racer.universalBox ? '✔' : '✖'}</td>
          <td>shardsNeeded (next star) calcul</td>
          <td>coinsNeeded (next star) calcul</td>
          <td>shardsNeeded (if max MPL) calcul</td>
          <td>
            <button data-trad="modify" data-index="${index}">
              Modify
            </button>
            <button data-trad="calculate" data-index="${index}">
              Calculate
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
