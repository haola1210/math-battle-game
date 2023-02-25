import { useCallback, useEffect, useRef, useState } from 'react';
import { useBoundContext } from '@modules/2Ds/contexts/BoundContext';
import { Circle, Plot, useStopwatch, type vec } from 'mafs';
import * as math from 'mathjs';
import { useSocket } from '@contexts/SocketContext';
import { Subject, throttleTime } from 'rxjs';
import { BULLET_ACTION } from '../events.enum';
import { type SyncFlyDTO } from '../events.dto';
import { doesPointTouchBound } from '../utils';
import useClearOldBullet from './useClearOldBullet';

type BulletMetaData = {
  equation: string;
  f: undefined | math.EvalFunction;
  basePosition: vec.Vector2;
};

const event$ = new Subject<{
  action: BULLET_ACTION;
  payload: unknown;
}>();

const calcultateTrajectory = (f: math.EvalFunction, basePosition: vec.Vector2) => {
  // #region calculating trajectory
  // theoretically
  const fStartPointTheo = [0, f.evaluate({ x: 0 })];

  // value deviation (base on the center)
  const deltaX = basePosition[0] - fStartPointTheo[0];
  const deltaY = basePosition[1] - fStartPointTheo[1];

  // reality
  const rX = (x: number) => x + deltaX;
  const rY = (x: number) => (f.evaluate({ x }) as number) + deltaY;

  const bulletTrajectory = (x: number) => [rX(x), rY(x)] as vec.Vector2;
  // #endregion

  return bulletTrajectory;
};

export default function useShooting() {
  const bound = useBoundContext();
  const { time, start, stop } = useStopwatch();
  const socket = useSocket();

  const bulletMetaData = useRef<BulletMetaData>({
    equation: '',
    f: undefined,
    basePosition: [0, 0],
  });

  const [bulletData, setBulletData] = useState<{
    x: number;
    didStop: boolean | undefined;
  }>({
    x: 0,
    didStop: undefined,
  });

  // Publisher
  useEffect(() => {
    const shootingSub = event$.pipe(throttleTime(25)).subscribe({
      next({ action, payload }) {
        if (action === BULLET_ACTION.FLYING) {
          socket?.current?.emit(BULLET_ACTION.FLYING, payload);
        }
      },
    });

    return () => {
      shootingSub.unsubscribe();
    };
  }, []);

  // Subscriber
  useEffect(() => {
    // #region sync flying
    let latestX = 0;
    const syncFly = socket?.current?.on(BULLET_ACTION.SYNC_FLYING, (data: SyncFlyDTO) => {
      // console.log(data);
      const { x, equation, basePosition } = data;
      if (x === 0) {
        latestX = 0;
      }

      if (x > latestX) {
        latestX = x;
        // convert to function
        const f = math.compile(equation);

        bulletMetaData.current.basePosition = basePosition;
        bulletMetaData.current.equation = equation;
        bulletMetaData.current.f = f;

        setBulletData({
          x,
          didStop: false,
        });
      }
    });
    // #endregion

    // #region sync stop
    const syncStop = socket?.current?.on(BULLET_ACTION.SYNC_STOP, () => {
      latestX = 0;
      setBulletData((prev) => ({
        ...prev,
        didStop: true,
      }));
    });
    // #endregion

    return () => {
      syncFly?.off();
      syncStop?.off();
    };
  }, []);

  // #region flying emitter stream
  useEffect(() => {
    if (time !== 0) {
      //
      event$.next({
        action: BULLET_ACTION.FLYING,
        payload: {
          x: time,
          equation: bulletMetaData.current.equation,
          basePosition: bulletMetaData.current.basePosition as vec.Vector2,
        },
      });

      const bulletTrajectory = calcultateTrajectory(
        math.compile(bulletMetaData.current.equation),
        bulletMetaData.current.basePosition as vec.Vector2,
      );

      if (doesPointTouchBound(bulletTrajectory(time), bound)) {
        stop();
        // calculate the exact point (later)
        // then pass to this event.
        socket?.current?.emit(BULLET_ACTION.STOP);
      }
    }
  }, [time]);
  // #endregion

  // #region exported shoot method
  const shoot = useCallback(
    (equation: string, basePosition: vec.Vector2) => {
      try {
        bulletMetaData.current.f = math.compile(equation);
        bulletMetaData.current.equation = equation;
        bulletMetaData.current.basePosition = basePosition;
        setBulletData({
          x: 0,
          didStop: undefined,
        });
        start();
        //
      } catch (error) {
        // log error
        console.log((error as any).message);
      }
    },
    [start],
  );
  // #endregion

  const bulletTrajectory = calcultateTrajectory(
    math.compile(bulletMetaData.current.equation),
    bulletMetaData.current.basePosition as vec.Vector2,
  );

  const { opacity } = useClearOldBullet(bulletData.didStop);
  useEffect(() => {
    console.log(bulletData.didStop);
  }, [bulletData.didStop]);

  return {
    shoot,
    element: (
      <>
        {bulletData.didStop !== undefined && (
          <>
            <Plot.Parametric
              t={[0, bulletData.x]}
              weight={2}
              xy={(t: number) => bulletTrajectory(t)}
              opacity={opacity}
            />
            <Circle
              center={bulletTrajectory(bulletData.x)}
              radius={0.1}
              fillOpacity={opacity}
              strokeOpacity={opacity}
            />
          </>
        )}
      </>
    ),
  };
}
