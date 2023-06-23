import { type ReactNode } from 'react';
import './style.scss';
interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return <div className='login-layout'>{children}</div>;
};

export default Layout;
