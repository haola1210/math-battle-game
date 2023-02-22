import React, { useEffect, useRef } from 'react';
import { extend } from '@react-three/fiber';
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { type CubeProps } from './types';
import useInitialPosition from '../hooks/useInitialPosition';

extend({ Mesh, BoxGeometry, MeshBasicMaterial });

/**
 * This is just a 3D `Cube` object
 */
const Cube = ({
  color = 'gray',
  size = [1, 1, 1],
  position = [0, 0, 0],
  initialRotate = false,
}: CubeProps) => {
  const ref = useRef<Mesh>(null!);

  useEffect(() => {
    if (initialRotate) {
      ref.current.rotateZ(Math.PI / 4);
      ref.current.rotateX(Math.PI / 6);
    }
  }, [initialRotate]);

  useInitialPosition(ref, position);

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Cube;
