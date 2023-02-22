/** @format */

import { type RotateDirection } from '@interfaces/3D';
import { type ReactNode } from 'react';

export type MovableGroupProps = {
  children: ReactNode;
  movingDirection?: RotateDirection;
  movingSpeedDelta?: number;
  a: number;
  b: number;
};
