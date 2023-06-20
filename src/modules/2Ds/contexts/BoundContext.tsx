import { createContext, useContext, type ReactNode } from 'react';
import { type Bound } from '../types';

const BoundContext = createContext<Bound>([
  [-50, 50],
  [-35, 35],
]);

const BoundContextProvider = ({ bound, children }: { bound: Bound; children: ReactNode }) => (
  <BoundContext.Provider value={bound}>{children}</BoundContext.Provider>
);

const useBoundContext = () => useContext(BoundContext);

export default BoundContextProvider;
export { useBoundContext };
