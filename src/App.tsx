import { Table } from './components/Tables/Table';
import { Filters } from './components/Header/Filters';
import { Header } from './components/Header/Header';
import { SettingsBtn } from './components/Header/SettingsBtn';
// import '@fontsource/maple-mono';

function App() {
  return (
    <>
      <Header />
      <Filters />
      <Table />
      <SettingsBtn />
    </>
  );
}

export default App;
