/** @format */

import { MovableGroup } from '../MovableGroup';
import Plannet from '../Plannet/Plannet';
import { type PlannetSystemProps } from './type';
import { genInitPosSatellite } from './utils';

const PlannetSystem = ({ mainPlannet, satelliteList }: PlannetSystemProps) => {
  return (
    <group>
      <Plannet {...mainPlannet} />
      {satelliteList.map(({ orbit, object }, index) => {
        const { x, y } = genInitPosSatellite(orbit.a, orbit.b);
        console.log(x, y);

        return (
          <MovableGroup
            key={index}
            a={orbit.a}
            b={orbit.b}
          >
            <Plannet
              {...object}
              position={[x, y, mainPlannet.position![2]]}
            />
          </MovableGroup>
        );
      })}
    </group>
  );
};

export default PlannetSystem;
