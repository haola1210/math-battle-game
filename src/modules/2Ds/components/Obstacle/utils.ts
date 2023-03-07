import { vec } from 'mafs';

export const didCollide = (cVec: vec.Vector2, r: number, pVec: vec.Vector2) => {
  const distance = vec.dist(cVec, pVec);

  if (Math.abs(distance) <= r) {
    return true;
  }

  return false;
};
