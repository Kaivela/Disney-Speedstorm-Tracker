function ExportBtn() {
  return <button className="btn">Export</button>;
}

function ImportBtn() {
  return <button className="btn">Import</button>;
}

function RacerTableBtn() {
  return <button>Racer</button>;
}

function CrewTableBtn() {
  return <button>Crew</button>;
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
    </header>
  );
}
