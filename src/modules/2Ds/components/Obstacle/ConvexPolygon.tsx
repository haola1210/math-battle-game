import { useSocket } from '@contexts/SocketContext';
import { useEventBus } from '@modules/2Ds/contexts/EventBusContext';
import { Circle, Polygon, type vec } from 'mafs';
import { useEffect, useState } from 'react';
import { type SyncFlyDTO } from '../Soldier/events.dto';
import { BULLET_ACTION } from '../Soldier/events.enum';
import {
  calculateRegularPolygonVertices,
  didCollideCircle,
  didCollideConvexPolygon,
} from './utils';
import * as math from 'mathjs';
import { v4 as uuid } from 'uuid';
import { calcultateTrajectory } from '../Soldier/utils';

interface IConvexPolygonProps {
  position: vec.Vector2;
  r: number;
  sides: number;
}

interface Hole {
  id: string;
  r: number;
  point: vec.Vector2;
}

export default function ConvexPolygon({ position, r, sides }: IConvexPolygonProps) {
  const event$ = useEventBus();
  const socket = useSocket();
  const [holes, setHoles] = useState<Hole[]>([]);

  useEffect(() => {
    // kaboom
    const syncCollidedByBullet = socket?.current?.on(
      BULLET_ACTION.SYNC_COLLIDED_OBSTACLE,
      (data: SyncFlyDTO) => {
        //
        const { x: theoX, equation, basePosition } = data;
        const f = math.compile(equation);
        const bulletTrajectory = calcultateTrajectory(f, basePosition);

        const collisionVec = bulletTrajectory(theoX);
        //

        setHoles((prev) => [...prev, { id: uuid(), r: 2, point: collisionVec }]);
      },
    );
    //

    return () => {
      syncCollidedByBullet?.off();
    };
  }, []);

  useEffect(() => {
    const bulletSub = event$.subscribe({
      next({ action, payload }) {
        if (action === BULLET_ACTION.FLYING) {
          //
          const { x: theoX, equation, basePosition } = payload as SyncFlyDTO;
          const f = math.compile(equation);
          const bulletTrajectory = calcultateTrajectory(f, basePosition);

          const pVec = bulletTrajectory(theoX);

          console.log(pVec);

          const isInsideAnyHole = holes
            .map(({ point, r }) => didCollideCircle(point, r, pVec))
            .some((v) => v);

          const polygoinVertices = calculateRegularPolygonVertices(position, sides, r);

          if (!isInsideAnyHole && didCollideConvexPolygon(polygoinVertices, pVec)) {
            socket?.current?.emit(BULLET_ACTION.COLLIDED_OBSTACLE, payload);
          }
        }
      },
    });

    return () => {
      bulletSub.unsubscribe();
    };
  }, [holes]);

  return (
    <>
      <Polygon
        points={calculateRegularPolygonVertices(position, sides, r)}
        color={'blue'}
        fillOpacity={1}
      />
      {holes.map(({ r, point, id }) => (
        <Circle
          center={point}
          radius={r}
          fillOpacity={1}
          color='white'
          key={id}
        />
      ))}
    </>
  );
}
