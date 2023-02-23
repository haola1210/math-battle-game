import { createContext, type ReactNode, useContext } from 'react';
import { Subject } from 'rxjs';

const subject$ = new Subject<{
  action: string;
  payload?: unknown;
}>();

const EventBusContext = createContext(subject$);

export default function EventBusContextProvider({ children }: { children: ReactNode }) {
  return <EventBusContext.Provider value={subject$}>{children}</EventBusContext.Provider>;
}

export const useEventBus = () => useContext(EventBusContext);
