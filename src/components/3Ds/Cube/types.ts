/** @format */

import { type CoordinateVector } from '@interfaces/3D';

export type CubeProps = {
  /** The size of this `Cube`: `[width, height, length]` */
  size?: CoordinateVector;
  /**
   * Color of this Cube
   */
  color?: string;
  /**
   * Should it rotate a little bit on mounting
   */
  initialRotate?: boolean;
  /**
   * What is coordinater this Cube? (type `[x, y, z]`)
   */
  position?: CoordinateVector;
};
