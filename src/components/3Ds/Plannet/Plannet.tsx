/** @format */

import { type MutableRefObject, forwardRef, useRef } from 'react';
import { type PlannetProps } from './types';
import { type Mesh } from 'three';
import useInitialPosition from '../hooks/useInitialPosition';
import useRotateAxisY from '../hooks/useRotateAxisY';

const Plannet = forwardRef<Mesh, PlannetProps>(
  (
    {
      radius = 0.5,
      color = 'lightgray',
      rotateSpeedDelta = 0,
      position = [0, 0, 0],
      rotateDirection = 1,
    }: PlannetProps,
    ref,
  ) => {
    const plannet = ref ? ref : useRef<Mesh>(null!);

    useInitialPosition(plannet as MutableRefObject<Mesh>, position);

    useRotateAxisY(plannet as MutableRefObject<Mesh>, rotateSpeedDelta, rotateDirection);

    return (
      <mesh ref={plannet}>
        {/* <sphereGeometry args={[radius, 64, 32]} /> */}
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  },
);

export default Plannet;
