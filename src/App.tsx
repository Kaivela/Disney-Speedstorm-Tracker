import { Table } from './components/Tables/Table';
import { Filters } from './components/Header/Filters';
import { Header } from './components/Header/Header';
import { SettingsBtn } from './components/Header/SettingsBtn';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
// import '@fontsource/maple-mono';

function App() {
  const { settings } = useContext(AppContext);
  return (
    <div className="background" style={{ backgroundImage: `url("img/backgrounds/background season${settings.theme}.webp")` }}>
      <Header />
      <Filters />
      <Table />
      <SettingsBtn />
    </div>
  );
}

export default App;
