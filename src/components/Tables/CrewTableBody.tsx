import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ModifyCrewBtn } from './ModifyCrewBtn';
import { buildIElementsArray } from '../../compute/buildIElementArray';
import type { ICrew } from '../../types/types';
import { ElementImgHtml } from './ElementImgHtml';

function Crew({ crew }: { crew: ICrew }) {
  const { settings } = useContext(AppContext);

  return (
    <tr>
      {settings.showCrewColumn.releaseSeason && <td>{crew.releaseSeason}</td>}
      {settings.showCrewColumn.exclusive && <td data-trad={crew.exclusiveTo}>{crew.exclusiveTo}</td>}
      {settings.showCrewColumn.image && (
        <td className="td-img">
          <ElementImgHtml element={crew} />
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
  const { crewsSaved, crewFilters, sortCrewColumn } = useContext(AppContext);
  const iCrews = buildIElementsArray(crewsSaved);

  return iCrews
    .filter((crew) => {
      let nameFilter = true;
      let seasonFilter = true;
      let shardsFilter = true;
      let collectionFilter = true;
      let rarityFilter = true;
      let starsFilter = true;
      let freeFilter = true;

      if (crewFilters.name) {
        nameFilter = crew.name.toLowerCase().includes(crewFilters.name.toLowerCase());
      }
      if (crewFilters.season !== -1) {
        seasonFilter = crew.releaseSeason === crewFilters.season;
      }
      if (crewFilters.shardsNeeded) {
        switch (crewFilters.shardsNeeded) {
          case 'above50':
            shardsFilter = crew.shardsNeededToMax > 50;
            break;

          case 'between21and50':
            shardsFilter = crew.shardsNeededToMax <= 50 && crew.shardsNeededToMax > 21;
            break;

          case 'between1and20':
            shardsFilter = crew.shardsNeededToMax <= 20 && crew.shardsNeededToMax > 1;
            break;

          case 'not0':
            shardsFilter = crew.shardsNeededToMax !== 0;
            break;

          case '0':
            shardsFilter = crew.shardsNeededToMax === 0;
            break;
        }
      }
      if (crewFilters.collection) {
        collectionFilter = crew.collection.toLowerCase() === crewFilters.collection.toLowerCase();
      }
      if (crewFilters.rarity) {
        rarityFilter = crew.rarity.toLowerCase().includes(crewFilters.rarity.toLowerCase());
      }

      if (crewFilters.currentStars !== -1) {
        starsFilter = crew.currentStars === crewFilters.currentStars;
      }
      if (crewFilters.universalBox) {
        freeFilter = crew.universalBox === crewFilters.universalBox;
      }

      return nameFilter && seasonFilter && shardsFilter && collectionFilter && rarityFilter && starsFilter && freeFilter;
    })
    .sort((crewA: ICrew, crewB: ICrew) => {
      if (sortCrewColumn.order === 'asc') {
        return crewA[sortCrewColumn.columnName] - crewB[sortCrewColumn.columnName];
      }
      if (sortCrewColumn.order === 'desc') {
        return crewB[sortCrewColumn.columnName] - crewA[sortCrewColumn.columnName];
      }
      return 0;
    })
    .map((crew) => {
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
