/** @format */

import { cloneElement, isValidElement, useRef } from 'react';
import { type MovableGroupProps } from './types';
import { type Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { genInitPosSatellite } from './../PlannetSystem/utils/index';

const MovableGroup = ({
  children,
  movingDirection = 1,
  movingSpeedDelta = 0,
  a,
  b,
}: MovableGroupProps) => {
  const ref = useRef<Mesh>(null!);

  const directionRef = useRef<1 | -1>(movingDirection);

  useFrame((state, delta) => {
    const currentY = ref.current.position.y;
    let nextY = currentY + directionRef.current * (movingSpeedDelta + delta);

    if (nextY > b && directionRef.current === 1) {
      directionRef.current = -1;
    }

    if (nextY < -1 * b && directionRef.current === -1) {
      directionRef.current = 1;
    }

    nextY = currentY + directionRef.current * (movingSpeedDelta + delta);

    const { x, y } = genInitPosSatellite(a, b, nextY);

    console.log(x, y);
    ref.current.position.setX(x * directionRef.current);
    ref.current.position.setY(y);
  });

  return isValidElement(children) ? (
    <group>{cloneElement(children, { ref: ref as Partial<unknown> & Attributes })}</group>
  ) : (
    <></>
  );
};

export default MovableGroup;
