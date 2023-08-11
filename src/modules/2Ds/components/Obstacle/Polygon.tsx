import { useSocket } from '@contexts/SocketContext';
import { useEventBus } from '@modules/2Ds/contexts/EventBusContext';
import { Circle, Polygon as MafsPolygon, type PolygonProps, type vec } from 'mafs';
import { useEffect, useState } from 'react';
import { type SyncFlyDTO } from '../Soldier/events.dto';
import { BULLET_ACTION } from '../Soldier/events.enum';
import { didCollideCircle, didCollidePolygon } from './utils';
import * as math from 'mathjs';
import { v4 as uuid } from 'uuid';
import { calcultateTrajectory } from '../Soldier/utils';

interface IPolygonProps extends PolygonProps {}

interface Hole {
  id: string;
  r: number;
  point: vec.Vector2;
}

export default function Polygon({ points }: IPolygonProps) {
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

          const isInsideAnyHole = holes
            .map(({ point, r }) => didCollideCircle(point, r, pVec))
            .some((v) => v);

          if (!isInsideAnyHole && didCollidePolygon(pVec, points)) {
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
      <MafsPolygon
        points={points}
        color={'white'}
        fillOpacity={1}
      />
      {holes.map(({ r, point, id }) => (
        <Circle
          center={point}
          radius={r}
          fillOpacity={1}
          color='black'
          key={id}
        />
      ))}
    </>
  );
}
