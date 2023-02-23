import { type Bound } from '@modules/2Ds/types';
import { type vec } from 'mafs';

export const doesPointTouchBound = (point: vec.Vector2, bound: Bound) => {
  const [x, y] = point;
  const [xMin, xMax] = bound[0];
  const [yMin, yMax] = bound[1];

  return x <= xMin || x >= xMax || y <= yMin || y >= yMax;
};
