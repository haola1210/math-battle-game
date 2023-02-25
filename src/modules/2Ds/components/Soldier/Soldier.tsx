import { Circle, type vec } from 'mafs';
import { useState, useEffect } from 'react';
import useShooting from './hooks/useShooting2';
import { useEventBus } from '@modules/2Ds/contexts/EventBusContext';

interface ISoldier {
  initialCenter: vec.Vector2;
}

export default function Soldier({ initialCenter }: ISoldier) {
  const [center, setCenter] = useState(initialCenter);
  const { shoot, element } = useShooting();

  const bus$ = useEventBus();

  useEffect(() => {
    const sub = bus$.subscribe({
      next(e) {
        if (e.action === 'SHOOT') {
          shoot(e.payload as string, center);
        }
      },
    });

    return () => {
      sub.unsubscribe();
    };
  }, [shoot]);

  return (
    <>
      <Circle
        center={center}
        radius={0.7}
        fillOpacity={1}
      />
      {element}
    </>
  );
}
