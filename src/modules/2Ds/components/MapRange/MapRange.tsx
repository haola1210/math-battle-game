import { useBoundContext } from '@modules/2Ds/contexts/BoundContext';
import { Polygon } from 'mafs';
export default function MapRange() {
  const [[xMin, xMax], [yMin, yMax]] = useBoundContext();

  return (
    <Polygon
      points={[
        [xMin, yMin],
        [xMax, yMin],
        [xMax, yMax],
        [xMin, yMax],
      ]}
    />
  );
}
