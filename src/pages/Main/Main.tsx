import MapRange from '@modules/2Ds/components/MapRange';
import { Circle, ConvexPolygon, Polygon } from '@modules/2Ds/components/Obstacle';
import Soldier from '@modules/2Ds/components/Soldier';
import BoundContextProvider from '@modules/2Ds/contexts/BoundContext';
import { useEventBus } from '@modules/2Ds/contexts/EventBusContext';
import { Coordinates, Mafs } from 'mafs';
import React, { useEffect, useRef, useState } from 'react';

const Main = () => {
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
    bus$.next({
      action: 'SHOOT',
      payload: equation,
    });
  };

  const [equation, setEquation] = useState('');

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

          {/* <Circle
            position={[17, 20]}
            r={5}
          />
          <ConvexPolygon
            position={[-17, 10]}
            r={4}
            sides={3}
          /> */}
          <Polygon
            points={[
              [-2, 2],
              [2, 2],
              [2, -3],
              [-2, -3],
              [0, 0],
            ]}
          />

          <Soldier initialCenter={[-12, -10]} />
        </Mafs>
      </BoundContextProvider>
    </div>
  );
};

export default Main;
