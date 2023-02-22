import React from 'react';
import './App.css';
import { Mafs, Coordinates } from 'mafs';

function App() {
  return (
    <div className='App'>
      <Mafs>
        <Coordinates.Cartesian />
      </Mafs>
    </div>
  );
}

export default App;
