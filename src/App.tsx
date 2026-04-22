import { Table } from './components/Tables/Table';
import { Filters } from './components/Header/Filters';
import { Header } from './components/Header/Header';
// import '@fontsource/maple-mono';

function App() {
  return (
    <>
      <Header />
      <Filters />
      <Table />
    </>
  );
}

export default App;
