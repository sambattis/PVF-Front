import React from 'react';
import DataChart from './DataChart';
import DataChart_flora from './DataChart_flora';

const App = () => {
  try {
    return (
      <div className="App">
        <h1>PV Population Data</h1>
        <DataChart />
        <DataChart_flora />
      </div>
    );
  } catch (error) {
    console.error('Error in App component:', error);
    return <div>An error occurred. Please check the console for details.</div>;
  }
};

export default App;