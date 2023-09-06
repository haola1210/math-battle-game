import { type IUser } from '@interfaces/user.interface';
import { createContext, type ReactNode, useState, useContext, useCallback } from 'react';

interface IAuthContextProps {
  children: ReactNode;
}

interface IAuthContext {
  user: IUser | undefined;
  login?: (user: IUser) => void;
  logout?: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: undefined,
});

export const AuthContextProvider = ({ children }: IAuthContextProps) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const login = useCallback((user: IUser) => {
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
