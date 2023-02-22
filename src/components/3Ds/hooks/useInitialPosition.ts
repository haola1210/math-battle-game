/** @format */

import { type MutableRefObject, useEffect } from 'react';
import { type Mesh } from 'three';
import { type CoordinateVector } from '@interfaces/3D';

export default function useInitialPosition(
  ref: MutableRefObject<Mesh>,
  position: CoordinateVector,
) {
  useEffect(() => {
    if (position) {
      ref.current.position.set(...position);
    }
  }, [position]);
}
