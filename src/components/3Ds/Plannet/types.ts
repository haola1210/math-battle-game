/** @format */

import { type RotateDirection, type CoordinateVector } from '@interfaces/3D';

export type PlannetProps = {
  radius?: number;
  color?: string;
  rotateSpeedDelta?: number;
  position?: CoordinateVector;
  rotateDirection?: RotateDirection;
};
