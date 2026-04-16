import { Table } from './components/Table';
import { Header } from './components/StaticComponents/Header';
import { Filters } from './components/Filters';

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
