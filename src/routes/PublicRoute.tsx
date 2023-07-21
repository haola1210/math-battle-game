import { useAuthContext } from '@contexts/AuthContext';
import { me } from '@services/user.service';
import { Suspense } from 'react';
import { Await, defer, Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const auth = useAuthContext();
  return auth.user ? <Navigate to={localStorage.getItem(`currentPath`) ?? `/`} /> : <LazySession />;
};

const LazySession = () => {
  const auth = useAuthContext();
  const lazyQuerySession = async () => {
    const user = await me();
    auth.login?.(user);
    return defer({ user });
  };

  return (
    <Suspense fallback={<>Loading ...</>}>
      <Await
        resolve={lazyQuerySession()}
        errorElement={<Outlet />}
      >
        <></>
      </Await>
    </Suspense>
  );
};

export default PublicRoute;
