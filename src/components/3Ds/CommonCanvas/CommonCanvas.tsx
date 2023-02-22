/** @format */

import { PerspectiveCamera } from '@react-three/drei';
import { type CommonCanvasProps } from './types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei/core';

const CommonCanvas = ({ cameraPosition = [0, 0, 15], children }: CommonCanvasProps) => {
  return (
    <Canvas>
      <PerspectiveCamera
        position={cameraPosition}
        makeDefault
      />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
      />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls />
      {children}
    </Canvas>
  );
};

export default CommonCanvas;
