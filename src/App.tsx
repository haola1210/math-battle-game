import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { Mafs, Coordinates, Point, Circle, Polygon } from 'mafs';

function App() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const container = useRef<null | HTMLDivElement>(null);
  const [size, setSize] = useState([1067, 600]);

  useEffect(() => {
    if (container.current) {
      setSize([container.current.clientWidth, container.current.clientHeight]);
    }
  }, []);

  return (
    <div
      className='App'
      ref={container}
    >
      <Mafs
        pan={true}
        zoom={{
          min: 0.2,
          max: 1,
        }}
        viewBox={{
          x: [-9, 9],
          y: [-6, 6],
        }}
        preserveAspectRatio='contain'
        width={size[0]}
        height={size[1]}
      >
        <Coordinates.Cartesian
          xAxis={{
            labels: false,
            lines: false,
          }}
          yAxis={{
            labels: false,
            lines: false,
          }}
        />
        {/* <Point
          x={3}
          y={3}
          svgCircleProps={{
            r: 2,
          }}
        /> */}

        <Polygon
          points={[
            [-50, -35],
            [50, -35],
            [50, 35],
            [-50, 35],
          ]}
        />

        <Circle
          center={[3, 3]}
          radius={0.7}
          fillOpacity={1}
        />
      </Mafs>
    </div>
  );
}

export default App;
