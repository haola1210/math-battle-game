import { useEffect, useState } from 'react';

export default function useClearOldBullet(didBulletStop: undefined | boolean) {
  // #region remove bullet and line after it stopped
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let id: NodeJS.Timer;

    if (didBulletStop) {
      id = setInterval(() => {
        setOpacity((prev) => {
          if (prev > 0) {
            return prev - 0.1;
          }

          clearInterval(id);
          return 0;
        });
      }, 100);
    }

    if (!didBulletStop) {
      setOpacity(1);
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [didBulletStop]);

  // #endregion

  return {
    opacity,
  };
}
