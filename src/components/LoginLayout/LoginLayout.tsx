import { type ReactNode } from 'react';

interface ILoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: ILoginLayoutProps) => {
  return (
    <div
      style={{
        background: '#2b2d42',
        height: '100%',
        color: '#edf2f4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default LoginLayout;
