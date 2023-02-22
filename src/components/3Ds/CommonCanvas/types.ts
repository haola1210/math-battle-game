/** @format */

import { type CoordinateVector } from '@interfaces/3D';
import { type ReactNode } from 'react';

export type CommonCanvasProps = {
  cameraPosition?: CoordinateVector;

  children: ReactNode;
};
