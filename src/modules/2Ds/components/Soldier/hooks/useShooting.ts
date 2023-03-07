// /* eslint-disable @typescript-eslint/ban-types */
// import { useBoundContext } from '@modules/2Ds/contexts/BoundContext';
// import { type Bound } from '@modules/2Ds/types';
// import { useStopwatch, type vec } from 'mafs';
// import { useCallback, useEffect, useState, useRef } from 'react';
// import { doesPointTouchBound } from '../utils';

// type Status = {
//   didStop: undefined | boolean;
// };

// export default function useShooting(center: vec.Vector2) {
//   // #region shooting

//   const f = useRef<undefined | math.EvalFunction>(undefined);

//   const bound = useBoundContext();
//   const { time, start, stop } = useStopwatch();

//   const [x, setX] = useState(0);
//   const [status, setStatus] = useState<Status>({
//     didStop: undefined,
//   });

//   useEffect(() => {
//     if (time !== 0) {
//       setX(time);
//     }
//   }, [time]);

//   // theoretically
//   const fStartPointTheo = [0, f.current?.evaluate({ x: 0 })];

//   // value deviation (base on the center)
//   const deltaX = center[0] - fStartPointTheo[0];
//   const deltaY = center[1] - fStartPointTheo[1];

//   // reality
//   const rX = (x: number) => x + deltaX;
//   const rY = (x: number) => (f.current?.evaluate({ x }) as number) + deltaY;

//   const bulletTrajectory = (x: number) => [rX(x), rY(x)] as vec.Vector2;

//   const shooting = (bound: Bound) => {
//     setStatus((prev) => {
//       if (prev.didStop === undefined) {
//         return { ...prev, didStop: false };
//       }

//       return prev;
//     });
//     if (doesPointTouchBound(bulletTrajectory(x), bound)) {
//       stop();
//       setStatus((prev) => ({ ...prev, didStop: true }));
//     }
//   };

//   useEffect(() => {
//     if (x !== 0 && bound) {
//       shooting(bound);
//     }
//   }, [x, stop, bound]);

//   const shoot = useCallback(
//     (func: math.EvalFunction) => {
//       f.current = func;
//       if (f.current) {
//         start();
//         setStatus((prev) => ({ ...prev, didStop: undefined }));
//       }
//     },
//     [start],
//   );

//   // #endregion

//   return {
//     x,
//     bulletTrajectory,
//     shoot,
//     didBulletStop: status.didStop,
//   };
// }
