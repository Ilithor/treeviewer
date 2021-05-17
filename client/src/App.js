import LineChart from './components/LineChart/LineChart';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="hierarchy" role="navigation">
        {/* Task: Add hierarchy component here */}
      </div>
      <div className="main" role="main">
        <LineChart 
          from={'2021-01-01'}
          to={'2021-01-10'}
          min={0}
          max={100}
          data={[ /* Task: Pass data to the line chart component here */ ]} />
      </div>
    </div>
  );
}

export default App;
