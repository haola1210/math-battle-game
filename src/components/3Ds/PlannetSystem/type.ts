/** @format */

import { type PlannetProps } from '../Plannet/types';

type Satellite = {
  orbit: {
    a: number;
    b: number;
  };
  object?: PlannetProps;
};

export type PlannetSystemProps = {
  satelliteList: Satellite[];
  mainPlannet: PlannetProps;
};
