import { useEventBus } from '@modules/2Ds/contexts/EventBusContext';
import { Circle, type vec } from 'mafs';
import { useEffect, useState } from 'react';
import { BULLET_ACTION } from '../Soldier/events.enum';
import { type SyncFlyDTO } from '../Soldier/events.dto';
import * as math from 'mathjs';
import { calcultateTrajectory } from '../Soldier/utils';
import { didCollide } from './utils';
import { useSocket } from '@contexts/SocketContext';
import { v4 as uuid } from 'uuid';

interface IObstacle {
  color?: string;
  position: vec.Vector2;
  r: number;
}

interface Hole {
  id: string;
  r: number;
  point: vec.Vector2;
}

export default function Obstacle({ color, position, r }: IObstacle) {
  //
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
          //

          const isInsideAnyHole = holes
            .map(({ point, r }) => didCollide(point, r, pVec))
            .some((v) => v);

          if (!isInsideAnyHole && didCollide(position, r, pVec)) {
            console.log('collided obstacle');
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
      <Circle
        center={position}
        radius={r}
        fillOpacity={1}
        color={color}
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
