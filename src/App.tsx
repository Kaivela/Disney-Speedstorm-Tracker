import { Table } from './components/Tables/Table';
import { Filters } from './components/Header/Filters';
import { Header } from './components/Header/Header';
import { SettingsBtn } from './components/Header/SettingsBtn';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
// import '@fontsource/maple-mono';

function App() {
  const { settings } = useContext(AppContext);
  const style = {
    backgroundImage: `url("img/backgrounds/background season${settings.theme}.webp")`,
    '--bg-color-even': settings.transparent ? '#ccccccb3' : '#cccccc',
    '--bg-color-odd': settings.transparent ? '#ffffffb3' : '#ffffff',
  };

  return (
    <div className="background" style={style}>
      <Header />
      <Filters />
      <Table />
      <SettingsBtn />
    </div>
  );
}

export default App;
