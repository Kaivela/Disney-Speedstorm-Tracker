import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ScrollBtns } from './ScrollBtns';
import { ExportFileBtn } from './ExportFilesBtns';
import { ImportFileBtn } from './ImportFileBtn';

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

function AccountStats() {
  return (
    <div className="AccountStats">
      <span>Account Stats</span>
    </div>
  );
}

function SettingsBtn() {
  return (
    <button className="SettingsBtn">
      <img src="img\settings.svg" width="30px" />
    </button>
  );
}

export function Header() {
  return (
    <header className="Header">
      <h1>Disney Speedstorm Tracker</h1>
      <SettingsBtn />
      <div className="HeaderBtns">
        <span className="btn-group">
          <RacerTableBtn />
          <CrewTableBtn />
        </span>
        <div>
          <ExportFileBtn />
          <ImportFileBtn />
        </div>
      </div>
      <AccountStats />
      <ScrollBtns />
    </header>
  );
}
