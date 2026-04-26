import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ScrollBtns } from './ScrollBtns';
import { ExportFileBtn } from './ExportFilesBtns';
import { ImportFileBtn } from './ImportFileBtn';
import { AccountStats } from './AccountStats';
import type { Mode } from '../../types/types';

function ElementTableBtn({ mode }: { mode: Mode }) {
  const { setMode } = useContext(AppContext);
  return (
    <button
      onClick={() => {
        setMode(mode);
      }}>
      {mode}
    </button>
  );
}

export function Header() {
  return (
    <header className="Header">
      <h1>Disney Speedstorm Tracker</h1>
      <div className="HeaderBtns">
        <span className="btn-group">
          <ElementTableBtn mode={'racer'} />
          <ElementTableBtn mode={'crew'} />
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
