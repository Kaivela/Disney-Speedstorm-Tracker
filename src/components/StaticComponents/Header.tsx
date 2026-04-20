import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ScrollBtns } from '../ScrollBtns';
import { ImportRacerBtn } from './ImportRacerBtn';
import { ImportCrewBtn } from './ImportCrewBtn';
import { ExportFileBtn } from './ExportFilesBtns';

function RacerTableBtn() {
  const { setMode } = useContext(AppContext);
  return (
    <button
      onClick={() => {
        setMode('racer');
      }}>
      Racer
    </button>
  );
}

function CrewTableBtn() {
  const { setMode } = useContext(AppContext);
  return (
    <button
      onClick={() => {
        setMode('crew');
      }}>
      Crew
    </button>
  );
}

function ImportBtn() {
  const { mode } = useContext(AppContext);

  if (mode === 'racer') {
    return <ImportRacerBtn />;
  } else {
    return <ImportCrewBtn />;
  }
}

function AccountStats() {
  return (
    <div className="AccountStats">
      <span>Account Stats</span>
    </div>
  );
}

function OptionsBtn() {
  return <button className="OptionBtn">Options</button>;
}

export function Header() {
  return (
    <header className="Header">
      <h1>Disney Speedstorm Tracker</h1>
      <OptionsBtn />
      <div className="HeaderBtns">
        <span className="btn-group">
          <RacerTableBtn />
          <CrewTableBtn />
        </span>
        <div>
          <ExportFileBtn />
          <ImportBtn />
        </div>
      </div>
      <AccountStats />
      <ScrollBtns />
    </header>
  );
}
