import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { Mafs, Coordinates } from 'mafs';
import BoundContextProvider from '@modules/2Ds/contexts/BoundContext';
import Soldier from '@modules/2Ds/components/Soldier';
import MapRange from '@modules/2Ds/components/MapRange';
import { useEventBus } from '@modules/2Ds/contexts/EventBusContext';
import * as math from 'mathjs';

function App() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const container = useRef<null | HTMLDivElement>(null);
  const [size, setSize] = useState([1067, 600]);

  useEffect(() => {
    if (container.current) {
      setSize([container.current.clientWidth, container.current.clientHeight]);
    }
  }, []);

  // #region
  const bus$ = useEventBus();

  const shoot = () => {
    try {
      const f = math.compile(equation);
      bus$.next({
        action: 'SHOOT',
        payload: f,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const [equation, setEquation] = useState('');

  // #endregion

  return (
    <div
      className='App'
      ref={container}
    >
      <br />
      <input
        type='text'
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
      />
      <button
        onClick={shoot}
        disabled={equation === ''}
      >
        shoot
      </button>
      <br />
      <BoundContextProvider
        bound={[
          [-50, 50],
          [-35, 35],
        ]}
      >
        <Mafs
          pan={true}
          zoom={{
            min: 0.15,
            max: 1,
          }}
          viewBox={{
            x: [-10, 10],
            y: [-7, 7],
          }}
          preserveAspectRatio='contain'
          width={size[0]}
          height={size[1]}
        >
          <Coordinates.Cartesian
            xAxis={{
              labels: (x) => (Math.abs(x) <= 50 && x % 10 === 0 ? x : ''),
              lines: false,
            }}
            yAxis={{
              labels: (y) => (Math.abs(y) <= 35 && y % 10 === 0 ? y : ''),
              lines: false,
            }}
          />

          <MapRange />

          <Soldier initialCenter={[10, 3]} />
        </Mafs>
      </BoundContextProvider>
    </div>
  );
}

export default App;
