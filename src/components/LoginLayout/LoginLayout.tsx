import { type ReactNode } from 'react';
import './style.scss';
interface ILoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: ILoginLayoutProps) => {
  return <div className='login-layout'>{children}</div>;
};

export default LoginLayout;
