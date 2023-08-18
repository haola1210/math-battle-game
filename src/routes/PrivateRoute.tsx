import { useAuthContext } from '@contexts/AuthContext';
import { me } from '@services/user.service';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  localStorage.setItem(`currentPath`, location.pathname);

  useEffect(() => {
    (async () => {
      if (auth.user === undefined) {
        try {
          const user = await me();
          console.log(user);

          auth.login?.(user);
        } catch (error) {
          localStorage.setItem(`oldPath`, location.pathname);
          navigate('/login', { replace: true });
        }
      }
    })();
  }, [auth]);

  return auth.user ? <Outlet /> : <>Loading...</>;
};

export default PrivateRoute;
