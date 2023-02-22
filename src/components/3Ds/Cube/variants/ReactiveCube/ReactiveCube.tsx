/** @format */

import { useState } from 'react';
import type { ReactiveCubeProps } from './types';
import Cube from '../../Cube';
import { useCallback } from 'react';
import { type ThreeEvent } from '@react-three/fiber';

/**
 * Just a hoverable `Cube`
 */
const ReactiveCube = ({
  color,
  position,
  hoveringColor = 'orange',
  ...rest
}: ReactiveCubeProps) => {
  const [hovering, setHover] = useState(false);

  const handlePointerEnter = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (!hovering) {
        setHover(() => true);
      }
    },
    [hovering],
  );

  const handlePointerLeave = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (hovering) {
        setHover(() => false);
      }
    },
    [hovering],
  );

  return (
    <group
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Cube
        {...rest}
        color={hovering ? hoveringColor : color ? color : 'gray'}
      />
    </group>
  );
};

export default ReactiveCube;
