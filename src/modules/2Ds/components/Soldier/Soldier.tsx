/* eslint-disable @typescript-eslint/ban-types */
import { Circle, Plot, type vec } from 'mafs';
import { useState, useEffect } from 'react';
import useShooting from './hooks/useShooting';
import useClearOldBullet from './hooks/useClearOldBullet';
import { useEventBus } from '@modules/2Ds/contexts/EventBusContext';

interface ISoldier {
  initialCenter: vec.Vector2;
}

export default function Soldier({ initialCenter }: ISoldier) {
  const [center, setCenter] = useState(initialCenter);
  const { x, bulletTrajectory, shoot, didBulletStop } = useShooting(center);

  const bus$ = useEventBus();

  useEffect(() => {
    const sub = bus$.subscribe({
      next(e) {
        if (e.action === 'SHOOT') {
          shoot(e.payload as math.EvalFunction);
        }
      },
    });

    return () => {
      sub.unsubscribe();
    };
  }, [shoot]);

  const { opacity } = useClearOldBullet(didBulletStop);

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     shoot();
  //     clearTimeout(id);
  //   }, 500);

  //   return () => {
  //     clearTimeout(id);
  //   };
  // }, [shoot]);

  return (
    <>
      <Circle
        center={center}
        radius={0.7}
        fillOpacity={1}
      />
      {didBulletStop !== undefined && (
        <>
          <Plot.Parametric
            t={[0, x]}
            weight={2}
            xy={(t: number) => bulletTrajectory(t)}
            opacity={opacity}
          />
          <Circle
            center={bulletTrajectory(x)}
            radius={0.1}
            fillOpacity={opacity}
            strokeOpacity={opacity}
          />
        </>
      )}
    </>
  );
}
