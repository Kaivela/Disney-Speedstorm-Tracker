import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { ScrollBtns } from './ScrollBtns';
import { ExportFileBtn } from './ExportFilesBtns';
import { ImportFileBtn } from './ImportFileBtn';
import { AccountStats } from './AccountStats';
import { ToggleGroup } from '@skeletonlabs/skeleton-react';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { mode, setMode } = useContext(AppContext);
  const { t } = useTranslation();
  return (
    <header className="Header">
      <h1 className="h2">Disney Speedstorm Tracker</h1>
      <div className="flex gap-2 items-center justify-around mb-3">
        <ToggleGroup value={[mode]} className="bg-black/20 backdrop-blur-xs">
          <ToggleGroup.Item className="px-10 py-2 aspect-auto" value="racer" onClick={() => setMode('racer')}>
            {t('mode.racer')}
          </ToggleGroup.Item>
          <ToggleGroup.Item className="px-10 py-2 aspect-auto" value="crew" onClick={() => setMode('crew')}>
            {t('mode.crew')}
          </ToggleGroup.Item>
        </ToggleGroup>
        <div className="flex gap-1 h-min">
          <ExportFileBtn />
          <ImportFileBtn />
        </div>
      </div>
      <AccountStats />
      <ScrollBtns />
    </header>
  );
}
