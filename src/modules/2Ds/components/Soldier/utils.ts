import { type Bound } from '@modules/2Ds/types';
import { type vec } from 'mafs';

export const doesPointTouchBound = (point: vec.Vector2, bound: Bound) => {
  const [x, y] = point;
  const [xMin, xMax] = bound[0];
  const [yMin, yMax] = bound[1];

  if (x <= xMin) {
    return { at: 'xMin', value: xMin };
  }

  if (x >= xMax) {
    return { at: 'xMax', value: xMax };
  }

  if (y <= yMin) {
    return { at: 'yMin', value: yMin };
  }

  if (y >= yMax) {
    return { at: 'yMax', value: yMax };
  }

  return false;
};

export const calcultateTrajectory = (f: math.EvalFunction, basePosition: vec.Vector2) => {
  // #region calculating trajectory
  // theoretically
  const fStartPointTheo = [0, f.evaluate({ x: 0 })];

  // value deviation (base on the center)
  const deltaX = basePosition[0] - fStartPointTheo[0];
  const deltaY = basePosition[1] - fStartPointTheo[1];

  // reality
  const rX = (x: number) => x + deltaX;
  const rY = (x: number) => (f.evaluate({ x }) as number) + deltaY;

  const bulletTrajectory = (x: number) => [rX(x), rY(x)] as vec.Vector2;
  // #endregion

  return bulletTrajectory;
};
