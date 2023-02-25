import {
  createContext,
  useEffect,
  type ReactNode,
  useRef,
  type MutableRefObject,
  useContext,
} from 'react';
import { type Socket, io } from 'socket.io-client';

const SocketContext = createContext<MutableRefObject<Socket | undefined> | undefined>(undefined);

export default function SocketContextProvider({ children }: { children: ReactNode }) {
  const socket = useRef<undefined | Socket>(undefined);

  useEffect(() => {
    socket.current = io('http://localhost:3000');
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export const useSocket = () => useContext(SocketContext);
