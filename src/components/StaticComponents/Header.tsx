import { useContext } from 'react';
import { ModeContext } from '../../context/AppContext';
import { ScrollBtns } from '../ScrollBtns';

function ExportBtn() {
  return <button className="btn">Export</button>;
}

function ImportBtn() {
  return <button className="btn">Import</button>;
}

function RacerTableBtn() {
  const { setMode } = useContext(ModeContext);
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
  const { setMode } = useContext(ModeContext);
  return (
    <button
      onClick={() => {
        setMode('crew');
      }}>
      Crew
    </button>
  );
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
          <ExportBtn />
          <ImportBtn />
        </div>
      </div>
      <AccountStats />
      <ScrollBtns />
    </header>
  );
}
