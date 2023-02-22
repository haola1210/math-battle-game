/** @format */

import { type RotateDirection } from '@interfaces/3D';
import { useFrame } from '@react-three/fiber';
import { type MutableRefObject } from 'react';
import { type Mesh } from 'three';

export default function useRotateAxisY(
  ref: MutableRefObject<Mesh>,
  rotateSpeedDelta: number,
  rotateDirection: RotateDirection,
) {
  useFrame((state, delta) => {
    ref.current.rotation.y += rotateDirection * (delta + rotateSpeedDelta);
  });
}
